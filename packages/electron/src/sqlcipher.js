import { is_nil, enlist, is_empty, is_undefined } from '@karsegard/composite-js';
import { key, keyval } from '@karsegard/composite-js/ObjectUtils';
import { spreadObjectPresentIn } from '@karsegard/composite-js/ReactUtils'
import { resolve, join } from 'path'
import fs from 'fs'

var sqlite3 = require('better-sqlite3');





const API = db => {

    const module = {}

    let unlocked = false;

    module.isUnlocked = () => unlocked
    module.getStatements = _ => ({
        insert_migration: db.prepare('insert into migrations (name) values(@migration)'),
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
        console.log(tmpl)
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
        console.log(tmpl)
        return tmpl;
    }

    module.migrate = () => {

        const migrationPath = resolve(__dirname, '../migrations');

        let latest = module.getLatestMigration();

        const migration_files = fs.readdirSync(migrationPath);

        let current = 0;

        migration_files.map(migration => {
            if (current >= latest) {
                const migrationFile = join(migrationPath, migration)
                console.log('[SQLITE]: running migration ' + migrationFile)
                db.exec(fs.readFileSync(migrationFile, 'utf8'))
                module.getStatements().insert_migration.run({ migration })
            }
            current++;
        })


    }

    module.unlock = key => {

        db.pragma("key='" + key + "'");
        console.log('unlocking')
        try {

            db.exec("select count(*) from sqlite_master;")
            db.pragma('journal_mode = WAL');
            //        db.pragma('synchronous = FULL');
            unlocked = true
            module.migrate();

            return true;
        } catch (e) {
            console.error(e)
            throw new Error("Invalid database or key is wrong")
        }
    }



    return module;

}

const _to_boolean = (value) => {
    if (value === true) {
        return 1;
    }
    return 0;
}

const _to_json = (values) => {
    return JSON.stringify(values);
}

const _transform = (schema, data) => {
    let result = enlist(schema).reduce((carry, item) => {
        const [field, type] = keyval(item);
        console.log(type)
        if (!is_empty(type) && !is_undefined(data[field])) {
            if (type === 'boolean') {
                carry[field] = _to_boolean(data[field])
            } else if (type === 'json') {
                carry[field] = _to_json(data[field])

            }
        } else {
            carry[field] = data[field] || '';
        }

        return carry;
    }, {})
    return result;
}

const _from_boolean = (value) => {
    if (value === 'true' || value === 1 || value === '1') {
        return true;
    }
    return false;
}

const _from_json = (values) => {
    return JSON.parse(values);
}


const _from_array = (values) => {
    return values.split(',')
}

const _retrieve_row = (field, type, value) => {
    if (!is_empty(type) && !is_undefined(value)) {
        if (type === 'boolean') {
            return _from_boolean(value)
        } else if (type === 'json') {
            return _from_json(value)

        } else if (type === 'array') {
            return _from_array(value)
        }
    } else {
        return value || '';
    }
}


const _retrieve = (schema, data) => {
    let result = enlist(schema).reduce((carry, item) => {
        const [field, type] = keyval(item);
        console.log(type)
        _retrieve_row(field, type, data[field])

        return carry;
    }, {})
    return result;
}


const _raw_to_object = (schema, columns, row) => {

    return columns.reduce((carry, item, idx) => {
        const type = schema[item.name];
        carry[item.name] = _retrieve_row(item.name, type, row[idx]);
        return carry;
    }, {})
}

const mesure = (db, api) => {

    const schema = {
        date: '',
        examinator: '',
        subject_id: '',
        height: '',
        weight: '',
        bmi: '',
        left_side: 'boolean',
        machine: '',
        smoker: 'boolean',
        bmi_ref: '',
        status: '',
        ideal_weight: '',
        pct_ideal_weight: '',
        most_accurate_formula: '',
        current_age: '',
        data: 'json',
        sport: 'json',
        fds: 'json',
        uuid: ''

    }


    const pkeys = ['id']


    const module = {};

    module.select = filters => db.prepare(api.genSelectSQL('mesures', filters));
    module.insert = (schema, ignore) => db.prepare(api.genInsertSQL('mesures', schema, ignore))
    module.update = (schema, filter) => db.prepare(api.genUpdateSQL('mesures', schema, filter))

    module.upsert = keys => db.transaction(subject => {
        const [filter, _values] = spreadObjectPresentIn(keys, subject);
        const [values, _] = spreadObjectPresentIn(Object.keys(schema), _values);
        let result = module.select(filter).get(filter)

        if (!is_empty(result)) {

            module.update(values, filter).run({ ...values, ...filter });
        } else {
            module.insert({ ...values, ...filter }, pkeys).run({ ...values, ...filter });
        }
    })

    module.import = subject_id => db.transaction((mesures) => {
        console.log('importing mesures', 'count', mesures.length)
        for (let mesure of mesures) {
            mesure.subject_id = subject_id;

            module.upsert(['uuid'])(_transform(schema, mesure))
        }
    })


    return module;

}

const list = (db,api)=> {
    const schema = {
        list_key:'',
        key:'',
        value:''
    }

    const module = {};
    const pkeys = ['id']

    module.select = filters => db.prepare(api.genSelectSQL('lists', filters));
    module.insert = (schema, ignore) => db.prepare(api.genInsertSQL('lists', schema, ignore))
    module.update = (schema, filter) => db.prepare(api.genUpdateSQL('lists', schema, filter))

    module.upsert = keys => db.transaction(list => {

        const [filter, _values] = spreadObjectPresentIn(keys, list);
        const [values, _] = spreadObjectPresentIn(Object.keys(schema), _values);
        let result = module.select({ list_key: '',key:'' }).get(filter)

        let ret
        if (!is_empty(result)) {

            module.update(values, filter).run({ ...values, ...filter });
            ret = result.id;
        } else {
            let res = module.insert({ ...values, ...filter }, pkeys).run({ ...values, ...filter });
            ret = res.lastInsertRowid;
        }
        return ret;
    })

    module.import = _ => db.transaction((lists) => {
        console.log(lists)
        enlist(lists).map( _list => {
            let [list_key,values] = keyval(_list)
            console.log(list_key,values)

            enlist(values).map(item=> {
                const [key,value] = keyval(item)
                console.log( {
                    
                    list_key,
                    key,value
                })
                module.upsert(['list_key','key'])(_transform(schema, {
                    
                    list_key,
                    key,value
                }))


            })

        });
    })

    return module;

}

const subject = (db, api) => {

    const schema = {
        firstname: '',
        lastname: '',
        birthdate: '',
        gender: '',
        age: '',
        groups: 'json',
        usual_height: '',
        usual_weight: '',
        uuid: '',
        mesures_dates: 'array'
    }


    const pkeys = ['id']


    const module = {};

    module.select = filters => db.prepare(api.genSelectSQL('subjects', filters));
    module.insert = (schema, ignore) => db.prepare(api.genInsertSQL('subjects', schema, ignore))
    module.update = (schema, filter) => db.prepare(api.genUpdateSQL('subjects', schema, filter))

    module.upsert = keys => db.transaction(subject => {

        const [filter, _values] = spreadObjectPresentIn(keys, subject);
        const [values, _] = spreadObjectPresentIn(Object.keys(schema), _values);
        let result = module.select({ uuid: '' }).get(filter)

        let ret
        if (!is_empty(result)) {

            module.update(values, filter).run({ ...values, ...filter });
            ret = result.id;
        } else {
            let res = module.insert({ ...values, ...filter }, pkeys).run({ ...values, ...filter });
            ret = res.lastInsertRowid;
        }
        return ret;
    })

    let _mesure = mesure(db, api);

    module.import = _ => db.transaction((subjects) => {
        console.log('importing', subject.length)
        for (let subject of subjects) {
            let subject_id = module.upsert(['uuid'])(_transform(schema, subject))

            _mesure.import(subject_id)(subject.mesures);
        }
    })


    const custom_partial = (key, from, until) =>{

    if (!is_nil(from) && !is_nil(until)) {
        return ` ( ${key} BETWEEN '${from}' AND '${until}')`
    } else if (!is_nil(from) && is_nil(until)) {
        return ` ( ${key} >= '${from}')`

    } else if (is_nil(from) && !is_nil(until)) {
        return ` ( ${key} <='${until}')`

    }

}


    module.custom_search = (custom_filters) => {


        let method = "where";

        let sql = `Select s.*,count(m.id)as count_mesures, (s.firstname || s.lastname || s.birthdate ) as search_terms,group_concat(m.date) as mesures_dates 
        from subjects as s left join mesures as m on s.id=m.subject_id 

        ${(custom_filters.birthday_range) ? `where ${custom_partial(custom_filters.birthday_range.key,custom_filters.birthday_range.from,custom_filters.birthday_range.to)}`:''}

        group by s.id
        ${(custom_filters.mesure_range) ? `having ${custom_partial("m.date",custom_filters.mesure_range.from,custom_filters.mesure_range.to)}`:''}
        `

        console.log(sql)
        let stmt = db.prepare(sql).raw(true);
        const res = [];
        for (let result of stmt.iterate()) {
            // console.log(result)
            res.push(_raw_to_object(schema, stmt.columns(), result));
        }
        return res;
    }

    module.search = (tag) => {
        let hasField = tag.indexOf(':') !== -1;

        let sql = `Select s.*,count(m.id)as count_mesures, (s.firstname || s.lastname || s.birthdate ) as search_terms,group_concat(m.date) as mesures_dates 
            from subjects as s left join mesures as m on s.id=m.subject_id 
        
            where s.firstname like @tag 
                or s.lastname like @tag
                or s.birthdate like @tag
                or s.gender =@tag
            group by s.id
        `;

        if (hasField) {
            let fieldpos = tag.indexOf(':');
            let key = tag.substr(0, fieldpos).trim();
            tag = tag.substr(fieldpos + 1).trim();
            sql = `Select s.*,count(m.id)as count_mesures , (s.firstname || s.lastname || s.birthdate ) as search_terms ,group_concat(m.date) as mesures_dates
            from subjects as s left join mesures as m on s.id=m.subject_id 
        
            where s.${key} like @tag 
            group by s.id`;
        }

        let stmt = db.prepare(sql).raw(true);
        const res = [];
        for (let result of stmt.iterate({ tag: '%' + tag + '%' })) {
            // console.log(result)
            res.push(_raw_to_object(schema, stmt.columns(), result));
        }
        return res;
    }

    return module;

}

const defaultOptions = { fileMustExist: true, verbose: (...args) => console.log('[SQLITE]:', ...args) }


const opendb = (file, key = '', options = defaultOptions) => {
    try {
        const db = new sqlite3(file, options);


        const api = API(db);

        if (!is_empty(key)) {
            api.unlock(key);
        }
        return {
            db,
            file,
            subject: subject(db, api),
            list: list(db,api),
            ...api,
        }
    } catch (e) {
        return false;
    }

}


export const createdb = (file,key) =>  opendb(file,key,{fileMustExist:false})

export default opendb;