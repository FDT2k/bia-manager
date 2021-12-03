import mesure from './mesure'
import { is_nil, enlist, is_empty, is_undefined } from '@karsegard/composite-js';
import { key, keyval, spec,pathes } from '@karsegard/composite-js/ObjectUtils';
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
        mesures_dates: 'array',
        diag: ''
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






    module.fetchWithMesures = id => {

        let stmt = db.prepare("Select s.* from subjects s  where s.id =@id ").raw();
        let stmt_mesures = db.prepare("Select m.* from mesures m  where m.subject_id =@id and status!='deleted'").raw();

        //  let result =  stmt.all({id});

        let res;
        /*  for (let result of stmt.iterate({ id })) {
              if (!res) {
                  res = _retrieve_entity('subjects', schema, stmt.columns(), result);
              }
  
              if (!res.mesures) {
                  res.mesures = [];
              }
              res.mesures.push(_mesure.retrieveFromRaw(stmt, result))
          }*/


        res = _retrieve_entity('subjects', schema, stmt.columns(), stmt.get({ id }));
        res.mesures = [];
        for (let result of stmt_mesures.iterate({ id })) {

            res.mesures.push(_mesure.retrieveFromRaw(stmt_mesures, result))
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
            console.log(str_value, isset)
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
        if (module.guess_table(filter.key) === table) {
            let partial = module.build_search(filter, carry.sep);
            if (!is_empty(partial)) {
                carry.query.push(partial);
                carry.sep = 'and';
            }

        }
        return carry;
    };


    module.custom_search = (custom_filters) => {


        let method = "where";

        let whereClauses = enlist(custom_filters).reduce(mainReducer('subject'), { query: [], sep: 'where' }).query.join(' ');
        let havingClauses = enlist(custom_filters).reduce(mainReducer('mesure'), { query: [], sep: 'having' }).query.join(' ');

        let query_start = `Select s.*,count(m.id)as count_mesures, (s.firstname || s.lastname || s.birthdate ) as search_terms,group_concat(m.date) as mesures_dates from subjects as s left join mesures as m on s.id=m.subject_id `


        let sql = `
            ${query_start}
            ${whereClauses}
            group by s.id
            ${havingClauses}
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


    const extract_object = (row, defaultValue) => {
        let val = pathes(defaultValue)
        try {
            let value = JSON.parse(row);
            value = pathes(value);
            val = {
                ...val,
                ...value
            }
        } catch (e) { }
        return enlist(val);
    }

    const sideState = {
        main: false,
        data: {
            0: '',
            1: '',
            2: '',
        },
        avg: '',
        norme: ''
    }
    const csv_json_map = {
        groups:{ patho: "", "ethno": "" },
        data: {"z50":"","a50":"","res50":"","rea50":"","z5":"","a5":"","res5":"","rea5":"","z100":"","a100":"","res100":"","rea100":""},
        sport: {"type":"","rate":""},
        fds: {
            left:{...sideState},
            right:{...sideState}
        }
    }

    const retrieve_csv_row = (row, columns) => {
        return columns.reduce(
            (carry, col, idx) => {
                if (!is_nil(csv_json_map[col.name])) {
                   
                    extract_object(row[idx],csv_json_map[col.name]).map(subitem=> {
                        let[_key,_val] = keyval(subitem);
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
                if (!is_nil(csv_json_map[col.name])) {
                   
                    extract_object(row[idx],csv_json_map[col.name]).map(subitem=> {
                        let[_key,_val] = keyval(subitem);
                        carry.push(`"${col.name}.${_key}"`)
                    })
                } else {
                    carry.push(`"${row[idx]}"`);
                }

                return carry;
            }
            , []);

    }


    module.export_csv = (custom_filters, separator) => {


        let method = "where";

        let whereClauses = enlist(custom_filters).reduce(mainReducer('subject'), { query: [], sep: 'where' }).query.join(' ');
        let havingClauses = enlist(custom_filters).reduce(mainReducer('mesure'), { query: [], sep: 'having' }).query.join(' ');

        let query_start = `Select s.*,count(m.id)as count_mesures, m.* from subjects as s left join mesures as m on s.id=m.subject_id `


        let sql = `
            ${query_start}
            ${whereClauses}
            group by m.id
            ${havingClauses}

            order by s.id
        `

        console.log(sql)

        let stmt = db.prepare(sql).raw(true);
        const res = [];
        let cols = stmt.columns();
        res.push(retrieve_csv_cols(cols.map(item=>item.name),cols).join(separator));
        for (let result of stmt.iterate()) {
            // console.log(result)
            res.push(retrieve_csv_row(result, cols).join(separator));
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