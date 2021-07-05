import React,{useState,useEffect,useCallback} from 'react'
import {withBaseClass,withModifiers,compose, bem,divElement} from 'bia-layout/utils'

import Grid from 'bia-layout/layouts/Grid';
import {ComponentWithArea,withGridArea} from 'bia-layout/hoc/grid/Area'
import Input from 'bia-layout/components/Form/Input'
import './style.scss';

const [__base_class,element,modifier] = bem ('impedance-form')

const useFieldValues = (initialState = {}, attribute = 'name') => {
  const [values, setValues] = useState(initialState);
  const [touched,setTouched] = useState(false);
  const handleChange =(event) => {
    setTouched(true);

    if (!event || !event.target){
      return ;
    }
    if (typeof (event.target[attribute]) === 'undefined') {
      throw new Error(`[useFieldValue] attribute "${attribute}"  not present on target node`)
    }
    const newState = {
      ...values,
      [event.target[attribute]]: event.target.value
    }
    setValues(newState);
    return newState;
  }

  const replaceValues =(values) => setValues(values)
  const assignValues =(vals) =>
  {
    let v = Object.assign({},values,vals);
    setValues(v)
  }

  return {
    values,
    touched,
    handleChange,
    replaceValues,
    assignValues,

    inputProps: prop => ({
      onChange: handleChange,
      value: values[prop],
      [attribute]:prop
    })
  };
}


const ToggleEditField = (EditableComponent,UnEditableComponent)=> props => {
    const {editable, ...rest} = props;
    return (
        <>
        {editable && <EditableComponent  {...rest}/>}
        {!editable && <UnEditableComponent  {...rest}/>}
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
    return (<div {...props}>{props.value}</div>)
});

const InputWithArea = ToggleEditField(withGridArea(Input),UneditableInputWithArea);


const Component = props => {

    let {className, handleChange:handleValuesChange,formValues,computedValues,...__props} = props;
    const {columns,rows,groups, editedGroup:propEditedGroup,..._props} = __props;

    const [editedGroup, setEditedGroup] = useState(propEditedGroup);

    const fieldName = (row,col)=>{
        return `f_${row}_${col}`
    }

    //make an array of all the EDITABLE fields in the form
    const fields = columns.reduce ((c,col)=>{
        let items = rows.reduce((c,row)=>{
            c.push(`f_${row}_${col}`);
            return c;
        },[]);
        return [...c,...items];

    },[]);


    //make the initial state if not given as prop
    if(!formValues){
        formValues = fields.reduce((carry,item)=>{
            carry[item]=0;
            return carry;
        },{});
    }


    const {values,replaceValues,inputProps,assignValues} = useFieldValues(formValues);



    useEffect(()=>{
        handleValuesChange(editedGroup,values);
    },[values]);
    console.log('rendering3',values);


    const findGroup = y=>
        Object.keys(groups).reduce( (result,group)=> {
            if(result == null){
                result = groups[group].indexOf(y) !==-1 ? group: null;
            }
            return result;

        },null);


    const fieldsByGroup = rows.reduce ((c,row)=>{
        let groupId = findGroup(row);
        if(!c[groupId]){
            c[groupId] = [];
        }
        let items = columns.map (col=>{
            let name=`f_${row}_${col}`;
    //        console.log('value',values[name],inputProps(name))
             return (<InputWithArea  key={name} area={name} name={name} {...inputProps(name)}/> )
        });

        c[groupId].push( ... items);
        return c;
    },{});


    return (<Grid className={className}>
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
        {
            Object.keys(groups).map(group=>{

                return (<FieldGroup key={group} group={group} handleGroupFocus={
                    setEditedGroup
                }  editable={group == editedGroup}>
                            {fieldsByGroup[group]}
                    </FieldGroup>)
            })
        }
        </Grid>)
}

const ImpedanceForm = compose(
    withBaseClass(__base_class),
)(Component)


export default ImpedanceForm;
