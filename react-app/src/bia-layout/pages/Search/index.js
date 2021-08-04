import React,{useMemo,useEffect,useState} from 'react';

import Fullscreen from 'bia-layout/containers/Fullscreen'
import Navbar from 'bia-layout/components/Navbar';
import Grid from 'bia-layout/layouts/Grid';
import {Person} from 'bia-layout/components/Icons';
import List from 'bia-layout/components/Table';
import Container from 'bia-layout/containers/Container';
import LayoutFlex from 'bia-layout/layouts/Flex';
import TagInput from 'bia-layout/components/Form/TagInput'
import MainView from 'bia-layout/components/Views/MainView'
import SearchLayout from 'bia-layout/layouts/Search'
import {ArrowDown,ArrowUp} from 'bia-layout/components/Icons'
import Button from 'bia-layout/components/Form/Button'
import {withGridArea,ComponentWithArea} from 'bia-layout/hoc/grid/Area'
import {applyModifiers,compose,withBaseClass} from 'bia-layout/utils'
import {useKeypress} from '@karsegard/react-hooks';
import './page-search.scss'

export const SearchArea =  compose(
                                withGridArea,
                                withBaseClass('search')
                            )
                            (LayoutFlex)
export const ListWithArea = withGridArea(List)
export const AdvancedSearch = compose(
                                withGridArea,
                                withBaseClass('advanced-filters'),
                                applyModifiers({alignCenter:true}),

                            )(LayoutFlex)


export const Component = props=> {

    const arrowDownPressed = useKeypress('ArrowDown');
    const arrowUpPressed = useKeypress('ArrowUp');

    const [selectedIndex, setSelectedIndex]=  useState(-1);
    const [searchBarFocused, setSearchBarFocused] = useState(false);

    const {results,handleSearch,handleCreate,tags,renderFooter,handleSelectRow:_handleSelectRow } = props;
    useEffect(()=>{
        if(!searchBarFocused){
        if(arrowDownPressed){
            setSelectedIndex(idx => (idx == results.length-1 ? 0: idx+1));
        }
        if(arrowUpPressed){
            setSelectedIndex(idx => idx >0 ? idx-1: results.length-1);
        }
        }
    },[arrowDownPressed,arrowUpPressed,searchBarFocused]);



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
                filter:'text'
            },
            {
                Header: 'Prenom',
                accessor: 'firstname',
                filter:'fuzzyText'
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
                accessor: v=> v.mesures.length,
            },
        ],
        []
    )

    const searchableFields = [
        'nom',
        'prenom'
    ]

    const handleSelectRow = index=>{

        _handleSelectRow && _handleSelectRow(index)
    }



    return (
       <MainView renderFooter={renderFooter}>
            <SearchLayout className="page-search">
                <SearchArea area="search"><TagInput tags={tags}  handleFocus={v=>setSearchBarFocused(v)} handleChange={_handleSearch} fields={searchableFields}/>
                  <Button  onClick={handleCreate}>Créer un nouveau Patient</Button>
                </SearchArea>
                <AdvancedSearch area="filter">recherche avancée <ArrowDown/></AdvancedSearch>
                <ListWithArea
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

Component.defaultProps= {
    results:[],
    handleSearch:_=>console.warn('search handler not implemented'),
    handleCreate:_=>console.warn('create handler not implemented'),
}

export default Component;
