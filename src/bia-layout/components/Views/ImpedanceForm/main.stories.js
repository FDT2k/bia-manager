
import React, { useEffect,useMemo, useState, useRef } from 'react';
import { makeThemeSelect, Containers, Annotate } from 'stories/storybook-utils'
import makeData from 'seeders/makeData';
import {withBaseClass,withModifiers,withVariables,compose, bem,divElement} from 'bia-layout/utils'
import ImpedanceLayout from './index'
import Container from 'bia-layout/containers/Container';
import Input from 'bia-layout/components/Form/Input'
import mexp  from 'math-expression-evaluator';
export default Annotate({
    Concept: '',
    Default: ''
}, Containers('ViewComponent/Impedance'));



const WithGridArea =  withVariables(
    x => `grid-area`,
    x => `${x}`,
    ['area']
);
const ComponentWithArea = compose(
    WithGridArea
)(divElement);


const fieldName = (row,col)=>{
    return `f_${row}_${col}`
}

const evaluateEquation = (values,formula) => {
    console.log(values,formula);
    const regex = /\{\{(\s*([\w\.-]+)\s*)\}\}/g;
    let m = null;
    let evaluator = formula;
    while ((m = regex.exec(formula))) {
        let key = m[1];

        let value = values[m[1]];
        evaluator = evaluator.replace(m[0],value);
        //console.log(evaluator);
    }
    return evaluator;
}

const recomputeGroup = (conversionFunctions,groups,columns,rows)=>(group,values)=>{
    //console.log('recomputing values')

    let newState = {}
    columns.map(col=> {
        const {[group]:val,...toRecompute} = groups;
        let vals = val.reduce((carry,row)=>{
            let f = fieldName(row,col);
            carry[row]=values[f]
            return carry;
        },{});
        Object.keys(toRecompute).map (recomputed_group=> {
            toRecompute[recomputed_group].map(field=>{
                let formula = conversionFunctions[field];
                let fieldKey = fieldName(field,col);
                if(formula){
                    //console.log(vals,formula);
                    let result =evaluateEquation(vals,formula);
                    //console.log(field,'res',result);
                    result = mexp.eval(result);
                    //console.log(result);
                    //console.log({[fieldKey]:result});
                    newState[fieldKey]=result;
                }
            });
        })
        //console.log(group,val,toRecompute);
    });

    return {...values,...newState};
};

export const Defaut = () =>  {
    const [form,setForm] = useState({group:'a'});
    const columns = [
        '5',
        '50',
        '100'
    ]

    const rows = [
        'res',
        'reac',
        'imp',
        'angl'
    ]

    const groups = {
        'a':['res','reac'],
        'b':['imp','angl']
    }

    const conversionFunctions= {
        'imp': 'root( ({{res}}^2) + ({{reac}}^2))',
    }

    const handleChange= (group,values)=> {

        let newState = recomputeGroup(conversionFunctions,groups,columns,rows)(group,values);

        console.log(newState);
        setForm({
            initialValues:newState,
            group
        });
    };

    console.log(form.initialValues);
    return (
        <ImpedanceLayout columns={columns} handleChange={handleChange} rows={rows} groups={groups} initialValues={form.initialValues} editedGroup={form.group} style={{backgroundColor:'#FF000088'}}/>
    )
}
