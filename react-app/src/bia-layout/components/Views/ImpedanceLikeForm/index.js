import React,{useState,useEffect,useMemo} from 'react'
import {withBaseClass,withModifiers,compose, bem,divElement,cEx} from 'bia-layout/utils'

import ToggleEditField from 'bia-layout/hoc/ToggleEdit'

import Grid from 'bia-layout/layouts/Grid';
import {ComponentWithArea,withGridArea} from 'bia-layout/hoc/grid/Area'
import Input from 'bia-layout/components/Form/Input'
import {filterPropPresentIn} from 'bia-layout/utils';
import {useFieldValues} from '@karsegard/react-hooks'
import './style.scss';

const [__base_class,element,modifier] = bem ('impedance-form')


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

    let {className, handleChange:handleValuesChange,initialValues,fieldName,...__props} = props;
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
    

    useEffect(()=>{
        console.log('test',fieldsByGroup);
    },[fieldsByGroup]);
    //make an array of all the EDITABLE fields in the form
    const fields = fieldsByGroup[editedGroup];
    
    useEffect(()=>{
        //Set default values if not set
        if(!initialValues){
            console.log('initializing values')
            initialValues = fields.reduce((carry,item)=>{
                carry[item]=0;
                return carry;
            },{});
        }

    },[])
  


    const {values,handleChange:handleFieldChange,replaceValues,inputProps,assignValues} = useFieldValues(initialValues);
    console.log('6form',initialValues,values);


    useEffect(()=>{
        handleValuesChange(editedGroup,values);
    },[values]);


    useEffect(()=>{
        const fields = fieldsByGroup[editedGroup];


        //Set default values if not set
        const[form,computed] = filterPropPresentIn(fields,initialValues);

        initialValues = fields.reduce((carry,item)=>{
            carry[item]=initialValues[item];
            return carry;
        },{});

        replaceValues(initialValues);
    },[editedGroup])


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
                               console.log(name)
                                return  <InputWithArea className={element('field')}  key={name} area={name} name={name} value={initialValues[name]} onChange={handleFieldChange}/>
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
    }
}

const ImpedanceForm = compose(
    withBaseClass(__base_class),
)(Component)



export const ImpedanceHeader = compose(
    withBaseClass(element('header'))
)(divElement)

export const ImpedanceLineHeader = compose(
    withBaseClass(element('line-header'))
)(divElement)


export default ImpedanceForm;
