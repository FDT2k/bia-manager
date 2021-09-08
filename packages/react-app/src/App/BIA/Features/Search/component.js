import { applyModifiers, compose, withBaseClass } from '@karsegard/react-compose';
import { useKeypress } from '@karsegard/react-hooks';
import Button from '@/bia-layout/components/Form/Button';
import TagInput from '@/bia-layout/components/Form/TagInput';
import { ArrowDown, ArrowUp } from '@/bia-layout/components/Icons';
import List from '@/bia-layout/components/Table';
import MainView from '@/bia-layout/components/Views/MainView';
import { withGridArea } from '@/bia-layout/hoc/grid/Area';
import { LayoutFlex } from '@karsegard/react-core-layout'

import SearchLayout from '@/bia-layout/layouts/Search';
import React, { useEffect, useMemo, useState, useRef } from 'react';



const withForwardRef = Component =>(props,ref)=> {
   
    return <Component {...props} forwardedRef={ref}/>
}



const traceProps = Component => (props,ref) => {

    console.log(props,ref);
    return <Component {...props} ref={ref}/>;
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

export const ListWithArea =compose(withForwardRef,withGridArea)(List);
export const ListWithAreaWithRef = React.forwardRef(ListWithArea);
export const AdvancedSearch = compose(
    withGridArea,
    withBaseClass('advanced-filters'),
    applyModifiers({ alignCenter: true }),

)(LayoutFlex)


export const Component = props => {

    const arrowDownPressed = useKeypress('ArrowDown');
    const arrowUpPressed = useKeypress('ArrowUp');
    const enterPressed = useKeypress('Enter');

    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [searchBarFocused, setSearchBarFocused] = useState(false);




    const { results, handleSearch, handleCreate, tags, t, renderFooter, handleSelectRow: _handleSelectRow } = props;
    useEffect(() => {
        if (!searchBarFocused) {
            if (arrowDownPressed) {
                setSelectedIndex(idx => (idx == results.length - 1 ? 0 : idx + 1));
            }
            if (arrowUpPressed) {
                setSelectedIndex(idx => idx > 0 ? idx - 1 : results.length - 1);
            }
            if(enterPressed && selectedIndex >=0){
                _handleSelectRow(selectedIndex, data[selectedIndex])
            }

        }
    }, [arrowDownPressed, arrowUpPressed, searchBarFocused,enterPressed]);



    const data = useMemo(
        () => {
            return results;
        },
        [results]
    )

    const _handleSearch = tags => {
        handleSearch && handleSearch(tags);
    }

    const columns = React.useMemo(

        () => [
            {
                Header: 'Nom',
                accessor: 'lastname',
                filter: 'text'
            },
            {
                Header: 'Prenom',
                accessor: 'firstname',
                filter: 'fuzzyText'
            },
            {
                Header: 'Date de naissance',
                accessor: 'birthdate',

            },
            {
                Header: 'Groupe pathologique',
                accessor: 'groups.path',

            },
            {
                Header: 'Sexe',
                accessor: 'gender',
            },
            {
                Header: 'Mesures',
                accessor: v => v.mesures.length,
            },
        ],
        []
    )

    const searchableFields = [
        'nom',
        'prenom'
    ]

    const handleSelectRow = (index, row) => {
        _handleSelectRow && _handleSelectRow(index, row.original)
    }


    return (
        <MainView renderFooter={renderFooter}>
            <SearchLayout cover contained className="page-search">
                <SearchArea area="search">
                    <TagInput tabIndex={1} placeholder={t(`Recherche`)} tags={tags} handleFocus={v => setSearchBarFocused(v)} handleChange={_handleSearch} fields={searchableFields} />
                    <Button tabIndex={5} className="button--big" onClick={handleCreate}>Créer un nouveau Patient</Button>
                </SearchArea>
                <AdvancedSearch area="filter">recherche avancée <ArrowDown /></AdvancedSearch>
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
        </MainView>
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
