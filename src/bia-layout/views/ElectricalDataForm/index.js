
import React, { useEffect, useMemo, useState, useRef } from 'react';
import { withBaseClass, withModifiers, withVariables, compose, bem, divElement } from 'bia-layout/utils'
import ImpedanceLayout from 'bia-layout/components/Views/ImpedanceLikeForm'
import { ComponentWithArea, withGridArea } from 'bia-layout/hoc/grid/Area'
import mexp from 'math-expression-evaluator';




const fieldName = (row, col) => {
    return `f_${row}_${col}`
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
    console.log(evaluator);
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
    'reac',
    'imp',
    'angl'
]

const groups = {
    'a': ['res', 'reac'],
    'b': ['imp', 'angl']
}

const conversionFunctions = {
    'imp': {formula: 'root( ({res}^2) + ({reac}^2))', precision:0},
    'angl': {formula:'atan( {reac} / {res}) ', precision:1},
    'res': {formula:'{imp} * cos({angl})', precision:0},
    'reac': {formula:'{imp} * sin({angl})', precision:0},
}


const allFields = rows.reduce((carry,row)=> {
    let fields = columns.reduce((carry,col)=>{
            carry.push(fieldName(row,col));
            return carry;
        },[]);
    return [...carry,...fields];
},[])

const ElectricalDataForm =  props => {
    const {handleChange: parentHandleChange,initialValues, ...rest} = props;
    const [form, setForm] = useState({ group: 'a', initialValues});
   

 
    const handleChange = (group, values) => {

        let newState = recomputeGroup(conversionFunctions, groups, columns, rows)(group, values);

        console.log('result', newState);
        setForm({
            initialValues: newState,
            group
        });
        parentHandleChange&& parentHandleChange(newState);
    };

    return (
        <ImpedanceLayout columns={columns} handleChange={handleChange} rows={rows} groups={groups} initialValues={form.initialValues} editedGroup={form.group} style={{ backgroundColor: '#FF000088' }}>
            <ComponentWithArea area="h_5">5khz</ComponentWithArea>
            <ComponentWithArea area="h_50">50khz</ComponentWithArea>
            <ComponentWithArea area="h_100">100khz</ComponentWithArea>
            <ComponentWithArea area="h_nor">Normes</ComponentWithArea>
            <ComponentWithArea area="h_res">Resistance</ComponentWithArea>
            <ComponentWithArea area="h_angl">Angle de phase</ComponentWithArea>
            <ComponentWithArea area="h_reac">Reactance</ComponentWithArea>
            <ComponentWithArea area="h_imp">Impédance</ComponentWithArea>
            <ComponentWithArea area="f_res_nor"></ComponentWithArea>
            <ComponentWithArea area="f_reac_nor"></ComponentWithArea>
            <ComponentWithArea area="f_imp_nor"></ComponentWithArea>
            <ComponentWithArea area="f_angl_nor">6.3-8.2</ComponentWithArea>
        </ImpedanceLayout>
    )
}

ElectricalDataForm.defaultProps = {
    initialValues:allFields.reduce((carry,item)=>{
        carry[item]=0;
        return carry;
    },{})
}

export default ElectricalDataForm;
