import React, { useState } from 'react';

import { bem, compose, withModifiers, applyModifiers, withVariables, divElement, withBaseClass, getClasseNames, cEx } from 'bia-layout/utils'


import './comparison-table.scss';


const FormulaHeaderSelect = props => {
    const {handleChange, disabled_col,options,idx, defaultValue, ...rest} = props;


    const _onChange = e=>{
        
        handleChange && handleChange(idx,e.target.value);

    }
    return (<select defaultValue={defaultValue}  onChange={_onChange} {...rest}>
        {
            options.filter(
                    item=> item.selectable===true)
                    .map(
                            option=>{
                                let is_disabled = disabled_col.indexOf(option.name) !== -1;
                                return (<option disabled={is_disabled} key={option.name} value={option.name}>{option.label}</option>)
                            })}
        
        </select>)

}


const FormulaResultHeader = props => {
    
    const {available_columns,columns,handleChange,selectable, ...rest} = props;
   


    let colByName = available_columns.reduce( function (carry,item){
        carry[item['name']]=item;
        return carry;
    },{})

    return (<>
        <div></div>
        {columns.map ( (col,idx) => {
            return (  

                <div key={idx} className="row header">{
                    selectable[idx] === true  ? <FormulaHeaderSelect idx={idx} handleChange={handleChange} defaultValue={col} options={available_columns} disabled_col={columns}/> : colByName[col].label
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
            let val = (new Number(values[col])).toFixed(2);
            let classes = className;
            if (limit) {
                classes = cEx([
                    className,
                    _ => limit(val) === -1 ? modifier('lesser') : '',
                    _ => limit(val) === 1 ? modifier('upper') : '',

                ])
            }
            return (<div key={`${col}`}  className={classes}>{!isNaN(val)? val : ''}</div>)
        })}
    </>);
}

FormulaResultRow.defaultProps = {
    limits: [],
}

export const Component = props => {

   
    const {data,t,available_columns,selectable,columns,...rest} = props;
    const [state,setState] = useState(columns);


    const handleChange = (idx,value)=>{

        setState(state=> {
            let newState = [...state];
            newState[idx] = value
            return newState;
        })

    }
    return (
        <>
            <FormulaResultHeader available_columns={available_columns} handleChange={handleChange} selectable={selectable} columns={state} />

            {data.filter(item=>item.display == true).map((item,idx) =>
                <FormulaResultRow key={idx} label={t(item.label)} values={item.values} columns={state} limits={item.limits} />

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
    selectable: [false, true, true],
    t:x=>x
}
export default Component;