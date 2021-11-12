import { is_nil,enlist } from '@karsegard/composite-js';
import { key } from '@karsegard/composite-js/ObjectUtils';
import {spreadObjectPresentIn} from '@karsegard/composite-js/ReactUtils'
import {resolve,join} from 'path'
import fs from 'fs'
var sqlite3 = require('better-sqlite3');

const API = db => {

    const module = {}

    module.getStatements = _=> ({
        insert_migration:  db.prepare('insert into migrations (name) values(@migration)'),
        migration_table: db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name= ?")
    });

    module.getSubjects = () => {

        db.prepare("Select * from subjects")
    }

    module.getLatestMigration = ()=> {
        const migration_table = module.getStatements().migration_table

        const result =  migration_table.get('migrations');

        let latest_migration = -1;
        if(!is_nil(result)){
            let result  = db.prepare('select max(id) as latest_migration from migrations').get();
            latest_migration = result.latest_migration
            
        }
        return latest_migration;
    }

    module.getSubject = (subject)=> {
        return db.prepare('select * from subjects where id  = @id ').get(subhect);
    }

    module.upsertSubject = (subject,filter) => {
        if(is_nil(filter)){
            throw new Error('upsert without filter will result in insert')
        }
        const {id} = subject;
        if(!id || module.getSubject({id}) === undefined){
            //insert
            return module.addSubject(subject);
        }else {
            //update
            return module.updateSubject(subject);
        }
    }

    


    module.genInsertSQL = (table,schema,pkey=['id'])=> {
        const [keys,_fields] = spreadObjectPresentIn(['id'],schema);
        const fields = enlist(_fields).map(item=> key(item));
        const tmpl = `insert into ${table} (${fields.join(',')}) values (${fields.map(item=> `@${item}`).join(',')})` ;
        return tmpl;
    }

    module.genUpdateSQL = (table,schema,filter)=> {

        const fields = enlist(schema).map(item=> key(item));


        const set = enlist(schema).map(item=>{
            
            return `${key(item)} = @${key(item)}`;
            
        });
        const where = enlist(filter).map(item=>{
            
            return `${key(item)} = @${key(item)}`;
            
        });

        const tmpl = `update ${table} set ${set.join(',')} where ${where.join(' and ')}` ;
        return tmpl;
    }

    module.addSubject = (subject) => {
        const stmt = db.prepare(module.genInsertSQL('subjects',subject));
        return stmt.run(subject);
    }

    module.migrate =() => {


        const migrationPath = resolve(__dirname, '../migrations');

        let latest = module.getLatestMigration();

        const migration_files  = fs.readdirSync(migrationPath);
        console.log(migration_files)


        let current = 0;
        
        migration_files.map(migration => {
            if (current >= latest){
                db.exec(fs.readFileSync(join(migrationPath,migration), 'utf8'))
                module.getStatements().insert_migration.run({migration})
            }
            current++;
        })

       
    }

    module.unlock = key => {

        return db.pragma("key='" + key + "'");
    }

    return module;

}


const opendb = (file, key = '') =>{
    const db = new sqlite3(file, { verbose: console.log });


    /* db.run("PRAGMA key = '" + key + "'", (err) => {
         console.log('apply key',err);
         if(err!==null){
             reject(err)
         }
     });
     db.run("SELECT count(*) FROM sqlite_master", (err) => {
         console.log('check',err);
         if(err!==null){
             reject(err)
         }
     });
 */ 

     const api = API (db);
     console.log(api)
     api.unlock(key);
     api.migrate()
    return {
        db,
        file,
        api
    }

}


export default opendb;