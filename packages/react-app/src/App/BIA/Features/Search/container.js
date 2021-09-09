import React from 'react';
import { useLocation } from "wouter";

import useBIAManager from '@/hooks/useBIAManager';
import { useDispatch, useSelector } from 'react-redux';
import { search, select_count_results, select_patients_list_filtered, select_tags } from '@/Store';

import { LayoutFlex } from '@karsegard/react-core-layout'





export default Component => props => {


    const {select_patients_list_filtered:patients, search,get_backend_stats: stats,db_name,tags } = props;

    const {count,count_mesures} = stats;

    const [location, setLocation] = useLocation();
  //const dispatch = useDispatch();
  /*  const { api, patient_count, mesures_count, db_name } = useBIAManager();



    const sel_patients = useSelector(select_patients_list_filtered);
    const results_count = useSelector(select_count_results);
*/
//const patients = sel_patients;

    


    const handleSearch = tags => {
        if (tags.length > 0) {


         /*   const query = dbsearch => () => api.search([dbsearch]);

            Promise.resolve(dispatch(search(query, tags)))
                .catch(err => {
                    console.error('search error', err);
                })*/

            search(tags);
        }
    }



  //  const tags = useSelector(select_tags)
// console.log(tags);
    const handleSelectRow = (index, patient) => {
        setLocation("/editor/" + patient.id);
    }

    const handleCreate = _ => {
        setLocation("/create_subject");
    }


    return (
        <>
            <Component
                renderFooter={
                    _ => {
                        return (
                            <>
                                <LayoutFlex>
                                    <div>Base de donnée: {db_name} </div>
                                    <div> — </div>
                                    <div> Patients: {count} </div>
                                    <div> — </div>
                                    <div> Mesures: {count_mesures}</div>
                                </LayoutFlex>
                                <div>Résultats de la recherche: {patients.length} patients</div>
                            </>
                        )
                    }
                }
                results={patients}
                tags={tags}
                handleSearch={handleSearch}
                handleCreate={handleCreate}
                handleSelectRow={handleSelectRow} />
        </>
    )
}
