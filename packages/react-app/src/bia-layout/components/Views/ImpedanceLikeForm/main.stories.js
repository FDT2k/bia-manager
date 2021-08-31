
import React, { useEffect,useMemo, useState, useRef } from 'react';
import { makeThemeSelect, AppToc, Annotate } from 'stories/storybook-utils'
import makeData from 'seeders/makeData';
import {withBaseClass,withModifiers,withVariables,compose, bem,divElement} from '@karsegard/react-compose'
import ImpedanceLayout from './index'
import {ComponentWithArea,withGridArea} from '@/bia-layout/hoc/grid/Area'
import Container from '@/bia-layout/containers/Container';
import Input from '@/bia-layout/components/Form/Input'
import mexp  from 'math-expression-evaluator';
export default Annotate({
    Concept: '',
    Default: ''
}, AppToc('ViewComponent/Impedance'));





const fieldName = (row,col)=>{
    return `${row}${col}`
}

const evaluateEquation = (values,formula) => {
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
                    try{
                    //console.log(vals,formula);
                    let result =evaluateEquation(vals,formula);
                    //console.log(field,'res',result);
                    result = mexp.eval(result);
                    if(isNaN(result)){
                        result = '-';
                    }
                    //console.log(result);
                    //console.log({[fieldKey]:result});
                    newState[fieldKey]=result;
                    }catch(e){
                        console.error(e)
                        newState[fieldKey]='-';

                    }
                }else{
                    newState[fieldKey]='-';
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
        'rea',
        'z',
        'a'
    ]

    const groups = {
        'a':['res','rea'],
        'b':['z','a']
    }

    const conversionFunctions= {
        'z': 'root( ({{res}}^2) + ({{rea}}^2))',
        'a': 'atan( ({{rea}} / {{res}}) * (180/pi)  )',
        'res': '{{z}} * cos({{a}}/(180/pi))',
        'rea': '{{z}} * sin({{a}} /(180/pi))',
    }

    const handleChange= (group,values)=> {

     /*   let newState = recomputeGroup(conversionFunctions,groups,columns,rows)(group,values);

        console.log('result',newState);
        setForm({
            initialValues:newState,
            group
        });*/
        console.log(group,values);

    };

    return (
        <ImpedanceLayout  columns={columns} handleChange={handleChange} rows={rows} groups={groups} initialValues={form.initialValues} editedGroup={form.group} style={{backgroundColor:'#FF000088'}}>
            <ComponentWithArea area="h_5">5khz</ComponentWithArea>
            <ComponentWithArea area="h_50">50khz</ComponentWithArea>
            <ComponentWithArea area="h_100">100khz</ComponentWithArea>
            <ComponentWithArea area="h_nor">Normes</ComponentWithArea>
            <ComponentWithArea area="h_res">Resistance</ComponentWithArea>
            <ComponentWithArea area="h_angl">Angle de phase</ComponentWithArea>
            <ComponentWithArea area="h_reac">Reactance</ComponentWithArea>
            <ComponentWithArea area="h_imp">Impédance</ComponentWithArea>
            <ComponentWithArea area="f_res_nor">10-12</ComponentWithArea>
            <ComponentWithArea area="f_reac_nor">10-12</ComponentWithArea>
            <ComponentWithArea area="f_imp_nor">10-12</ComponentWithArea>
            <ComponentWithArea area="f_angl_nor">10-12</ComponentWithArea>
        </ImpedanceLayout>
    )
}


export const Test = () =>  {
    const [form,setForm] = useState({group:'a'});

    const columns = [
        '5',
        '50',
        '100'
    ]

    const rows = [
        'res',
        'rea',
        'z',
        'a'
    ]

    const groups = {
        'a':['res','rea'],
        'b':['z','a']
    }

    const conversionFunctions= {
        'z': 'root( ({{res}}^2) + ({{rea}}^2))',
        'a': 'atan( ({{rea}} / {{res}}) * (180/pi)  )',
        'res': '{{z}} * cos({{a}}/(180/pi))',
        'rea': '{{z}} * sin({{a}} /(180/pi))',
    }

    const handleChange= (group,values)=> {
        console.log(group,values);
/*
        let newState = recomputeGroup(conversionFunctions,groups,columns,rows)(group,values);

        console.log('result',newState);
        setForm({
            initialValues:newState,
            group
        });*/
    };


    const _validateRange = (key,value)=>{
        console.log(key,value)
        return value >= 0;

    }


    return (
        <ImpedanceLayout  columns={columns} rows={rows} groups={groups}  editedGroup="a" handleFormBlur={_=>console.log('blur')} handleGroupChange={_=>console.log('change')} validateRange={_validateRange}>
            <ComponentWithArea area="h_5">5khz</ComponentWithArea>
            <ComponentWithArea area="h_50">50khz</ComponentWithArea>
            <ComponentWithArea area="h_100">100khz</ComponentWithArea>
            <ComponentWithArea area="h_nor">Normes</ComponentWithArea>
            <ComponentWithArea area="h_res">Resistance</ComponentWithArea>
            <ComponentWithArea area="h_a">Angle de phase</ComponentWithArea>
            <ComponentWithArea area="h_rea">Reactance</ComponentWithArea>
            <ComponentWithArea area="h_z">Impédance</ComponentWithArea>
            <ComponentWithArea area="f_res_nor">10-12</ComponentWithArea>
            <ComponentWithArea area="f_rea_nor">10-12</ComponentWithArea>
            <ComponentWithArea area="f_z_nor">10-12</ComponentWithArea>
            <ComponentWithArea area="f_a_nor">10-12</ComponentWithArea>
        </ImpedanceLayout>
    )
}

