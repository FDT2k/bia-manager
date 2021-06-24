import React,{useMemo,useEffect,useState} from 'react';


import List from 'bia-layout/components/Table';
import useDatabaseFromContext from  'hooks/useDatabaseFromContext';




export default props => {

    const db = useDatabaseFromContext();

    const [patients,setPatients] = useState([]);


    const data = useMemo(
        () => {
            return patients;
        },
        [patients]
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

    useEffect(()=>{
        fetch();
    },[db]);

    const fetch = _=> {

        db.patients.toArray().then(
            p=> setPatients(p)
        )
    }

    const addPatients = _=> db.patients.bulkPut([
        
        {nom:'Karsegard',prenom:'Fabien'}
    ]).then(fetch);
    

    const Tools = props => (<button onClick={addPatients}>Créer</button>)

    return(
        <List columns={columns} data={data} Tools={Tools}/>
    
    )
}