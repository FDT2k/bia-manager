import React,{useMemo} from 'react';

import Fullscreen from 'bia-layout/containers/Fullscreen'
import Navbar from 'bia-layout/components/Navbar';
import Grid from 'bia-layout/layouts/Grid';
import {Person} from 'bia-layout/components/Icons';
import List from 'bia-layout/components/Table';
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
        <Fullscreen>
            <Grid layout3 className="bia-main">
                <Navbar>
                    <div>BIA Manager</div>
                    <div><Person/>User doc</div>
                </Navbar>
                <div>
                <List data={data} columns={columns} />
                </div>
                <Navbar><div>
                    <span> Base de données bia-test </span> -
                    <span> Patients 12541235</span> -
                    <span> Mesures: 31231 </span>
                    </div></Navbar>
            </Grid>

        </Fullscreen>
    )

}