import { useTranslation } from '@';
import Dropdown from '@/Components/Dropdown';
import DropdownItem from '@/Components/Dropdown/DropdownItem';
import { ChevronDownSharp, CloseSharp } from '@/Components/Icons';
import { enlist, is_empty, is_nil } from '@karsegard/composite-js';
import { keyval } from '@karsegard/composite-js/ObjectUtils';
import { useFieldValues } from '@karsegard/react-hooks';
import React, { useEffect } from 'react';


export const FieldFilter = ({ label, handleSubmit, handleClear, currentValues }) => {

    const { t } = useTranslation();
    const { values, replaceValues, checkboxProps, getValue, inputProps, handleChangeValue } = useFieldValues(currentValues, { usePath: true });

    useEffect(() => {
        replaceValues(currentValues);
    }, [currentValues])


    const filled = (!is_nil(currentValues) && !is_empty(currentValues) && !is_empty(currentValues.values))
    const Icon = filled === true ? (CloseSharp) : ChevronDownSharp

    const _label = filled === true ? `${label}: ${enlist(currentValues.values).map(item => {
        let [_key, _] = keyval(item);
        return t(`filter_${_key}`);
    }).join(',')}` : label;


    const overrideClick = filled === true ? _ => handleClear() : undefined;
    return (
        <Dropdown offset={8} label={_label} icon={<Icon />} overrideClick={overrideClick}>
            <>
                <DropdownItem>
                    <div>Nom</div>
                    <div><input type="text"  {...inputProps('values.lastname')} /></div>
                </DropdownItem>
                <DropdownItem>
                    <div>Prenom</div>
                    <input type="text"  {...inputProps('values.firstname')} />
                </DropdownItem>
                <DropdownItem>
                    <div>Groupe Pathologique</div>
                    <input type="text"  {...inputProps('values.patho')} />
                </DropdownItem>
                <DropdownItem>
                    <div>Groupe Ethnique</div>
                    <input type="text"  {...inputProps('values.ethno')} />
                </DropdownItem>
                <DropdownItem>
                    <button onClick={_ => handleSubmit(values)}>filtrer</button>
                </DropdownItem>
            </>
        </Dropdown>
    )
}

FieldFilter.defaultProps = {
    handleClear: _ => console.warn('oups no handleclear defined')
}

export default FieldFilter;