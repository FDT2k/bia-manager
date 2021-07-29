import { is_nil, is_type_function } from "@karsegard/composite-js";

import {evaluateEquation} from 'references/expression';

export const formulas =  {

    gva: [
        {
            name:"res",
            fn: mesure => mesure.data.res50
        },
        { 
            name:'gender_idx', 
            fn: mesure=> mesure.gender ==='M' ? 1 : 0 
        },
        {   
            name:'mng', 
            eval:"-4.104 + ((0.518 * root({height})) / {res}) +(0.231 * {weight}) + (4.229 * {gender_idx})"
        },
        {   
            name:'mg', 
            eval:"{weight} - {mng}"
        },
        {   
            name:'pct_mng ',
            eval: "{mng} *100 / {weight}"
        },
        {   
            name:'pct_mg',
            eval:"{mg} * 100 / {weight}"
        }
    ],

    segal:[
        {
            name:"res",
            fn: mesure => mesure.data.res50
        },
        {
            name: 'height_meter',
            eval: "{height}/100"
        },
        {   
            name:'mng',
            eval:"(0.00091186 * (pow({height_meter},2))) 	- (0.01486 * {res}) + (0.2999 * {weight})  - (0.07012 x {age}) + 9.37938",
            cond: mesure => mesure.gender === 'F'
        },
        {   
            name:'mng',
            eval:"(0.0008858 * {height_meter}^2) - (0.02999 * {res}) + (0.42688 * {weight})  - (0.07002 * {age})+ 14.52435",
            cond: mesure => mesure.gender === 'M'
        },
        {
            name: 'water',
            eval: '0.73 * {mng}'
        },
        {
            name: 'mngs',
            eval: '{mng} - {water}'
        },
        {
            name: 'mg',
            eval: '{weight} / {mng}'
        }
    ],

    
    kushner:[
        {
            name:"res",
            fn: mesure => mesure.data.res50
        },
        {
            name: 'height_meter',
            eval: "{height}/100"
        },
        {
            name: 'water', 
            eval:"8.3148 + ( (0.3821 * pow( {height_meter},2) ) / {res}) + 0.1052 * {weight}" ,
            cond: mesure => mesure.gender ==='F'
        },
        {
            name: 'water', 
            eval:"(0.3963 *  pow( {height_meter},2) / {res}) + (0.143 * {weight}) + 8.3999999" ,
            cond: mesure => mesure.gender ==='M'
        },
        {

            //Densité 	corporelle BIA 	= 1.1554 – ( 0.0841 ((poids (kg) x Résistance50 	kHz) / taille (m)2)))
            name: 'density', 
            eval:"1.1554 - ( 0.0841 * (({weight} * {res} ) / ( {height_meter}* {height_meter})  ))" ,
            cond: mesure => mesure.gender ==='M'
        },
        {
            name: 'pct_mg',
            eval:"(4.95 / {density} - 4.5) * 100",
            cond: mesure => mesure.gender ==='M'
        },
        {
            name: 'pct_mg',
            eval:"ABS (1-(0.3981 * pow( {height_meter},2) / res + (0.3066 * {weight}) + 0.0952999 * ({height_meter}-100) + 0.7414) / {weight}) x 100",
            cond: mesure => mesure.gender ==='F'
        }
        
    ]
}


export const calculate =  (values)=>{
    let result = Object.keys(formulas).reduce ((carry,formula)=> {
        
        carry[formula] = formulas[formula].reduce((res,item)=>{
            let varname = item.name;
            let fn = item.fn;
            let cond = item.cond;
            let evaluator = item.eval
            console.log(formula);
            if( is_nil(cond) || (is_type_function(cond) && cond(values) === true)){
                console.log(varname);
                if (is_type_function(fn)){
                    res[varname] = fn(values);
                }else {
                    try{
                    //evaluate expression;
                    res[varname] = evaluateEquation({...values,...res},evaluator);
                    }catch (e){
                        console.error(e);
                    }
                }
            }
          
            return res;
        },{});
        return carry;
    },{});


    return result;
}