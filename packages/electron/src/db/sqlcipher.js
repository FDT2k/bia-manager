import { is_nil, enlist, is_empty, is_undefined, is_type_object } from '@karsegard/composite-js';
import { key, keyval, spec } from '@karsegard/composite-js/ObjectUtils';
import { spreadObjectPresentIn } from '@karsegard/composite-js/ReactUtils'
import { resolve, join } from 'path'
import fs from 'fs'

import { format } from 'date-fns'

import crypto from 'crypto'
var sqlite3 = require('better-sqlite3');





export const _to_boolean = (value) => {
    if (value === true) {
        return 1;
    }
    return 0;
}

export const _to_json = (values) => {
    return JSON.stringify(values);
}

export const _transform = (schema, data) => {
    let result = enlist(schema).reduce((carry, item) => {
        const [field, type] = keyval(item);
       // console.log(type)
        if (!is_empty(type) && !is_undefined(data[field])) {
            if (type === 'boolean') {
                carry[field] = _to_boolean(data[field])
            } else if (type === 'json') {
                carry[field] = _to_json(data[field])
            } else if (type === 'date' && is_type_object(data[field])) {
                carry[field] = format(data[field], 'yyyy-MM-dd')
            } else if (type === 'date') {
                carry[field] = data[field];
            }
        } else {
            carry[field] = data[field] || '';
        }

        return carry;
    }, {})
    return result;
}

export const _from_boolean = (value) => {
    if (value === 'true' || value === 1 || value === '1') {
        return true;
    }
    return false;
}

export const _from_json = (values) => {
    try {
        return JSON.parse(values);
    } catch (e) {
        return null
    }
}


export const _from_array = (values) => {
    if (!values) {
        return []
    }
    return values.split(',')
}

export const _retrieve_row = (field, type, value) => {
    if (!is_empty(type) && !is_undefined(value)) {
        if (type === 'boolean') {
            return _from_boolean(value)
        } else if (type === 'json') {
            return _from_json(value)

        } else if (type === 'array') {
            return _from_array(value)
        } else {
            return value;
        }
    } else {
        return value || '';
    }
}


export const _retrieve_entity = (entity_name, schema, columns, row) => {

    return columns.reduce((carry, column, idx) => {
        const type = schema[column.name];
        if (column.table === entity_name) {
            carry[column.name] = _retrieve_row(column.name, type, row[idx]);
        }
        return carry;
    }, {})
}

export const _retrieve = (schema, data) => {
    let result = enlist(schema).reduce((carry, item) => {
        const [field, type] = keyval(item);
       // console.log(type)
        _retrieve_row(field, type, data[field])

        return carry;
    }, {})
    return result;
}


export const _raw_to_object = (schema, columns, row) => {

    return columns.reduce((carry, item, idx) => {
        const type = schema[item.name];
        carry[item.name] = _retrieve_row(item.name, type, row[idx]);
        return carry;
    }, {})
}

