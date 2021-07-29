import React from 'react';

import { bem, compose, withModifiers, applyModifiers, withVariables, divElement, withBaseClass, getClasseNames, cEx } from 'bia-layout/utils'



const FormulaHeaderSelect = props => {
    const {options, defaultValue, ...rest} = props;

    return (<select defaultValue={defaultValue} {...rest}>
        {options.filter(item=> item.selectable===true).map(option=> <option value={option.name}>{option.label}</option>)}
        
        </select>)

}


const FormulaResultHeader = props => {

    const {available_columns,columns,selectable, ...rest} = props;

    let colByName = available_columns.reduce( function (carry,item){
        carry[item['name']]=item;
        return carry;
    },{})
    return (<><div></div>
    {columns.map ( (col,idx) => {
        return (  

            <div className="row header">{
                selectable[idx] === true  ? <FormulaHeaderSelect defaultValue={col} options={available_columns}/> : colByName[col].label
            }</div>

        )

    })}
    </>);
}

const FormulaResultRow = (props) => {
    const {columns, values, limits, label } = props;
    const [__base_class, element, modifier] = bem('result-row');
    const { className, ...rest } = getClasseNames(__base_class, props)
    return (<><div className="row header">{label}</div>
        {columns.map((col) => {
            let limit = limits[col];
            let val = values[col];
            let classes = className;
            if (limit) {
                classes = cEx([
                    className,
                    _ => limit(val) === -1 ? modifier('lesser') : '',
                    _ => limit(val) === 1 ? modifier('upper') : '',

                ])
            }
            return (<div className={classes}>{val}</div>)
        })}
    </>);
}

FormulaResultRow.defaultProps = {
    limits: [],
}

export const Component = props => {

    const {data,available_columns,selectable,columns,...rest} = props;
    return (
        <>
            <FormulaResultHeader available_columns={available_columns} selectable={selectable} columns={columns} />

            {data.map(item =>
                <FormulaResultRow label={item.label} values={item.values} columns={columns} limits={item.limits} />

            )}



        </>

    )
}

Component.defaultProps = {
    data:[],
    available_columns:[
        { name: 'kushner', label: 'Kushner', selectable: true },
        { name: 'segal', label: 'Segal', selectable: true },
        { name: 'norme', label: 'Norme', selectable: false },
        { name: 'gva', label: 'Gva', selectable: true },
    ],
    columns:['norme', 'kushner', 'gva'],
    selectable: [false, true, true]
}
export default Component;