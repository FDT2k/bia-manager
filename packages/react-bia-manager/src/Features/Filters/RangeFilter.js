import { useTranslation } from '@';
import Dropdown from '@/Components/Dropdown';
import DropdownItem from '@/Components/Dropdown/DropdownItem';
import DatePicker from '@/Components/Form/DatePicker';
import { ChevronDownSharp, CloseSharp } from '@/Components/Icons';
import { dateSysToHuman } from '@/references/format';
import { is_nil } from '@karsegard/composite-js';
import { useFieldValues } from '@karsegard/react-hooks';
import React, { useEffect } from 'react';


export const RangeFilter = ({ label, handleSubmit, handleClear, currentValues,buttonLabel }) => {


    const { t } = useTranslation();
    const { values, replaceValues, getValue, inputProps, handleChangeValue } = useFieldValues(currentValues, { usePath: true });

    useEffect(() => {
        replaceValues(currentValues);
    }, [currentValues])


    const filled = (!is_nil(currentValues) && (!is_nil(currentValues.from) || !is_nil(currentValues.to)))
    const Icon = filled === true ? (CloseSharp) : ChevronDownSharp

    const _label = filled === true ? `${label} ${t('since')} ${(values.from ? dateSysToHuman(values.from) : '')}  ${(values.to ? `${t('until')} ${dateSysToHuman(values.to)}` : '')}` : label;


    const overrideClick = filled === true ? _ => handleClear() : undefined;

    return (
        <Dropdown offset={8} label={_label} icon={<Icon />} overrideClick={overrideClick}>
            <>
                <DropdownItem>
                    <div>{t('From//Date filter start date') }</div>
                    <DatePicker allow_null={true} masked_input={true} selected={getValue('from')} handleChange={handleChangeValue('from')} />
                </DropdownItem>
                <DropdownItem>
                    <div>{t('Until//Date filter end date')}</div>
                    <DatePicker allow_null={true} masked_input={true} selected={getValue('to')} handleChange={handleChangeValue('to')} />
                </DropdownItem>
                <DropdownItem>
                <button onClick={_ => {handleSubmit(values);document.dispatchEvent(new Event('dropdown-close'))}}>{t(buttonLabel)}</button>
                </DropdownItem>
            </>
        </Dropdown>
    )
}

RangeFilter.defaultProps={
    buttonLabel:'filter'
}


export default RangeFilter;