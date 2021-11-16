import { is_nil, enlist, is_empty, is_undefined } from '@karsegard/composite-js';
import { key,keyval } from '@karsegard/composite-js/ObjectUtils';
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

const _to_boolean = (value)=> {
    if(value ===true){
        return 1;
    }
    return 0;
}

const _to_json = (values)=>{
    return JSON.stringify(values);
}

const _transform = (schema,data)=> {
    let result =  enlist(schema).reduce((carry,item)=>{
        const [field,type]= keyval(item);
        console.log(type)
        if(!is_empty(type) && !is_undefined(data[field])){
            if(type==='boolean'){
                carry[field] = _to_boolean(data[field])
            }else if(type==='json') {
                carry[field] = _to_json(data[field])

            }
        }else{
            carry[field]= data[field] || '';
        }

        return carry;
    },{})
    return result;
}


const mesure= (db,api)=> {

    const schema = {
        date:'',
        examinator:'',
        subject_id:'',
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
        data:'json',
        sport:'json',
        fds:'json',
        uuid:''

    }


    const pkeys = ['id']
   

    const module ={};

    module.select = filters => db.prepare(api.genSelectSQL('mesures',filters));
    module.insert = (schema,ignore)=> db.prepare(api.genInsertSQL('mesures',schema,ignore))
    module.update = (schema,filter)=> db.prepare(api.genUpdateSQL('mesures',schema,filter))

    module.upsert = keys=> db.transaction(subject=> {
        const [filter,_values] =  spreadObjectPresentIn(keys,subject);  
        const [values,_] =  spreadObjectPresentIn(Object.keys(schema),_values);
        let result =module.select(filter).get(filter)

        if( !is_empty(result)){
            
            module.update(values,filter).run({...values,...filter});
        }else{
            module.insert({...values,...filter},pkeys).run({...values,...filter});
        }
    })

    module.import = subject_id=> db.transaction((mesures)=>{
        console.log('importing mesures','count',mesures.length)
        for(let mesure of mesures) {
            mesure.subject_id=subject_id;

            module.upsert(['uuid'])(_transform(schema,mesure))
        }
    })


    return module;

}

const subject= (db,api)=> {

    const schema = {
        firstname:'',
        lastname:'',
        birthdate:'',
        gender:'',
        age:'',
        groups:'json',
        usual_height:'',
        usual_weight:'',
        uuid:''
    }
   

    const pkeys = ['id']
   

    const module ={};

    module.select = filters => db.prepare(api.genSelectSQL('subjects',filters));
    module.insert = (schema,ignore)=> db.prepare(api.genInsertSQL('subjects',schema,ignore))
    module.update = (schema,filter)=> db.prepare(api.genUpdateSQL('subjects',schema,filter))

    module.upsert = keys=> db.transaction(subject=> {

        const [filter,_values] =  spreadObjectPresentIn(keys,subject);
        const [values,_] =  spreadObjectPresentIn(Object.keys(schema),_values);
        let result =module.select({uuid:''}).get(filter)

        let ret
        if( !is_empty(result)){
            
          module.update(values,filter).run({...values,...filter});
          ret = result.id;
        }else{
          let res = module.insert({...values,...filter},pkeys).run({...values,...filter});
          ret = res.lastInsertRowid;
        }
        return ret;
    })

    let _mesure = mesure(db,api);
    module.import = _=> db.transaction((subjects)=>{
        console.log('importing',subject.length)
        for(let subject of subjects) {
            let subject_id = module.upsert(['uuid'])(_transform(schema,subject))
            
            _mesure.import(subject_id)(subject.mesures);
        }
    })


    return module;

}

const defaultOptions = { fileMustExist: true, verbose: (...args) => console.log('[SQLITE]:', ...args) }


const opendb = (file, key = '', options = defaultOptions) => {
    const db = new sqlite3(file, options);


    const api = API(db);

    if (!is_empty(key)) {
        api.unlock(key);
        //api.migrate();
    }
    return {
        db,
        file,
        subject:subject(db,api),

        ...api,
    }

}


export default opendb;