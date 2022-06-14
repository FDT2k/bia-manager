import Button from '@/Components/Form/Button';
import TagInput from '@/Components/Form/TagInput';
import { ArrowDown, ArrowUp, ChevronDownSharp, CaretDownSharp, CloseSharp } from '@/Components/Icons';
import List from '@/Components/Table';
import SearchLayout from '@/Components/SearchLayout';
import { applyModifiers, compose, withBaseClass, withForwardedRef } from '@karsegard/react-compose';
import { LayoutFlex, LayoutFlexColumn, Grid, withGridArea } from '@karsegard/react-core-layout';
import { useKeypress } from '@karsegard/react-hooks';
import Dropdown from '@/Components/Dropdown';
import DropdownItem from '@/Components/Dropdown/DropdownItem';
import React, { forwardRef, useEffect, useMemo, useState } from 'react';

import { useFieldValues } from '@karsegard/react-hooks';
import DatePicker from '@/Components/Form/DatePicker';
import { identity, is_nil, replace } from '@karsegard/composite-js';
import { dateSysToHuman } from '@/references/format';
import MainView from '@/Components/MainView'
import { filter_active_mesure } from '@/references/Mesure'

import { useTranslation } from '@'
import { is_empty, enlist } from '@karsegard/composite-js';
import { key, keyval, spec } from '@karsegard/composite-js/ObjectUtils';
import { RangeFilterFeature as RangeFilter } from '@';
import { SexFilterFeature as GenderFilter } from '@';
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



export const ListWithAreaWithRef = compose(forwardRef, withForwardRef, withGridArea)(List);



export const AdvancedSearch = compose(
    withGridArea,
    withBaseClass('advanced-filters'),
    applyModifiers({ alignCenter: false }),

)(LayoutFlex)
/*

export const RangeFilter = ({ label, handleSubmit, handleClear, currentValues }) => {


    const { t } = useTranslation();
    const { values, replaceValues, getValue, inputProps, handleChangeValue } = useFieldValues(currentValues, { usePath: true });

    useEffect(() => {
        replaceValues(currentValues);
    }, [currentValues])


    const filled = (!is_nil(currentValues) && (!is_nil(currentValues.from) || !is_nil(currentValues.to)))
    const Icon = filled === true ? (CloseSharp) : ChevronDownSharp

    const _label = filled === true ? `${label} ${t('depuis le')} ${(values.from ? dateSysToHuman(values.from) : '')}  ${(values.to ? `${t('jusqu\'au')} ${dateSysToHuman(values.to)}` : '')}` : label;


    const overrideClick = filled === true ? _ => handleClear() : undefined;

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
    handleClear: _ => console.warn('oups no handleclear defined')
}
*/

/*

export const GenderFilter = ({ label, handleSubmit, handleClear, currentValues }) => {

    const { t } = useTranslation();
    const { values, replaceValues, checkboxProps, getValue, inputProps, handleChangeValue } = useFieldValues(currentValues, { usePath: true });

    useEffect(() => {
        replaceValues(currentValues);
    }, [currentValues])


    const filled = (!is_nil(currentValues) && (!is_nil(currentValues.options.M) || !is_nil(currentValues.options.F)))

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
                    <div>Femme</div>
                    <input  {...checkboxProps('options.F')} type="checkbox" />
                </DropdownItem>
                <DropdownItem>
                    <div>Homme</div>
                    <input {...checkboxProps('options.M')} type="checkbox" />
                </DropdownItem>
                <DropdownItem>
                    <button onClick={_ => handleSubmit(values)}>filtrer</button>
                </DropdownItem>
            </>
        </Dropdown>
    )
}

GenderFilter.defaultProps = {
    handleClear: _ => console.warn('oups no handleclear defined')
}


*/

/*
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
*/

