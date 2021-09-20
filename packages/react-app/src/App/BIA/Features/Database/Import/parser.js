import { enlist, is_type_string, is_type_object, is_type_function,is_nil } from '@karsegard/composite-js';
import { key, value, keyval } from '@karsegard/composite-js/ObjectUtils';
import { filterPropPresentIn } from '@karsegard/react-compose'
import { as_safe_path } from '@karsegard/composite-js'


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



export const parse = ({
    text, line_separator, mapping, separator, identifier
}, progress, total_count, callback) => {

    console.log('parsing');
    let data = text.split(line_separator);

    let fields = data[0].split(separator);

    console.log(fields);



    const total = data.length;
    const report_every = 2000;
    let count = 0;
    total_count(total);
    progress(total, 0);

    let collectors = {};
    let extract_lists = enlist(mapping.lists);

    data.shift();
    data = data.map((line) => {
        let values = line.split(separator);

        return values.reduce((carry, item, key) => {
            carry[fields[key]] = item;
            return carry;
        }, {});

    }).reduce((carry, item, idx) => {
        count++;
        if (count > report_every) {
            progress(total, idx);
            count = 0;
        }
        //console.log(item)
        //import relational data
        for (let list of extract_lists) {
            const [collector_key, value] = keyval(list);
            if (!is_nil(item[collector_key]) && item[collector_key] !=="") {
                carry.collectors = as_safe_path(`${value.name}`, carry.collectors, { [item[collector_key]]: item[collector_key] });
            }
        }

        const patient_keys = Object.keys(mapping.patient);
        const [patient, mesure] = filterPropPresentIn(patient_keys, item);
        const index_key = item[identifier];
        if (typeof carry.data[index_key] == "undefined") {

            const p = enlist(patient).reduce(remap(patient, mapping.patient), {});

            carry.data[index_key] = p;
            carry.list.push(p);
            carry.countPatient++;

        }
        if (typeof carry.data[index_key].mesures == "undefined") {
            carry.data[index_key]['mesures'] = [];
            carry.data[index_key]['mesures_dates'] = [];
        }


        let remapped_mesure = enlist(mesure).reduce(remap(mesure, mapping.mesure, carry.data[index_key]), {});

        carry.data[index_key].mesures.push(remapped_mesure);
        carry.data[index_key].mesures_dates.push(remapped_mesure.date);

        carry.countMesure++;

        return carry;
    }, { data: {}, collectors, list: [], countPatient: 0, countMesure: 0 });
    progress(total, 100);

    callback({ result: data })

}
