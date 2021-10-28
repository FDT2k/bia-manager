import Button from '@/bia-layout/components/Form/Button';
import TagInput from '@/bia-layout/components/Form/TagInput';
import { ArrowDown, ArrowUp, ChevronDownSharp, CaretDownSharp } from '@/bia-layout/components/Icons';
import List from '@/bia-layout/components/Table';
import { withGridArea } from '@/bia-layout/hoc/grid/Area';
import SearchLayout from '@/bia-layout/layouts/Search';
import { applyModifiers, compose, withBaseClass, withForwardedRef } from '@karsegard/react-compose';
import { LayoutFlex, LayoutFlexColumn,Grid } from '@karsegard/react-core-layout';
import { useKeypress } from '@karsegard/react-hooks';
import Dropdown from '@/App/Components/Dropdown';
import React, { forwardRef, useEffect, useMemo, useState } from 'react';

import DatePicker from '@/bia-layout/components/Form/DatePicker';


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




export const Component = props => {

    const arrowDownPressed = useKeypress('ArrowDown');
    const arrowUpPressed = useKeypress('ArrowUp');
    const enterPressed = useKeypress('Enter');

    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [searchBarFocused, setSearchBarFocused] = useState(false);

    const { results, handleSearch, handleCreate, tags, t, handleSelectRow: _handleSelectRow } = props;

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
            accessor: v => v.mesures.length,
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
            <AdvancedSearch style={{gridGap:'8px'}} area="filter">
                <Dropdown offset={8} label="Mesures" icon={<ChevronDownSharp />}>
                    <>
                        <LayoutFlex justBetween alignCenter className="dropdown__item">
                            <div>De </div>
                            <DatePicker allow_null={true} masked_input={true} />
                        </LayoutFlex>
                        <LayoutFlex justBetween alignCenter className="dropdown__item">
                            <div>À</div>
                            <DatePicker allow_null={true} masked_input={true} />
                        </LayoutFlex>
                        <LayoutFlex justBetween alignCenter className="dropdown__item">
                            <div>À</div>
                            <DatePicker allow_null={true} masked_input={true} />
                        </LayoutFlex>
                    </>
                </Dropdown>
                <Dropdown offset={8} label="Sexe" icon={<ChevronDownSharp />}>
                    <div>
                        <LayoutFlex justBetween alignCenter className="dropdown__item"><div>Homme </div> <input type="checkbox" /></LayoutFlex>
                        <LayoutFlex justBetween alignCenter className="dropdown__item"><div>Femme</div> <input type="checkbox" /></LayoutFlex>
                    </div>
                </Dropdown>
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
