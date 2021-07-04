import React,{useState,useEffect} from 'react'
import {withBaseClass,withModifiers,compose, bem,divElement} from 'bia-layout/utils'

import Grid from 'bia-layout/layouts/Grid';
import {ComponentWithArea,withGridArea} from 'bia-layout/hoc/grid/Area'
import Input from 'bia-layout/components/Form/Input'
import {useFieldValues} from '@geekagency/use-fields-value';
import './style.scss';

const [__base_class,element,modifier] = bem ('impedance-form')



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
    const {editable, children,group,handleGroupFocus,  ...rest} = props;
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


const UneditableInputWithArea = withGridArea(props=> <div {...props}>{props.value}</div>);

const InputWithArea = ToggleEditField(withGridArea(Input),UneditableInputWithArea);


const evaluateEquation = (values,formula) => {
    console.log(values,formula);
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
const Component = props => {

    const {className, initialValues,..._props} = props;

    const [editedGroup, setEditedGroup] = useState('a');

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
        'a':['res','reac'],
        'b':['imp','angl']
    }

    const conversionFunctions= {
        'imp': 'root( ({{res}}^2) + ({{reac}}^2)',
    }

    //make an array of all the fields in the form
    const fields = columns.reduce ((c,col)=>{
        let items = rows.reduce((c,row)=>{
            c.push(`f_${row}_${col}`);
            return c;
        },[]);
        return [...c,...items];

    },[]);


    //make the initial state if not given as prop
    const fieldsState =  initialValues || fields.reduce((carry,item)=>{
        carry[item]=0;
        return carry;
    },{});


    const {values,inputProps} = useFieldValues(fieldsState);

    const recomputeGroup = (group,values)=>{
        console.log('recomputing values')
        columns.map(col=> {
            const {[group]:val,...toRecompute} = groups;
            Object.keys(toRecompute).map (recomputed_group=> {
                toRecompute[recomputed_group].map(field=>{
                    let formula = conversionFunctions[field];
                    if(formula){
                        console.log(formula);
                        let result = evaluateEquation(val,formula);
                        console.log(result);
                    }
                });
            })
            console.log(group,val,toRecompute);
        });
    }

    useEffect(()=>{
        console.log(values);

        recomputeGroup(editedGroup,values);

    },[values]);

    const findGroup = y=>
        Object.keys(groups).reduce( (result,group)=> {
            if(result == null){
            //    console.log(y)
            //    console.log(groups[group].indexOf(y))
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
             return (<InputWithArea editable={true} key={name} area={name} name={name} {...inputProps(name)}/> )
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
                } editable={group == editedGroup}>
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
