import mesure from './mesure'
import { is_nil, enlist, is_empty, is_type_string, is_undefined, keys, is_type_array, is_type_function, safe_path } from '@karsegard/composite-js';
import { key, keyval, spec, pathes } from '@karsegard/composite-js/ObjectUtils';
import { spreadObjectPresentIn } from '@karsegard/composite-js/ReactUtils'
import { _transform, _retrieve, _retrieve_from_raw, _retrieve_entity, _raw_to_object, _retrieve_row } from '../sqlcipher'
import ohash from 'object-hash'

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
        diag: 'json',
        med_name: '',
        med_service: '',
        hash: '',
        last_updated: '',
        status: ''
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
        console.log('importing', subjects.length)
        for (let subject of subjects) {
            debugger;
            let [crap, to_hash] = spreadObjectPresentIn(['mesures_dates', 'mesures', 'id', 'hash'], subject);

            subject.hash = ohash(to_hash);

            let subject_id = module.upsert(['uuid'])(_transform(schema, subject))
            subject.id = subject_id;
            _mesure.import(subject)(subject.mesures);
        }
    })


    module.bulk_update = (data, filter) => db.transaction((subjects) => {
        console.log('updating', subjects.length)
        for (let subject of subjects) {

            const [_values] = spreadObjectPresentIn(keys(data), subject);
            const [_filters] = spreadObjectPresentIn(keys(filter), subject);
            debugger;
            module.update(data, filter).run({ ..._values, ..._filters });
        }
    })


    module.all = (filter, hash = 'main', removeIds = false) => {

        let stmt = db.prepare(`Select s.* from ${hash}.subjects s  where ${api.genConditionSQL(filter)}`).raw();


        let res = [];
        let cols = stmt.columns()


        for (let result of stmt.iterate(filter)) {
            let subject = _retrieve_entity('subjects', schema, cols, result);
            if (removeIds) {
                delete subject.id;
            }
            res.push(subject);
        }


        return res;
    };

    module.fetch = (filter, hash = 'main', removeIds = false) => {

        let stmt = db.prepare(`Select s.* from ${hash}.subjects s  where ${api.genConditionSQL(filter)}`).raw();





        return _retrieve_entity('subjects', schema, stmt.columns(), stmt.get(filter));
    }

    module.fetchFull = (filter, filter_mesures, hash = 'main', removeIds = false) => {

        let stmt = db.prepare(`Select s.* from ${hash}.subjects s  where ${api.genConditionSQL(filter)}`).raw();
        let stmt_mesures = db.prepare(`Select * from ${hash}.mesures where  ${api.genConditionSQL(filter_mesures)}`).raw();


        let res;


        res = _retrieve_entity('subjects', schema, stmt.columns(), stmt.get(filter));
        if (removeIds) {
            delete res.id;
        }
        res.mesures = [];
        for (let result of stmt_mesures.iterate(filter_mesures)) {
            let mes = _mesure.retrieveFromRaw(stmt_mesures, result)
            if (removeIds) {
                delete mes.id;
                delete mes.subject_id;
            }
            res.mesures.push(mes)
        }
        return res;
    };


    module.fetchWithMesures = (id, hash = 'main', removeIds = false) => {

        let stmt = db.prepare(`Select s.* from ${hash}.subjects s  where s.id =@id`).raw();
        let stmt_mesures = db.prepare(`Select m.* from ${hash}.mesures m  where m.subject_id =@id and status!='deleted'`).raw();


        let res;


        res = _retrieve_entity('subjects', schema, stmt.columns(), stmt.get({ id }));
        if (removeIds) {
            delete res.id;
        }
        res.mesures = [];
        for (let result of stmt_mesures.iterate({ id })) {
            let mes = _mesure.retrieveFromRaw(stmt_mesures, result)
            if (removeIds) {
                delete mes.id;
                delete mes.subject_id;
            }
            res.mesures.push(mes)
        }
        return res;
    };

    module.create = (subject) => {
        let res = module.insert(subject, pkeys).run(_transform(schema, subject));
        return res.lastInsertRowid;
    }

    module.save = subject => {
        console.log('saving', subject)

        const { id, ...rest } = subject;

        const { hash, last_updated, ...to_hash } = rest;
        subject.hash = ohash(to_hash);
        rest.hash = subject.hash;
        let res = module.update(rest, { id }).run({ ..._transform(schema, subject), id });
        return res;
    }


    const custom_partial_date_range = (key, from, until) => {

        if (!is_nil(from) && !is_nil(until)) {
            return `${key} BETWEEN '${from}' AND '${until}'`
        } else if (!is_nil(from) && is_nil(until)) {
            return `${key} >= '${from}'`

        } else if (is_nil(from) && !is_nil(until)) {
            return `${key} <='${until}'`

        }

    }

    const custom_partial_bools = ({ key, options }) => {

        return enlist(options).reduce((carry, item) => {
            let [str_value, isset] = keyval(item);
            //   console.log(str_value, isset)
            if (isset === true) {
                carry.query.push(`${carry.sep} ${key} = '${str_value}'`)
                carry.sep = 'or'
            }
            return carry;
        }, { query: [], sep: '' }).query.join('')

    }

    module.build_search = ({ type, ...filter }, sep = 'where') => {
        let query = ``
        switch (type) {
            case 'date_range':
                query = `${sep} (${custom_partial_date_range(filter.key, filter.from, filter.to)})`

                break;
            case 'bools':
                query = `${sep} (${custom_partial_bools(filter)})`

                break;
        }
        return query;
    }

    module.guess_table = (key) => {
        if (key.startsWith('mesure')) {
            return 'mesure'
        }
        return 'subject'
    }

    const mainReducer = table => (carry, item) => {
        let [name, filter] = keyval(item);
        if (!is_empty(filter)) {
            if (module.guess_table(filter.key) === table) {
                let partial = module.build_search(filter, carry.sep);
                if (!is_empty(partial)) {
                    carry.query.push(partial);
                    carry.sep = 'and';
                }

            }
        }
        return carry;
    };


    module.custom_search = (custom_filters) => {


        let whereClauses = enlist(custom_filters).reduce(mainReducer('subject'), { query: [], sep: 'where' }).query.join(' ');
        let havingClauses = enlist(custom_filters).reduce(mainReducer('mesure'), { query: [], sep: 'having' }).query.join(' ');

        let query_start = `Select s.*,count(m.uuid) as count_mesures, (s.firstname || s.lastname || s.birthdate ) as search_terms 
        from subjects as s 
        
        left join mesures as m on s.uuid=m.subject_uuid `


        let sql = `
            ${query_start}

            where s.uuid in (
                Select distinct s.uuid
                from subjects as s 
                
                left join mesures as m on s.uuid=m.subject_uuid 
                  
        
                ${whereClauses}
                group by s.uuid
                ${havingClauses}
            )
            group by s.uuid
            ${havingClauses}
            COLLATE NOCASE;
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

    module.export_csv = ({ custom_filters, rawExport, onlyMeasure }, separator, stream) => {


        let method = "where";

        let whereClauses = enlist(custom_filters).reduce(mainReducer('subject'), { query: [], sep: 'where' }).query.join(' ');
        let havingClauses = enlist(custom_filters).reduce(mainReducer('mesure'), { query: [], sep: 'having' }).query.join(' ');

        let query_start = `Select s.*, m.* from subjects as s left join mesures as m on s.id=m.subject_id `

        let query = ``;

        if (enlist(custom_filters).length > 0) {

            if (onlyMeasure) {
                query = `where m.uuid in (
                    Select distinct m.uuid
                    from subjects as s 
                    left join mesures as m on s.uuid=m.subject_uuid 
                    ${whereClauses}
                    and m.status !='deleted'
                    group by s.uuid
                    ${havingClauses}
                )`;
            } else {
                query = `where s.uuid in (
                Select distinct s.uuid
                from subjects as s 
                left join mesures as m on s.uuid=m.subject_uuid 
                ${whereClauses}
                and m.status !='deleted'
                group by s.uuid
                ${havingClauses}
            )`;
            }
        }

        let sql = `
            ${query_start}

           
            ${query}
            group by m.id
            
            order by s.id
        `

        console.log('export', sql)

        let stmt = db.prepare(sql).raw(true);
        const res = [];
        let cols = stmt.columns();
        // extract_cols(cols);
        //   res.push(retrieve_csv_cols(cols.map(item => item.name), cols).join(separator));
        if (rawExport == false) {
            let columns = retrieve_csv_cols(cols.map(item => item.name), cols);
            stream.write(columns.join(separator) + '\n');
            //  let columns = extract_columns(cols);  
            for (let result of stmt.iterate()) {
                // console.log(result)
                let row = retrieve_csv_row(result, cols);
                stream.write(row.join(separator) + '\n');
                //console.log(row);
                //     res.push(retrieve_csv_row(result, cols).join(separator));
                //    console.log(extract_values(result,columns));
            }
        } else {
            stream.write(cols.map(item => `"${item.table}.${item.name}"`).join(separator) + '\n');
            for (let result of stmt.iterate()) {
                stream.write(result.map(item => {
                    return is_type_string(item) ? `"${item.replace(/\"/g, '""')}"` : `${item}`
                }).join(separator) + '\n');
            }
        }
        //return res;
    }





    const sideState = {
        main: false,
        data: {
            0: '',
            1: '',
            2: '',
        },
        avg: '',
        norme: (path, row, coldef = false) => {
            if (coldef) {
                return {
                    [`${path}.min`]: '',
                    [`${path}.max`]: ''
                }
            } else {
                return {
                    [`${path}.min`]: row[0],
                    [`${path}.max`]: row[1]
                }
            }
        }
    }
    const csv_json_map = {
        groups: { patho: "", "ethno": "" },
        data: { "z50": "", "a50": "", "res50": "", "rea50": "", "z5": "", "a5": "", "res5": "", "rea5": "", "z100": "", "a100": "", "res100": "", "rea100": "" },
        sport: { "type": "", "rate": "" },
        fds: {
            left: { ...sideState },
            right: { ...sideState }
        },
        bia_data: {
            kushner: { "fm": "", "pct_fm": "", "ffm": "", "pct_ffm": "", "dffm": "", "pct_dffm": "", "ffmi": "", "fmi": "", "water": "", "pct_water": "" },
            segal: { "fm": "", "pct_fm": "", "ffm": "", "pct_ffm": "", "dffm": "", "pct_dffm": "", "ffmi": "", "fmi": "", "water": "", "pct_water": "" },
            gva: { "fm": "", "pct_fm": "", "ffm": "", "pct_ffm": "", "ffmi": "", "fmi": "" }
        }
    }

    const extract_object = (row, defaultValue, coldef = false) => {
        let val = pathes(extract_columns(defaultValue))
        try {
            let value = JSON.parse(row);

            value = pathes(value);

            value = enlist(value).reduce((carry, path) => {

                let [_key, _val] = keyval(path);
                let __def = safe_path('', _key, defaultValue);
                if (is_type_function(__def)) {
                    carry = {
                        ...carry,
                        ...__def(_key, _val, coldef)
                    }
                } else {
                    carry[_key] = _val;
                }
                return carry;
            }, {});


            val = {
                ...val,
                ...value
            }
        } catch (e) { }
        return val;
    }


    const extract_columns = (defaultValue) => {
        let val = pathes(defaultValue)
        val = enlist(val).reduce((carry, path) => {

            let [_key, _val] = keyval(path);
            //     debugger
            let __def = safe_path('', _key, defaultValue);
            //     debugger;
            if (is_type_function(__def)) {
                carry = {
                    ...carry,
                    ...__def(_key, _val, true)
                }
            } else {
                carry[_key] = _val;
            }
            return carry;
        }, {});


        val = {
            ...val,
        }

        return val;
    }
    const retrieve_csv_row = (row, columns) => {
      //  console.log(columns);
        return columns.reduce(
            (carry, col, idx) => {
                if(col.name == 'diag'){
                   return carry;
                }
                if (!is_nil(csv_json_map[col.name])) {

                    let __columns = enlist(extract_object(row[idx], csv_json_map[col.name], false));

                    __columns.map(subitem => {
                        let [_key, _val] = keyval(subitem);
                        carry.push(`"${_val}"`)
                    })
                } else {
                    carry.push(`"${row[idx]}"`);

                }

                return carry;
            }
            , []);
    }

    const retrieve_csv_cols = (row, columns) => {
        return columns.reduce(
            (carry, col, idx) => {
                if(col.name == 'diag'){
                    return carry;
                 }
                if (!is_nil(csv_json_map[col.name])) {

                    let __columns = enlist(extract_columns(csv_json_map[col.name]));

                    __columns.map(subitem => {
                        let [_key, _val] = keyval(subitem);
                        carry.push(`"${col.name}.${_key}"`)
                    })
                } else {
                    carry.push(`"${row[idx]}"`);
                }

                return carry;
            }
            , []);

    }


    module.softDelete = (uuid) => module.update({ status: 'deleted' }, { uuid }).run({ uuid, status: 'deleted' });

    module.search = (tag) => {
        let hasField = tag.indexOf(':') !== -1;

        let sql = `Select s.*,count(m.id)as count_mesures, (s.firstname || s.lastname || s.birthdate ) as search_terms,group_concat(m.date) as mesures_dates 
            from subjects as s left join mesures as m on s.id=m.subject_id 
        
            where (s.firstname like @tag 
                or s.lastname like @tag
                or s.birthdate like @tag
                or s.gender =@tag)
                and s.status !='deleted'

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