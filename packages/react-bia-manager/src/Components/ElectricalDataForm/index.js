
import { withBaseClass } from '@karsegard/react-compose';
import ImpedanceLayout, { ImpedanceHeader, ImpedanceLineHeader } from '@/Components/ImpedanceLikeForm';
import { ComponentWithArea, withGridArea } from '@karsegard/react-core-layout';
import mexp from 'math-expression-evaluator';
import React, { useMemo } from 'react';

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
                            result = -1;
                        }
                        newState[fieldKey] = (new Number(result)).toFixed(precision);
                    } catch (e) {
                        newState[fieldKey] = -1;

                    }
                } else {
                    newState[fieldKey] = -1;
                }
            });
        })
    });

    return [values, newState];
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
    'z': { formula: 'root( ({res}^2) + ({rea}^2))', precision: 0 },
    'a': { formula: 'atan( {rea} / {res}) ', precision: 1 },
    'res': { formula: '{z} * cos({a})', precision: 0 },
    'rea': { formula: '{z} * sin({a})', precision: 0 },
}


const allFields = rows.reduce((carry, row) => {
    let fields = columns.reduce((carry, col) => {
        carry.push(fieldName(row, col));
        return carry;
    }, []);
    return [...carry, ...fields];
}, [])


const LineHeader = withGridArea(ImpedanceLineHeader);
const Header = withGridArea(ImpedanceHeader);

const findGroupForField = groups => fieldName => Object.keys(groups).reduce((result, group) => {
    if (result == null) {
        result = groups[group].indexOf(fieldName) !== -1 ? group : null;
    }
    return result;

}, null);

const ElectricalDataForm = props => {

    const {handleComputedChange,handleGroupChange, handleChange,handleFormBlur, values, editedGroup,...rest } = props;
   

    

   
    const [unchanged, recomputed] = useMemo(() => {
        return recomputeGroup(conversionFunctions, groups, columns, rows)(editedGroup, values)
    }, [values,editedGroup]);

    const _handleFormBlur = e => {

        handleComputedChange && handleComputedChange(recomputed);
        handleFormBlur && handleFormBlur(e)
    }
  

    const handleValidation = (key,value)=>{
        if(key == 'a5' || key =='a50' || key =='a100'){
            return value >= 6.3 && value <=8.2
        }
        if(value > 0 ){
            return true
        }
        return false;
    }

    return (
        <>
            <ImpedanceLayout {...rest}
                fieldName={fieldName}
                columns={columns}
                handleChange={handleChange}
                rows={rows}
                groups={groups}
                handleFormBlur={_handleFormBlur}
                values={{...unchanged,...recomputed}}
                editedGroup={editedGroup}
                handleValidation={handleValidation}
                handleGroupChange={handleGroupChange} >
                <Header area="h_5">5khz</Header>
                <Header area="h_50">50khz</Header>
                <Header area="h_100">100khz</Header>
                <Header area="h_nor">Normes</Header>
                <LineHeader area="h_res">Resistance (Ω)</LineHeader>
                <LineHeader area="h_a">Angle de phase (°)</LineHeader>
                <LineHeader area="h_rea">Reactance (Ω)</LineHeader>
                <LineHeader area="h_z">Impédance (Ω)</LineHeader>
                <ComponentWithArea area="f_res_nor"></ComponentWithArea>
                <ComponentWithArea area="f_rea_nor"></ComponentWithArea>
                <ComponentWithArea area="f_z_nor"></ComponentWithArea>
                <ComponentWithArea area="f_a_nor">6.3-8.2</ComponentWithArea>
            </ImpedanceLayout>
        </>
    )
}

ElectricalDataForm.defaultProps = {
    values: allFields.reduce((carry, item) => {
        carry[item] = 0;
        return carry;
    }, {}),
    group: 'a'
}

export default withBaseClass('electrical-data-form')(ElectricalDataForm);
