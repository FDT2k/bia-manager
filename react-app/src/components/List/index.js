import List from 'bia-layout/components/Table';
import useDatabaseFromContext from 'hooks/useBIAManager';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';





export default props => {

    const {api} = useDatabaseFromContext();

    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(false);


    const data = useMemo(
        () => {
            return patients;
        },
        [patients]
    )

    
    const columns = React.useMemo(

        () => [
            {
                Header: 'Nom',
                accessor: 'nom',
                filter: 'text'
            },
            {
                Header: 'Prenom',
                accessor: 'prenom',
                filter: 'fuzzyText'
            },
            {
                Header: 'Date de naissance',
               /* accessor: (row) => {
                    let d = moment(row.dateNaissance).format('D.M.Y')
                    return d;
                }*/
                accessor: 'dateNaissance',
                Cell: ({value})=> {
                    let d = moment(value).format('DD.MM.Y')
                    return d;

                }
            },
            {
                Header: 'Sexe',
                accessor: 'sexe',
                filter: 'fuzzyText'
            },
            {
                Header: 'Groupe Pathologique',
                accessor: 'groupePath',
                filter: 'fuzzyText'
            },
        ],
        []
    )

    useEffect(() => {
        fetch();
    }, []);

    const fetch = _ => {
    /*    setLoading(true);
        console.log('fetch');
        api.getAll().then(
            p => {
                console.log(p);
                setPatients(p);
                setLoading(false);
            }
        )*/
    }



    const Tools = props => (<button >Créer</button>)

    return (
        <>
        <List columns={columns} data={data} Tools={Tools} />
        {loading &&  <h1>Loading....</h1>}
        </>
    )
}
