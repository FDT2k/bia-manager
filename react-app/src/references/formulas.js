import { is_nil, is_type_function } from "@karsegard/composite-js";

import { evaluateEquation } from 'references/expression';



export const formulas = {

    gva: [
        {
            name: "res",
            fn: mesure => mesure.data.res50,
            display: false,
        },
        {
            name: 'gender_idx',
            fn: mesure => mesure.gender === 'M' ? 1 : 0,
            display: false,
        },
        {
            name: 'mg',
            eval: "-4.104 + ((0.518 * root({height})) / {res}) +(0.231 * {weight}) + (4.229 * {gender_idx})"
        },
        {
            name: 'mm',
            eval: "{weight} - {mg}"
        },
        {
            name: 'pct_mm',
            eval: "{mm} *100 / {weight}"
        },
        {
            name: 'pct_mg',
            eval: "{mg} * 100 / {weight}"
        },
        {
            //=W6/I6*100
            name: 'lf_ratio',
            eval: '{mm} / {mg}'
        }
    ],

    segal: [
        {
            name:"current_age",
            display:false,
            fn: data => {
                var ageDifMs = (new Date(data.date)).getTime() - (new Date(data.birthdate)).getTime();
                var ageDate = new Date(ageDifMs); // miliseconds from epoch
                return Math.abs(ageDate.getUTCFullYear() - 1970);
            }
        },
        {
            name: "res",
            fn: mesure => mesure.data.res50,
            display: false,
        },
        {
            name: 'ht2r',
            eval: "({height}^2)/ {res}"
        },
        {
            name: 'mm',
            eval: "(0.00091186 * (pow({height},2)))-(0.01486*{res}) + (0.2999 * {weight})-(0.07012 * {current_age}) + 9.37938",
            cond: mesure => mesure.gender === 'F'
        },
        {
            name: 'mm',
            eval: "(0.0008858 * {height}^2) - (0.02999 * {res}) + (0.42688 * {weight})-(0.07002 * {current_age})+ 14.52435",
            cond: mesure => mesure.gender === 'M'
        },
        {
            name: 'water',
            eval: '0.73 * {mm}'
        },
        {
            name: 'pct_water',
            eval: '{water}/{weight} *100 '
        },
        {
            name: 'net_mm',
            eval: '{mm} - {water}'
        },
        {
            name: 'mg',
            eval: '{weight} - {mm}'
        },
        {

            //Densité 	corporelle BIA 	= 1.1554 – ( 0.0841 ((poids (kg) x Résistance50 	kHz) / taille (m)2)))
            name: 'density',
            eval: "1.1554 - ( 0.0841 * (({weight} * {res} ) / ( {height}^2)  ))",
            cond: mesure => mesure.gender === 'M'
        },
        {
            //=W6/I6*100
            name: 'pct_mm',
            eval: '{mm}/{weight}*100'
        },
        {
            //=W6/I6*100
            name: 'pct_net_mm',
            eval: '{net_mm}/{weight}*100'
        },
        {
            //=W6/I6*100
            name: 'lf_ratio',
            eval: '{mm} / {mg}'
        },
        {
            name: 'pct_mg',
            eval: "{mg} * 100 / {weight}"
        },
    ],


    kushner: [
        {
            name: "res",
            fn: mesure => mesure.data.res50,
            display: false,
        },
        {
            name: 'ht2r',
            eval: "({height}^2)/ {res}"
        },
        {
            name: 'water',
            eval: "8.3148 + ( (0.3821 * pow( {height},2) ) / {res}) + 0.1052 * {weight}",
            cond: mesure => mesure.gender === 'F'
        },
        {
            name: 'water',
            eval: "(0.3963 *  ({height}^2) / {res}) + (0.143 * {weight}) + 8.3999999",
            cond: mesure => mesure.gender === 'M'
        },
        {
            name: 'pct_water',
            eval: '{water}/{weight} *100 '
        },
        {

            //Densité 	corporelle BIA 	= 1.1554 – ( 0.0841 ((poids (kg) x Résistance50 	kHz) / taille (m)2)))
            name: 'density',
            eval: "1.1554 - ( 0.0841 * (({weight} * {res} ) / ( {height}^2)  ))",
            cond: mesure => mesure.gender === 'M'
        },
        {
            //=1.1411-0.0763*I6*O6/(H6*H6)
            name: 'density',
            eval: " 1.1411-0.0763*{weight}*{res}/({height}^2) ",
            cond: mesure => mesure.gender === 'F'
        },
        {
            name: 'pct_mg',
            eval: "(4.95 / {density} - 4.5) * 100",
            cond: mesure => mesure.gender === 'M'
        },
        {
            //=ABS(1-(0.3981*S6+0.3066*I6+0.0952999*(H6-100)+0.7414)/I6)*100
            name: 'pct_mg',
            eval: "ABS(1-(0.3981 * {ht2r} + (0.3066 * {weight}) + 0.0952999 * ({height}-100) + 0.7414) / {weight})*100",
            cond: mesure => mesure.gender === 'F'
        },

        {
            name: 'mg',
            eval: '{weight}*{pct_mg} /100 '
        },
        {
            //=I6-I6*Z6/100
            name: 'mm',
            eval: '{weight}- ({weight}*{pct_mg}/100)'
        },
        {
            //=I6-I6*Z6/100
            name: 'net_mm',
            eval: '{mm}-{water}'
        },
        {
            //=W6/I6*100
            name: 'pct_mm',
            eval: '{mm}/{weight}*100'
        },
        {
            //=W6/I6*100
            name: 'pct_net_mm',
            eval: '{net_mm}/{weight}*100'
        },
        {
            //=W6/I6*100
            name: 'lf_ratio',
            eval: '{mm} / {mg}'
        }
        
    ]
}



const normalize_item = item => {

    let newItem = {...item};

    if(item.display !==false){
        item.display = true;
    }
    
    return newItem
}

export const calculate = (values) => {
    let result = Object.keys(formulas).reduce((carry, formula) => {

        carry[formula] = formulas[formula].reduce((res, _item) => {
            let item = normalize_item(_item)
            let varname = item.name;
            let fn = item.fn;
            let cond = item.cond;
            let evaluator = item.eval
            if (is_nil(cond) || (is_type_function(cond) && cond(values) === true)) {
                if(!res[varname]){
                    const {__,___,...rest} = item;
                    res[varname]={...rest};
                }
                if (is_type_function(fn)) {
                    res[varname]['value'] = fn(values);
                } else {
                    try {

                        const alreadyComputed = Object.keys(res).reduce( (computed,item)=> {

                            computed[item] = res[item].value;

                            return computed;
                        },{});

                        const {result:value, log} = evaluateEquation({ ...values, ...alreadyComputed }, evaluator);
                        res[varname]['value'] = value;
                        res[varname]['log'] = log;
                        
                    } catch (e) {
                        console.error(e);
                    }
                }
            }

            return res;
        }, {});
        return carry;
    }, {});


    return result;
}