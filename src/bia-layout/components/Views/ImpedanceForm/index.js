import React,{useState,useEffect,useCallback} from 'react'
import {withBaseClass,withModifiers,compose, bem,divElement} from 'bia-layout/utils'

import Grid from 'bia-layout/layouts/Grid';
import {ComponentWithArea,withGridArea} from 'bia-layout/hoc/grid/Area'
import Input from 'bia-layout/components/Form/Input'
import {filterPropPresentIn} from 'bia-layout/utils';
import {useFieldValues} from '@geekagency/use-fields-value'
import './style.scss';

const [__base_class,element,modifier] = bem ('impedance-form')



const ToggleEditField = (EditableComponent,UnEditableComponent)=> props => {
    const {editable,computedValue, ...rest} = props;
    return (
        <>
        {editable && <EditableComponent  {...rest}/>}
        {!editable && <UnEditableComponent computedValue={computedValue} {...rest}/>}
        </>
    )

}

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
    const{computedValue, ...rest} = props
    return (<div {...rest}>{computedValue}</div>)
});

const InputWithArea = ToggleEditField(withGridArea(Input),UneditableInputWithArea);

const findGroupForField = groups=>fieldName=> Object.keys(groups).reduce( (result,group)=> {
        if(result == null){
            result = groups[group].indexOf(fieldName) !==-1 ? group: null;
        }
        return result;

    },null);

const Component = props => {

    let {className, handleChange:handleValuesChange,initialValues,...__props} = props;
    const {columns,rows,groups, editedGroup:propEditedGroup,..._props} = __props;

    const [editedGroup, setEditedGroup] = useState(propEditedGroup);

    const findGroup = findGroupForField(groups);

    const fieldName = (row,col)=>{
        return `f_${row}_${col}`
    }

    const fieldsByGroup = rows.reduce ((c,row)=>{
        let groupId = findGroup(row);
        if(!c[groupId]){
            c[groupId] = [];
        }
        let items = columns.map (col=>{
            let name=`f_${row}_${col}`;
    //        console.log('value',values[name],inputProps(name))
        //     return (<InputWithArea  key={name} area={name} name={name} {...inputProps(name)}/> )
            return name;
        });

        c[groupId].push( ... items);
        return c;
    },{});

    //make an array of all the EDITABLE fields in the form
    const fields = fieldsByGroup[editedGroup];


    //Set default values if not set
    if(!initialValues){
        initialValues = fields.reduce((carry,item)=>{
            carry[item]=0;
            return carry;
        },{});
    }


    const {values,replaceValues,inputProps,assignValues} = useFieldValues(initialValues);



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
                                return  <InputWithArea  key={name} area={name} name={name} computedValue={initialValues[name]} {...inputProps(name)}/>
                            }
                            )}
                        </FieldGroup>
                    )
            })
        }
        </Grid>)
}

const ImpedanceForm = compose(
    withBaseClass(__base_class),
)(Component)


export default ImpedanceForm;
