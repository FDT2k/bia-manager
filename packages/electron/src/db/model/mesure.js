import {_transform,_retrieve,_raw_to_object,_retrieve_entity} from '../sqlcipher'
import { is_nil, enlist, keys,is_empty, is_undefined } from '@karsegard/composite-js';
import { key, keyval, spec } from '@karsegard/composite-js/ObjectUtils';
import { spreadObjectPresentIn } from '@karsegard/composite-js/ReactUtils'
import ohash from 'object-hash'
const mesure = (db, api) => {

    const schema = {
        date: 'date',
        examinator: '',
        subject_id: '',
        subject_uuid:'',
        height: '',
        weight: '',
        hash:'',
        bmi: '',
        comments:'',
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
        uuid: '',
        mesure_id:'',
        bia_data:'json',
        last_updated:''

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

    module.import = ({id:_subject_id,uuid:_subject_uuid}) => db.transaction((mesures) => {
        console.log('importing mesures', 'count', mesures.length)

        for (let mesure of mesures) {
            mesure.subject_id = _subject_id;
            mesure.subject_uuid=_subject_uuid;

            let {hash,subject_id,mesure_id,id,last_updated, ...to_hash} =  mesure;
            
            mesure.hash = ohash(to_hash);

            module.upsert(['uuid'])(_transform(schema, mesure))
        }
    })



    module.fetch = (filter,hash='main',removeIds=false) => {

        let stmt = db.prepare(`Select s.* from ${hash}.mesures s  where ${api.genConditionSQL(filter)}`).raw();
       


        let res;


        res = _retrieve_entity('mesures', schema, stmt.columns(), stmt.get(filter));
        if(removeIds){
            delete res.id;
            delete res.subject_id;
        }
       
        return res;
    };

    module.bulk_update = (data,filter)=> db.transaction((subjects) => {
        console.log('updating', subjects.length)
        for (let subject of subjects) {
            
            const [_values] = spreadObjectPresentIn(keys(data),subject);
            const [_filters] = spreadObjectPresentIn(keys(filter),subject);
            debugger;
            module.update(data, filter).run({ ..._values, ..._filters });
        }
    })


    module.all = (filter,hash='main',removeIds=false) => {

        let stmt = db.prepare(`Select * from ${hash}.mesures  where ${api.genConditionSQL(filter)}`).raw();


        let res=[];
        let cols =  stmt.columns()


        for (let result of stmt.iterate(filter)) { 
            let subject =  _retrieve_entity('mesures', schema,cols, result);
            if(removeIds){
                delete subject.id;
            }
            res.push(subject);
        }
      
       
        return res;
    };



    module.softDelete = (uuid) => module.update({status:'deleted'},{uuid}).run({uuid,status:'deleted'});


    module.retrieveFromRaw = (stmt,result) => _retrieve_entity('mesures',schema, stmt.columns(), result)


    return module;

}


export default mesure