export const API = db => {

    const module = {}

    let unlocked = false;
    const migrationPath = resolve(__dirname, '../migrations');
    module.isUnlocked = () => unlocked
    module.getStatements = _ => ({
        insert_migration: db.prepare('insert into migrations (name,hash) values(@migration,@hash)'),
        get_migrations: db.prepare('select * from migrations'),
        migration_table: db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name= ?")
    });



    module.getLatestMigration = () => {
        try {
            const migration_table = module.getStatements().migration_table

            const result = migration_table.get('migrations');

            let latest_migration = -1;
            if (!is_nil(result)) {
                let result = db.prepare('select max(id) as latest_migration from migrations').get();
                latest_migration = result.latest_migration

            }
            return latest_migration;
        } catch (e) {
            console.error(e)
            return 0
        }
    }


    module.genInsertSQL = (table, schema, ignore = ['id']) => {
        const [keys, _fields] = spreadObjectPresentIn(ignore, schema);
        const fields = enlist(_fields).map(item => key(item));
        const tmpl = `insert into ${table} (${fields.join(',')}) values (${fields.map(item => `@${item}`).join(',')})`;
        return tmpl;
    }

    module.genSelectSQL = (table, filter) => {
        const fields = enlist(filter).map(item => key(item));
        const tmpl = `select * from ${table} where  ${fields.map(item => `${item}=@${item}`).join(' and ')}`;
       // console.log(tmpl)
        return tmpl;
    }

    module.genConditionSQL = (filter, sep = ' and ') => {
        const fields = enlist(filter).map(item => keyval(item));
        const tmpl = `${fields.map(([_field,_value]) => { 
            if(_value === null){
                return `${_field} is null` 
            }
            return `${_field}=@${_field}` 
        }).join(` ${sep} `)}`;
    //    console.log(tmpl)
        return tmpl;
    }


    module.genUpdateSQL = (table, schema, filter) => {

        const fields = enlist(schema).map(item => key(item));


        const set = enlist(schema).map(item => {

            return `${key(item)} = @${key(item)}`;

        });
        const where = enlist(filter).map(item => {

            return `${key(item)} = @${key(item)}`;

        });

        const tmpl = `update ${table} set ${set.join(',')} where ${where.join(' and ')}`;
    //    console.log(tmpl)
        return tmpl;
    }


    module.schema_check = () => {
        debugger;
        console.log('checking schema');
        const migration_files = fs.readdirSync(migrationPath)
        const applied = module.getStatements().get_migrations.all()
        return migration_files.reduce((carry, migration, idx) => {

            if (!carry) {
                return carry;
            }

            const migrationFile = join(migrationPath, migration)
            let migrationContent = fs.readFileSync(migrationFile, 'utf8');
            let hash = crypto.createHash('md5').update(migrationContent).digest('hex')
            console.log(!applied[idx],hash !== applied[idx]['hash'],hash,applied[idx]['hash']);
            console.log(applied[idx]['name']==migration);
            //added applied[idx]['name']!==migration because md5 hash check is not consistent between windows && *nix
            if (!applied[idx] || applied[idx]['name']!==migration && hash !== applied[idx]['hash']) {
                carry = false;
            }

            return carry;

        }, true);
    }

    module.migrate = () => {
        try {


            let latest = module.getLatestMigration();

            const migration_files = fs.readdirSync(migrationPath).slice(latest);

            console.log('migrations ', migration_files);
            migration_files.map(migration => {
                const migrationFile = join(migrationPath, migration)
                console.log('[SQLITE]: running migration ', migrationFile)
                let migrationContent = fs.readFileSync(migrationFile, 'utf8');
                let hash = crypto.createHash('md5').update(migrationContent).digest('hex')
                db.exec(migrationContent)
                module.getStatements().insert_migration.run({ migration, hash })

            })
        } catch (e) {
            console.error(e);
            throw new Error("Migration error, " + e.message)
        }


    }

    module.unlock = key => {

        db.pragma("key='" + key + "'");
        console.log('unlocking')
        try {

            db.exec("select count(*) from sqlite_master;")
            db.pragma('journal_mode = WAL');
            //        db.pragma('synchronous = FULL');
            unlocked = true
            //module.migrate();

            return true;
        } catch (e) {
            console.error(e)
            throw new Error("Invalid database or key is wrong")
        }
    }


    module.attach = (file, alias) => {
        db.exec(`attach '${file}' as '${alias}'`)
    }


    return module;

}



const defaultOptions = { fileMustExist: true, verbose: (...args) => console.log('[SQLITE]:', ...args.map(item=>{
    if(!item.includes('PRAGMA key')){
        return item
    }
    return '*****';
})) }


const opendb = additional_modules => (file, key = '', options = defaultOptions) => {
    try {
        const db = new sqlite3(file, options);



        const api = API(db);

        if (!is_empty(key)) {
            api.unlock(key);
        }
        return {
            db,
            file,
            ...enlist(additional_modules).reduce((carry, module) => {
                let [key, value] = keyval(module);
                carry[key] = value(db, api);
                return carry
            }, {}),
            ...api,
        }
    } catch (e) {
        return false;
    }

}


export const createdb = additional_modules => (file, key) => opendb(additional_modules)(file, key, { fileMustExist: false })

export default opendb;