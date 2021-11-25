import mesure from './mesure'
import { is_nil, enlist, is_empty, is_undefined } from '@karsegard/composite-js';
import { key, keyval, spec } from '@karsegard/composite-js/ObjectUtils';
import { spreadObjectPresentIn } from '@karsegard/composite-js/ReactUtils'
import { _transform, _retrieve, _retrieve_from_raw, _retrieve_entity, _raw_to_object, _retrieve_row } from '../sqlcipher'
const subject = (db, api) => {

    const schema = {
        firstname: '',
        lastname: '',
        birthdate: 'date',
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


    const custom_partial = (key, from, until) => {

        if (!is_nil(from) && !is_nil(until)) {
            return ` ( ${key} BETWEEN '${from}' AND '${until}')`
        } else if (!is_nil(from) && is_nil(until)) {
            return ` ( ${key} >= '${from}')`

        } else if (is_nil(from) && !is_nil(until)) {
            return ` ( ${key} <='${until}')`

        }

    }



    module.fetchWithMesures = id => {

        let stmt = db.prepare("Select s.*,m.* from subjects as s left join mesures m on s.id=m.subject_id where s.id =@id and m.status !='deleted' ").raw();

        //  let result =  stmt.all({id});

        let res;
        for (let result of stmt.iterate({ id })) {
            if (!res) {
                res = _retrieve_entity('subjects', schema, stmt.columns(), result);
            }

            if (!res.mesures) {
                res.mesures = [];
            }
            res.mesures.push(_mesure.retrieveFromRaw(stmt, result))
        }

       return res;
    };
    
    module.create = (subject) => {
        let res = module.insert(subject, pkeys).run(_transform(schema, subject));
        return res.lastInsertRowid;
    }

    module.custom_search = (custom_filters) => {


        let method = "where";

        let sql = `Select s.*,count(m.id)as count_mesures, (s.firstname || s.lastname || s.birthdate ) as search_terms,group_concat(m.date) as mesures_dates 
        from subjects as s left join mesures as m on s.id=m.subject_id 

        ${(custom_filters.birthday_range) ? `where ${custom_partial(custom_filters.birthday_range.key, custom_filters.birthday_range.from, custom_filters.birthday_range.to)}` : ''}

        group by s.id
        ${(custom_filters.mesure_range) ? `having ${custom_partial("m.date", custom_filters.mesure_range.from, custom_filters.mesure_range.to)}` : ''}
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


export default subject