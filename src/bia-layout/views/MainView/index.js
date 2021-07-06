import React,{useMemo} from 'react';

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
import './style.scss'



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


export default props => {

    const data = useMemo(
        () => {
            return [
                {
                    'nom':'Karsegard',
                    'prenom':'Fabien',
                    'dateNaissance':'24-02-1982',
                    'sexe':'homme',
                    'count':'14',
                    'patho': 'VENS2015'

                },
                {
                    'nom':'Karsegard',
                    'prenom':'Fabien',
                    'dateNaissance':'24-02-1982',
                    'sexe':'homme',
                    'count':'14',
                    'patho': 'VENS2015'

                },
                {
                    'nom':'Karsegard',
                    'prenom':'Fabien',
                    'dateNaissance':'24-02-1982',
                    'sexe':'homme',
                    'count':'14',
                    'patho': 'VENS2015'

                },
                {
                    'nom':'Karsegard',
                    'prenom':'Fabien',
                    'dateNaissance':'24-02-1982',
                    'sexe':'homme',
                    'count':'14',
                    'patho': 'VENS2015'
                }
            ];
        },
        []
    )


    const columns = React.useMemo(

        () => [
            {
                Header: 'Nom',
                accessor: 'nom',
                filter:'text'
            },
            {
                Header: 'Prenom',
                accessor: 'prenom',
                filter:'fuzzyText'
            },
            {
                Header: 'Date de naissance',
                accessor: 'dateNaissance',

            },
            {
                Header: 'Groupe pathologique',
                accessor: 'patho',

            },
            {
                Header: 'Sexe',
                accessor: 'sexe',
            },
            {
                Header: 'Mesures',
                accessor: 'count',
            },
        ],
        []
    )

    const searchableFields = [
        'nom',
        'prenom'
    ]
    return (
        <MainView>
            <SearchLayout>
                <SearchArea area="search"><TagInput fields={searchableFields}/><Button>Créer un nouveau Patient</Button></SearchArea>
                <AdvancedSearch area="filter">recherche avancée <ArrowDown/></AdvancedSearch>
                <ListWithArea SortUp={ArrowUp} SortDown={ArrowDown}  area="list" data={data} columns={columns} />
            </SearchLayout>
        </MainView>
    )

}
