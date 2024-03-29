import {reduceListByKeys, enlist, is_nil } from '@karsegard/composite-js';
import { key, value } from '@karsegard/composite-js/ObjectUtils';
import { createReducer,handlers } from '@karsegard/react-redux';


const {updateList, updateProp } = handlers


export default (getModule) => {

    const { submodules, types } = getModule()


    const module = {};


    

    /**
     * 
     * state = {
     *  'key' => [values,values]
     * }
     */
    module.norme = createReducer({}, {
        [types.REFRESH]: (state, { payload }) => updateProp(payload.key, state, payload.values)
    })

    module.normeByGender = createReducer({}, {
        [types.FETCHED]: (state, action) => {
            let genders = action.payload.genders;
            return enlist(action.payload.normes).reduce((carry, item) => {

                let _key = key(item);
                let _value = value(item);
                carry = genders.reduce(
                    (gen, it) => {
                        let values = _value[it];
                        if (!gen[it]) {
                            gen[it] = {}
                        }
                        gen[it][_key] = values;
                        return gen;
                    }
                    , carry)

                return carry;
            }, {})
        }
    })


    /**
     * 
     * 
     */
    const sample_norm = (sex, key, norm) => {
        let samples = [];
        const [min, max] = norm.values;

        if (!is_nil(norm.age_range)) {
            const [age_min, age_max] = norm.age_range;
            // for (let i = age_min; i <= age_max; i++) {
            samples.push({ key, min, max, age: age_min, age_range: norm.age_range, sex })
            // }
        } else {
            samples.push({ key, min, max, age: norm.age_min, sex })
        }
        return samples;
    }
    /*
        Prepare norm for chart.
        
    */
    module.normeChartSampling = createReducer({}, {
        [types.FETCHED]: (state, action) => {
            let genders = action.payload.genders;

            let samples = enlist(action.payload.normes).reduce((carry, item) => {

                let _norm_key = key(item);
                let _options = value(item);

                carry = genders.reduce((result, sex) => {


                    let _result = _options[sex].reduce((result, norm) => {
                        let sample = sample_norm(sex, _norm_key, norm)



                        result = [...result, ...sample];
                        return result;

                    }, []);

                    return [...result, ..._result];
                }, carry);

                return carry;
            }, [])

            let result =  samples.reduce((list, item) => {
                const { sex, age_range, age, key } = item;
                if (!list[sex]) {
                    list[sex] = [];
                }


                let existing = list[sex].find(item => item.age === age);

                if (!existing) {

                    list[sex].push({
                        age,
                        age_range,
                        [`${key}_min`]: item.min,
                        [`${key}_max`]: item.max,

                        [`${key}`]: [item.min, item.max]
                    });
                } else {

                    list[sex] = updateList(item => item.age === age, list[sex], element => {

                        return {
                            ...element,
                            [`${key}_min`]: item.min,
                            [`${key}_max`]: item.max,
                            [`${key}`]: [item.min, item.max]
                        }
                    }).sort((a, b) => {
                        return a.age - b.age;
                    });
                }

                return list;
            }, {});
            console.log(result)
            return result;
        }
    })


    module.reducer = createReducer({ byPatient: {} }, {
        
        [types.FETCHED]: (state, action) => {

            return {
                ...state,
                normes: action.payload.normes,
                byKey:reduceListByKeys(['sex'],action.payload.list),
                chartSample: module.normeChartSampling(state.chartSample, action)
            }
        }
    });



    return module;
}