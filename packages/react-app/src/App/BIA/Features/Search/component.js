import Button from '@/bia-layout/components/Form/Button';
import TagInput from '@/bia-layout/components/Form/TagInput';
import { ArrowDown, ArrowUp, ChevronDownSharp, CaretDownSharp,CloseSharp } from '@/bia-layout/components/Icons';
import List from '@/bia-layout/components/Table';
import { withGridArea } from '@/bia-layout/hoc/grid/Area';
import SearchLayout from '@/bia-layout/layouts/Search';
import { applyModifiers, compose, withBaseClass, withForwardedRef } from '@karsegard/react-compose';
import { LayoutFlex, LayoutFlexColumn, Grid } from '@karsegard/react-core-layout';
import { useKeypress } from '@karsegard/react-hooks';
import Dropdown from '@/App/Components/Dropdown';
import DropdownItem from '@/App/Components/Dropdown/DropdownItem';
import React, { forwardRef, useEffect, useMemo, useState } from 'react';

import { useFieldValues } from '@karsegard/react-hooks';
import DatePicker from '@/bia-layout/components/Form/DatePicker';
import { identity,is_nil, replace } from '@karsegard/composite-js';
import { dateSysToHuman } from '@/references/format';
import {filter_active_mesure} from '@/references/Mesure'

const withForwardRef = Component => (props, ref) => {

    return <Component {...props} forwardedRef={ref} />
}



const traceProps = Component => (props, ref) => {

    console.log(props, ref);
    return <Component {...props} ref={ref} />;
}

export const SearchArea = compose(
    withGridArea,
    withBaseClass('search')
)
    (LayoutFlex)

/*
export const ListWithArea = React.forwardRef((props,ref)=> {
const Component = compose(withGridArea)(List);
return <Component {...props} forwardedRef={ref}/>
})*/

export const ListWithAreaWithRef = compose(forwardRef, withForwardRef, withGridArea)(List);
//export const ListWithAreaWithRef = React.forwardRef(ListWithArea);


export const AdvancedSearch = compose(
    withGridArea,
    withBaseClass('advanced-filters'),
    applyModifiers({ alignCenter: false }),

)(LayoutFlex)


export const RangeFilter = ({label,handleSubmit,handleClear,currentValues,t}) => {

    

    const { values,replaceValues, getValue, inputProps, handleChangeValue } = useFieldValues(currentValues, { usePath: true });

    useEffect(()=>{
        replaceValues(currentValues);
    },[currentValues])

    console.log(currentValues)

    const filled = (!is_nil(currentValues) && (!is_nil(currentValues.from) || !is_nil(currentValues.to)))
    const Icon = filled===true ? (CloseSharp) : ChevronDownSharp

    const _label = filled===true ? `${label} ${t('depuis le')} ${(values.from ? dateSysToHuman(values.from): '')}  ${(values.to ? `${t('jusqu\'au')} ${dateSysToHuman(values.to)}`: '' )}` : label;


    const overrideClick = filled===true ? _=> handleClear() : undefined; 

    return (
        <Dropdown offset={8} label={_label} icon={<Icon />} overrideClick={overrideClick}>
            <>
                <DropdownItem>
                    <div>Du </div>
                    <DatePicker allow_null={true} masked_input={true} selected={getValue('from')} handleChange={handleChangeValue('from')} />
                </DropdownItem>
                <DropdownItem>
                    <div>Au</div>
                    <DatePicker allow_null={true} masked_input={true} selected={getValue('to')} handleChange={handleChangeValue('to')} />
                </DropdownItem>
                <DropdownItem>
                    <button onClick={_ => handleSubmit(values)}>filtrer</button>
                </DropdownItem>
            </>
        </Dropdown>
    )
}

RangeFilter.defaultProps = {
    t:identity,
    handleClear: _=> console.warn('oups no handleclear defined')
}




