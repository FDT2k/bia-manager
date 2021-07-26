import React,{useState,useEffect,useMemo} from 'react'
import {withBaseClass,withModifiers,compose, bem,divElement,cEx,withBEM,makeBEM} from 'bia-layout/utils'

import ToggleEditField from 'bia-layout/hoc/ToggleEdit'

import Grid from 'bia-layout/layouts/Grid';
import {ComponentWithArea,withGridArea} from 'bia-layout/hoc/grid/Area'
import Input from 'bia-layout/components/Form/Input'
import {filterPropPresentIn} from 'bia-layout/utils';
import {useFieldValues} from '@karsegard/react-hooks'
import './style.scss';



const FieldGroup = props => {
    const {editable, children,group ,handleGroupFocus,  ...rest} = props;
    const handleClick = e=> {
        if(!editable){
            handleGroupFocus(group);
        }
    }
    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { editable,...rest, onClick:handleClick });
        }
        return child;
    });
    return (
        <>
            {childrenWithProps}
        </>
    )
}


const UneditableInputWithArea = withGridArea(props=>{
    const{value, ...rest} = props
    return (<div {...rest}>{value}</div>)
});

const InputWithArea = ToggleEditField(withGridArea(Input),UneditableInputWithArea);

const findGroupForField = groups=>fieldName=> Object.keys(groups).reduce( (result,group)=> {
        if(result == null){
            result = groups[group].indexOf(fieldName) !==-1 ? group: null;
        }
        return result;

    },null);

const Component = props => {

    let {className, handleChange,values,fieldName, validRange,...__props} = props;
    const {columns,rows,groups, editedGroup:propEditedGroup,..._props} = __props;

    const [editedGroup, setEditedGroup] = useState(propEditedGroup);

    const findGroup = findGroupForField(groups);

    
  

    const fieldsByGroup = useMemo(()=>rows.reduce ((c,row)=>{
        let groupId = findGroup(row);
        if(!c[groupId]){
            c[groupId] = [];
        }
        let items = columns.map (col=>{
            let name= fieldName(row,col);
    //        console.log('value',values[name],inputProps(name))
        //     return (<InputWithArea  key={name} area={name} name={name} {...inputProps(name)}/> )
            return name;
        });

        c[groupId].push( ... items);
        return c;
    },{}),[rows,columns,groups])
    

  
    //make an array of all the EDITABLE fields in the form
    const fields = fieldsByGroup[editedGroup];
   
  


    return (<Grid className={className} >


        {props.children}
        {
            Object.keys(groups).map(group=>{

                return (<FieldGroup
                            key={group}
                            group={group}
                            handleGroupFocus={
                                setEditedGroup
                            }

                            editable={group == editedGroup}
                        >
                            {fieldsByGroup[group].map(name=>{
                                const is_valid = values[name] >= validRange.min && values[name] <= validRange.max;
                                const bem = props.BEM.element('field');
                                const classes = cEx([
                                    bem.current,
                                    _ => is_valid ? bem.modifier('valid'): bem.modifier('invalid')
                                ]);
                                return  <InputWithArea 
                                    className={classes}  
                                    key={name} 
                                    area={name} 
                                    name={name} 
                                    value={values[name]}
                                    onChange={handleChange}
                                    />
                            }
                            )}
                        </FieldGroup>
                    )
            })
        }
        </Grid>)
}

Component.defaultProps = {
    fieldName:(row,col)=>{
        return `f_${row}_${col}`
    },
    validRange:{min:0,max:Infinity}
}



const _bem = makeBEM ('impedance-form')


const ImpedanceForm = compose(
    withBEM(_bem),
)(Component)



export const ImpedanceHeader = compose(
    withBaseClass(_bem.element('header'))
)(divElement)

export const ImpedanceLineHeader = compose(
    withBaseClass(_bem.element('line-header'))
)(divElement)


export default ImpedanceForm;