export const Component = props => {

    const arrowDownPressed = useKeypress('ArrowDown');
    const arrowUpPressed = useKeypress('ArrowUp');
    const enterPressed = useKeypress('Enter');

    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [searchBarFocused, setSearchBarFocused] = useState(false);

    const { t, dateSysToHuman } = useTranslation();

    const { handleSearch, handleCSVExport, handleCreate, handleSelectRow: _handleSelectRow,handlePageChange:_handlePageChange } = props.handlers;
    const { clearFilter, setFilter } = props.handlers
    const { results, tags, custom_filters ,pageIndex} = props;


    useEffect(() => {
        if (!searchBarFocused) {
            if (arrowDownPressed) {
                setSelectedIndex(idx => (idx == results.length - 1 ? 0 : idx + 1));
            }
            if (arrowUpPressed) {
                setSelectedIndex(idx => idx > 0 ? idx - 1 : results.length - 1);
            }
            if (enterPressed && selectedIndex >= 0) {
                _handleSelectRow && _handleSelectRow(selectedIndex, data[selectedIndex])
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
            accessor: values => { return (dateSysToHuman(values.birthdate)) }

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
            accessor: 'count_mesures'
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

    const handlePageChange = (pageIndex)=>{
        console.log('page changed',pageIndex);
        _handlePageChange && _handlePageChange(pageIndex);
    }

    return (
        <SearchLayout cover contained className="page-search">
            <SearchArea area="search">
                <TagInput tabIndex={1} placeholder={t(`Recherche`)} tags={tags} handleFocus={v => setSearchBarFocused(v)} handleChange={_handleSearch} fields={searchableFields} />
                <Button tabIndex={5} className="button--big" onClick={handleCreate}>{t('SEARCH_CREATE_NEW_SUBJECT')}</Button>
            </SearchArea>
            <AdvancedSearch style={{ gridGap: '8px' }} area="filter">
                {/*<FieldFilter
                    label="Champs"
                    currentValues={custom_filters.by_field}
                    handleSubmit={values => setFilter('by_field', 'field', values, 'byfield')}
                    handleClear={_ => clearFilter('by_field')}
                />*/}
                <GenderFilter
                    label="Sexe"
                    currentValues={custom_filters.sex}
                    handleSubmit={values => setFilter('sex', 'gender', values, 'bools')}
                    handleClear={_ => clearFilter('sex')} />
                <RangeFilter label="Mesures" currentValues={custom_filters.mesure_range} handleSubmit={values => setFilter('mesure_range', 'm.date', values)} handleClear={_ => clearFilter('mesure_range')} />
                <RangeFilter label="Dates de naissances" currentValues={custom_filters.birthday_range} handleSubmit={values => setFilter('birthday_range', 'birthdate', values)} handleClear={_ => clearFilter('birthday_range')} />

                {<Button onClick={handleCSVExport} tabIndex={-1}>{t('EXPORT_CSV')}</Button>}
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
                
                handlePageChange={handlePageChange}
                initialPageIndex={pageIndex}
            />
        </SearchLayout>
    )

}

Component.defaultProps = {
    results: [],
    custom_filters: {

    },
    pageIndex: 0,

    handlers: {
        handleSearch: _ => console.warn('search handler not implemented'),
        handleCreate: _ => console.warn('create handler not implemented'),
        setFilter: _ => console.warn('setFilter handler not implemented'),
        clearFilter: _ => console.warn('clearFilter handler not implemented'),
        handleSelectRow: _ => console.warn('handleSelectRow not impl'),
        handleCSVExport: _ => console.warn('handleCSVExport not impl'),
    },
}


export const Page = props => {
    const { db_name, stats, search_count, children, ...rest } = props;
    const { count, count_mesures } = stats;

    const { t } = useTranslation();
    const renderFooter = _ => {


        return (
            <>
                <LayoutFlex>
                    <div>Base de donnée: {db_name} </div>
                    <div> — </div>
                    <div> Patients: {count} </div>
                    <div> — </div>
                    <div> Mesures: {count_mesures}</div>
                </LayoutFlex>
                <div>Résultats de la recherche: {search_count} patients</div>
            </>
        )
    }

    return (
        <MainView renderFooter={renderFooter}>
            {children}
        </MainView>
    )

}

Page.defaultProps = {
    stats: { count: 0, count_mesures: 0 },
    patients: [],
    db_name: 'default',
    
}


export default Component;
