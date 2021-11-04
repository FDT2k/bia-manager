import { updateList, updateProp } from '@/Redux/utils/handlers';
import { reduceListByKeys, enlist, is_nil } from '@karsegard/composite-js';
import { key, value } from '@karsegard/composite-js/ObjectUtils';
import { createReducer } from '@karsegard/react-redux';


 const get_most_accurate_formula = (gender, bmi) => {
    if (gender == 'F' && parseFloat(bmi) >= 30 || gender == 'M' && parseFloat(bmi) >= 26) {
        return 'segal'
    }

    return 'kushner';
}

 const bmi =  (weight_kg, height_cm) => {

    let height = height_cm / 100
    return (new Number(weight_kg / (height * height))).toFixed(1);
}

const ideal_weight = (size_cm,norme={}) => {
   
    let size = parseInt(size_cm);

    if(!is_nil(norme[size]) ){

        return norme[size];
    }

    return 22.5 * ((size/100)*(size/100))
}

export default (getModule) => {

    const { submodules, types } = getModule()


    const module = {};



    const initialState = {
        height:null,
        weight:null,
        bmi: 0,
        bmi_ref:null,
        ideal_weight: null,
        pct_ideal_weight: null,
    }

    module.reducer = (state = initialState, action) => {
        switch(action.type){
            case types.UPDATE:
                return {
                    ...state,
                    ...action.payload,
                    ideal_weight:ideal_weight(action.payload.height,action.mesure.gender),
                    bmi: bmi(action.payload.weight,action.payload.height)
                }
            break;

        }
        return state
    }



    return module;
}