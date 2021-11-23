import {_transform,_retrieve,_raw_to_object,_retrieve_entity} from '../sqlcipher'
import { is_nil, enlist, is_empty, is_undefined } from '@karsegard/composite-js';
import { key, keyval, spec } from '@karsegard/composite-js/ObjectUtils';
import { spreadObjectPresentIn } from '@karsegard/composite-js/ReactUtils'
const mesure = (db, api) => {

    const schema = {
        date: 'date',
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


    module.retrieveFromRaw = (stmt,result) => _retrieve_entity('mesures',schema, stmt.columns(), result)


    return module;

}


export default mesure