export const Component = props => {

    const arrowDownPressed = useKeypress('ArrowDown');
    const arrowUpPressed = useKeypress('ArrowUp');
    const enterPressed = useKeypress('Enter');

    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [searchBarFocused, setSearchBarFocused] = useState(false);

    const { results, handleSearch, handleCreate, tags, t, handleSelectRow: _handleSelectRow, setFilter, custom_filters,clearFilter } = props;


    useEffect(() => {
        if (!searchBarFocused) {
            if (arrowDownPressed) {
                setSelectedIndex(idx => (idx == results.length - 1 ? 0 : idx + 1));
            }
            if (arrowUpPressed) {
                setSelectedIndex(idx => idx > 0 ? idx - 1 : results.length - 1);
            }
            if (enterPressed && selectedIndex >= 0) {
                _handleSelectRow(selectedIndex, data[selectedIndex])
            }

        }
    }, [arrowDownPressed, arrowUpPressed, searchBarFocused, enterPressed]);



    const data = useMemo(
        () => {
            return results;
        },
        [results]
    )

    const _handleSearch = tags => {
        handleSearch && handleSearch(tags);
    }

    const columns = [
        {
            Header: t('SEARCH_table_column_lastname'),
            accessor: 'lastname',
            filter: 'text'
        },
        {
            Header: t('SEARCH_table_column_firstname'),
            accessor: 'firstname',
            filter: 'fuzzyText'
        },
        {
            Header: t('SEARCH_table_column_birthdate'),
            accessor: 'birthdate',

        },
        {
            Header: t('SEARCH_table_column_pathological_group'),
            accessor: 'groups.patho',

        },
        {
            Header: t('SEARCH_table_column_sex'),
            accessor: 'gender',
        },
        {
            Header: t('SEARCH_table_column_sample_count'),
            accessor: v => v.mesures.filter(filter_active_mesure).length,
        },
    ]

    const searchableFields = [
        { key: 'lastname', label: t('Nom') },
        { key: 'firstname', label: t('Prénom') },
        { key: 'birthdate', label: t('Date de Naissance') },
        { key: 'groups.patho', label: t('Groupe Pathologique') },
        { key: 'gender', label: t('Sexe') },
    ]

    const handleSelectRow = (index, row) => {
        _handleSelectRow && _handleSelectRow(index, row.original)
    }


    return (
        <SearchLayout cover contained className="page-search">
            <SearchArea area="search">
                <TagInput tabIndex={1} placeholder={t(`Recherche`)} tags={tags} handleFocus={v => setSearchBarFocused(v)} handleChange={_handleSearch} fields={searchableFields} />
                <Button tabIndex={5} className="button--big" onClick={handleCreate}>{t('SEARCH_CREATE_NEW_SUBJECT')}</Button>

            </SearchArea>
            <AdvancedSearch style={{ gridGap: '8px' }} area="filter">
                <RangeFilter label="Mesures" currentValues={custom_filters.mesure_range} handleSubmit={values=>setFilter('mesure_range','mesures_dates',values)} handleClear={_ => clearFilter('mesure_range')}/>
                <RangeFilter label="Dates de naissances" currentValues={custom_filters.birthday_range} handleSubmit={values=>setFilter('birthday_range','birthdate',values)} handleClear={_ => clearFilter('birthday_range')}/>
                <Button tabIndex={5}>{t('EXPORT_CSV')}</Button>
               
            </AdvancedSearch>
            <ListWithAreaWithRef

                tabIndex={2}
                SortUp={ArrowUp}
                SortDown={ArrowDown}
                handleSelect={handleSelectRow}
                selectedIndex={selectedIndex}
                area="list"
                data={data}
                columns={columns}
            />
        </SearchLayout>
    )

}

Component.defaultProps = {
    results: [],
    handleSearch: _ => console.warn('search handler not implemented'),
    handleCreate: _ => console.warn('create handler not implemented'),
}
Component.defaultProps = {
    t: x => x
}

export default Component;
