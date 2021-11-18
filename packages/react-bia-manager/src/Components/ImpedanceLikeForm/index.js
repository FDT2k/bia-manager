import { cEx, compose, divElement, makeBEM, withBaseClass, withBEM } from '@karsegard/react-compose';
import Input from '@/Components/Form/Input';
import { withGridArea } from '@karsegard/react-core-layout';
import ToggleEditField from '@/Components/ToggleEdit';
import {Grid} from '@karsegard/react-core-layout'
import React, { useMemo, useState } from 'react';


import './style.scss'



const FieldGroup = props => {
    const { editable, children, group, handleGroupFocus, ...rest } = props;
    const handleClick = e => {
        if (!editable) {
            handleGroupFocus(group);
        }
    }
    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { editable, ...rest, onClick: handleClick });
        }
        return child;
    });
    return (
        <>
            {childrenWithProps}
        </>
    )
}


const UneditableInputWithArea = withGridArea(props => {
    const { value, onChange,tabIndex, ...rest } = props
    return (<div {...rest}>{value}</div>)
});

const InputWithArea = ToggleEditField(withGridArea(Input), UneditableInputWithArea);

const findGroupForField = groups => fieldName => Object.keys(groups).reduce((result, group) => {
    if (result == null) {
        result = groups[group].indexOf(fieldName) !== -1 ? group : null;
    }
    return result;

}, null);

const Component = props => {

    let { className, handleChangeGroup, tabIndexOffset,handleChange, handleGroupChange, handleFormBlur, values, fieldName, validRange, ...__props } = props;
    const { columns, rows, groups, handleValidation, editedGroup: initialEditedGroup, ..._props } = __props;

    const [editedGroup, setEditedGroup] = useState(initialEditedGroup);

    const findGroup = findGroupForField(groups);




    const fieldsByGroup = useMemo(() => rows.reduce((c, row) => {
        let groupId = findGroup(row);
        if (!c[groupId]) {
            c[groupId] = [];
        }
        let items = columns.map(col => {
            let name = fieldName(row, col);
            //        console.log('value',values[name],inputProps(name))
            //     return (<InputWithArea  key={name} area={name} name={name} {...inputProps(name)}/> )
            return name;
        });

        c[groupId].push(...items);
        return c;
    }, {}), [rows, columns, groups])



    //make an array of all the EDITABLE fields in the form
    const fields = fieldsByGroup[editedGroup];

    const _handleChange = e => {
        handleChange && handleChange(e)
    }

    const _handleFormBlur = e => {
        handleFormBlur && handleFormBlur(e)
    }

    const _handleGroupFocus = v => {
        setEditedGroup(v);
        handleGroupChange && handleGroupChange(v);
    }
    let tabIndex =0;

    return (<Grid className={className} >


        {props.children}
        {
            Object.keys(groups).map(group => {

                return (<FieldGroup
                    key={group}
                    group={group}
                    handleGroupFocus={
                        _handleGroupFocus
                    }

                    editable={group == editedGroup}
                >
                    {fieldsByGroup[group].map(name => {
                        const val = values[name];
                        const is_valid = handleValidation(name, val);
                        const bem = props.BEM.element('field');
                        const classes = cEx([
                            bem.current,
                            _ => is_valid ? bem.modifier('valid') : bem.modifier('invalid')
                        ]);
                        let component= <InputWithArea
                            className={classes}
                            key={name}
                            tabIndex={tabIndexOffset+tabIndex}
                            area={name}
                            name={name}
                            value={values[name] || ''}
                            onBlur={_handleFormBlur}
                            onChange={_handleChange}
                        />
                        tabIndex++;
                        return component;
                    }
                    )}
                </FieldGroup>
                )
            })
        }
    </Grid>)
}

Component.defaultProps = {
    fieldName: (row, col) => {
        return `${row}${col}`
    },
    editedGroup: "a",
    tabIndexOffset:0,
    values: {},
    handleValidation: (key, value) => true
}



const _bem = makeBEM('impedance-form')


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
