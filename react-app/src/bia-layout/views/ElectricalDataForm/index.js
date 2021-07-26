
import React, { useEffect, useMemo, useState, useRef } from 'react';
import { withBaseClass, withModifiers, withVariables, compose, bem, divElement } from 'bia-layout/utils'
import ImpedanceLayout,{ImpedanceHeader,ImpedanceLineHeader} from 'bia-layout/components/Views/ImpedanceLikeForm'
import { ComponentWithArea, withGridArea } from 'bia-layout/hoc/grid/Area'
import mexp from 'math-expression-evaluator';




const fieldName = (row, col) => {
    return `${row}${col}`
}

const evaluateEquation = (values, formula) => {
    const regex = /\{(\s*([\w\.-]+)\s*)\}/g;
    let m = null;
    let evaluator = formula;
    while ((m = regex.exec(formula))) {
        let key = m[1];

        let value = parseFloat(values[m[1]]);
        evaluator = evaluator.replace(m[0], value);
    }
    return evaluator;
}

const recomputeGroup = (conversionFunctions, groups, columns, rows) => (group, values) => {

    let newState = {}
    columns.map(col => {
        const { [group]: val, ...toRecompute } = groups;
        let vals = val.reduce((carry, row) => {
            let f = fieldName(row, col);
            carry[row] = values[f]
            return carry;
        }, {});
        Object.keys(toRecompute).map(recomputed_group => {
            toRecompute[recomputed_group].map(field => {
                let formula = conversionFunctions[field].formula;
                let precision = conversionFunctions[field].precision;
                let fieldKey = fieldName(field, col);

                if (formula) {
                    try {
                        let result = evaluateEquation(vals, formula);
                        result = mexp.eval(result);
                        if (isNaN(result)) {
                            result =  -1;
                        }
                        newState[fieldKey] = (new Number(result)).toFixed(precision);
                    } catch (e) {
                        console.error(e)
                        newState[fieldKey] = -1;

                    }
                } else {
                    newState[fieldKey] = -1;
                }
            });
        })
    });

    return { ...values, ...newState };
};

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
    'a': ['res', 'rea'],
    'b': ['z', 'a']
}

const conversionFunctions = {
    'z': {formula: 'root( ({res}^2) + ({rea}^2))', precision:0},
    'a': {formula:'atan( {rea} / {res}) ', precision:1},
    'res': {formula:'{z} * cos({a})', precision:0},
    'rea': {formula:'{z} * sin({a})', precision:0},
}


const allFields = rows.reduce((carry,row)=> {
    let fields = columns.reduce((carry,col)=>{
            carry.push(fieldName(row,col));
            return carry;
        },[]);
    return [...carry,...fields];
},[])


const LineHeader = withGridArea(ImpedanceLineHeader);
const Header = withGridArea(ImpedanceHeader);

const ElectricalDataForm =  props => {
    const {handleChange,values,group, ...rest} = props;

   /*

 
    const handleChange = (group, values) => {
        console.log('prerecomputation state',values);
        let newState = recomputeGroup(conversionFunctions, groups, columns, rows)(group, values);

        console.log('result', newState);
      
        parentHandleChange&& parentHandleChange(newState);
    };

   */

    const recomputed_values = useMemo (()=> {
        return recomputeGroup(conversionFunctions, groups, columns, rows)(group, values);

    },[values])


    return (
        <ImpedanceLayout {...rest} fieldName={fieldName} columns={columns} handleChange={handleChange} rows={rows} groups={groups} values={recomputed_values} editedGroup={group} >
            <Header area="h_5">5khz</Header>
            <Header area="h_50">50khz</Header>
            <Header area="h_100">100khz</Header>
            <Header area="h_nor">Normes</Header>
            <LineHeader area="h_res">Resistance</LineHeader>
            <LineHeader area="h_a">Angle de phase</LineHeader>
            <LineHeader area="h_rea">Reactance</LineHeader>
            <LineHeader area="h_z">Impédance</LineHeader>
            <ComponentWithArea area="f_res_nor"></ComponentWithArea>
            <ComponentWithArea area="f_rea_nor"></ComponentWithArea>
            <ComponentWithArea area="f_z_nor"></ComponentWithArea>
            <ComponentWithArea area="f_a_nor">6.3-8.2</ComponentWithArea>
        </ImpedanceLayout>
    )
}

ElectricalDataForm.defaultProps = {
    values:allFields.reduce((carry,item)=>{
        carry[item]=0;
        return carry;
    },{}),
    group:'a'
}

export default withBaseClass('electrical-data-form')(ElectricalDataForm);
