import { useTranslation } from '@';
import Dropdown from '@/Components/Dropdown';
import DropdownItem from '@/Components/Dropdown/DropdownItem';
import { ChevronDownSharp, CloseSharp } from '@/Components/Icons';
import { enlist, is_nil } from '@karsegard/composite-js';
import { keyval } from '@karsegard/composite-js/ObjectUtils';
import { useFieldValues } from '@karsegard/react-hooks';
import React, { useEffect } from 'react';


export const GenderFilter = ({ label, handleSubmit, handleClear, currentValues,buttonLabel }) => {

    const { t } = useTranslation();
    const { values, replaceValues, checkboxProps, getValue, inputProps, handleChangeValue } = useFieldValues(currentValues, { usePath: true });

    useEffect(() => {
        replaceValues(currentValues);
    }, [currentValues])


    const filled = (!is_nil(currentValues) && (!is_nil(currentValues.options?.M) || !is_nil(currentValues.options?.F)))

    const Icon = filled === true ? (CloseSharp) : ChevronDownSharp

    const _label = filled === true ? `${label}: ${enlist(currentValues.options).map(item => {
        let [_key, _] = keyval(item);
        return t(`filter_${_key}`);
    }).join(',')}` : label;


    const overrideClick = filled === true ? _ => handleClear() : undefined;
    return (
        <Dropdown offset={8} label={_label} icon={<Icon />} overrideClick={overrideClick}>
            <>
                <DropdownItem>
                    <div>{t('Women')}</div>
                    <input  {...checkboxProps('options.F')} type="checkbox" />
                </DropdownItem>
                <DropdownItem>
                    <div>{t('Men')}</div>
                    <input {...checkboxProps('options.M')} type="checkbox" />
                </DropdownItem>
                <DropdownItem>
                <button onClick={_ => {handleSubmit(values);document.dispatchEvent(new Event('dropdown-close'))}}>{t(buttonLabel)}</button>
                </DropdownItem>
            </>
        </Dropdown>
    )
}

GenderFilter.defaultProps = {
    handleClear: _ => console.warn('oups no handleclear defined'),
    buttonLabel:'filter'
}
export default GenderFilter