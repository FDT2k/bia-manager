import React,{useMemo} from 'react';

import Fullscreen from 'bia-layout/containers/Fullscreen'
import Navbar from 'bia-layout/components/Navbar';
import Grid from 'bia-layout/layouts/Grid';
import {Person} from 'bia-layout/components/Icons';
import List from 'bia-layout/components/Table';
import Container from 'bia-layout/containers/Container';
import LayoutFlex from 'bia-layout/layouts/Flex';


import MainView from 'bia-layout/components/Views/MainView'
import './style.scss'
export default props => {

    const data = useMemo(
        () => {
            return [];
        },
        []
    )
    const columns = React.useMemo(

        () => [
            {
                Header: 'Column 1',
                accessor: 'nom',
                filter:'text'
            },
            {
                Header: 'Column 2',
                accessor: 'prenom',
                filter:'fuzzyText'
            },
            {
                Header: 'Column 3',
                accessor: (row) => {

                    return row.nom + row.prenom;
                }
            },
        ],
        []
    )
    return (
        <MainView>

            <List data={data} columns={columns} />


        </MainView>
    )

}
