import { enlist, is_type_string, is_type_object, is_type_function, is_nil, is_empty, identity } from '@karsegard/composite-js';
import { key, value, keyval } from '@karsegard/composite-js/ObjectUtils';
import { filterPropPresentIn } from '@karsegard/react-compose'
import { as_safe_path } from '@karsegard/composite-js'
import faker from 'faker'
import { format, parseISO } from 'date-fns'



let data = [];
let fields = [];
let settings = {}
let total = 0;
let progress = 0;
let collectors = {};
let extract_lists = []
let countPatient= 0
let countMesure= 0


//const progress = (total, current) => ({ progress: Math.round(current * 100 / total) })
//const total_count = (total) => ({ total: total })

export const remap = (obj, mapping, ref = {}) => (carry, item) => {
    let _key = key(item);
    let _mapped = mapping[_key];
    if (_mapped && is_type_string(_mapped)) {
        carry[_mapped] = value(item);
    } else if (is_type_object(_mapped)) {
        let { name, transform } = _mapped;
        if (!is_type_function(transform)) {
            transform = eval(transform);
        }

        carry[name] = transform(carry[name], obj, { ...ref, ...carry });

    }
    return carry;
}



export const init = (payload, callback) => {

    let { text, ...options } = payload;

    settings = { ...options };

    let {
        line_separator, mapping, separator, identifier, anonymous
    } = settings;

    data = text.split(line_separator);
    fields = data[0].split(separator);
    data.shift(); //remove the first line
    data = data.map((line) => {
        let values = line.split(separator);

        return values.reduce((carry, item, key) => {
            carry[fields[key]] = item;
            return carry;
        }, {});

    })
    total = data.length;
    extract_lists = enlist(mapping.lists);
console.log('hey')
    callback({total});

}


export const parse = ({
    count
}, callback) => {

    const { anonymous, mapping, identifier } = settings;
    console.log('parsing ', anonymous);

    let result = data.splice(0, count).reduce((carry, item, idx) => {

        //import relational data
        for (let list of extract_lists) {
            const [collector_key, value] = keyval(list);
            let transform = eval(value.transform)
            if (!transform) {
                transform = (state, values) => values[collector_key];
            }

            const collectible_value = transform('', item);

            if (!is_empty(collectible_value)) {
                carry.collectors = as_safe_path(`${value.name}`, carry.collectors, { [collectible_value]: collectible_value });
                //    import_list_item(value.name,collectible_value);
            }

        }

        const patient_keys = Object.keys(mapping.patient);
        const [patient, mesure] = filterPropPresentIn(patient_keys, item);
        const index_key = item[identifier];

        if (typeof carry.data[index_key] == "undefined") {

            const p = enlist(patient).reduce(remap(patient, mapping.patient), {});

            if (anonymous) {
                try {
                    p.firstname = faker.name.firstName();
                    p.lastname = faker.name.lastName();
                    const year = format(parseISO(p.birthdate), "yyyy")
                    p.birthdate = format(faker.date.between(`${year}-01-01`, `${year}-12-31`), "yyyy-MM-dd");
                } catch (err) {
                    debugger;

                    p.birthdate = format(faker.date.between(`1901-01-01`, `2021-12-31`), "yyyy-MM-dd");
                }
            }
            p.uuid = index_key
            carry.data[index_key] = p;
            carry.list.push(p);
            //  import_subject(p,index_key);
            countPatient++;

        }
        if (typeof carry.data[index_key].mesures == "undefined") {
            carry.data[index_key]['mesures'] = [];
            carry.data[index_key]['mesures_dates'] = [];
        }


        let remapped_mesure = enlist(mesure).reduce(remap(mesure, mapping.mesure, carry.data[index_key]), {});

        //  import_mesure(remapped_mesure,index_key);
        carry.data[index_key].mesures.push(remapped_mesure);
        carry.data[index_key].mesures_dates.push(remapped_mesure.date);



        countMesure++;
        return carry;
    }, { data: {}, collectors, list: [], index_key: '' });

    console.log('hellod')
    if (result.list.length > 0) {
        progress= parseInt(countMesure);
        callback({ result,progress,countPatient,total,countMesure })
    } else {
        data = [];
        callback({ done: true })
    }

}


export default ({data:{message,data}}, callback) => {
    console.log('hello',message,data)
    switch (message) {
        case 'init':
            init(data, callback);
            break;
        case 'parse':
            parse(data, callback);
            break;
    }

}