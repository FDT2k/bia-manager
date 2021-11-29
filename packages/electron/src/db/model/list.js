import {_transform,_retrieve,_raw_to_object} from '../sqlcipher'
import { is_nil, enlist, is_empty, is_undefined } from '@karsegard/composite-js';
import { key, keyval, spec } from '@karsegard/composite-js/ObjectUtils';
import { spreadObjectPresentIn } from '@karsegard/composite-js/ReactUtils'

const list = (db, api) => {
    const schema = {
        list_key: '',
        key: '',
        value: '',
        default_value:'boolean',
        sort:'',
    }

    const module = {};
    const pkeys = ['id']

    module.select = filters => db.prepare(api.genSelectSQL('lists', filters));
    module.insert = (schema, ignore) => db.prepare(api.genInsertSQL('lists', schema, ignore))
    module.update = (schema, filter) => db.prepare(api.genUpdateSQL('lists', schema, filter))

    module.create = (values) => module.insert(schema,pkeys).run(_transform(schema,values));
    module.save = (values,filter) => module.update(schema,filter).run({...filter,..._transform(schema,{...values,...filter})});

    module.delete = (id)=> db.prepare("delete from lists where id=@id").run({id});

    module.upsert = keys => db.transaction(list => {

        const [filter, _values] = spreadObjectPresentIn(keys, list);
        const [values, _] = spreadObjectPresentIn(Object.keys(schema), _values);
        let result = module.select({ list_key: '', key: '' }).get(filter)

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
        enlist(lists).map(_list => {
            let [list_key, values] = keyval(_list)
            console.log(list_key, values)

            enlist(values).map(item => {
                const [key, value] = keyval(item)
                console.log({

                    list_key,
                    key, value
                })
                module.upsert(['list_key', 'key'])(_transform(schema, {

                    list_key,
                    key, value
                }))


            })

        });
    })

    return module;

}


export default list;