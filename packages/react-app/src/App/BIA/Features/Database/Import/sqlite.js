import React from 'react'
import Component from './component'
import { useElectron } from '@/Context/Electron';
import { spreadObjectPresentIn } from '@karsegard/composite-js/ReactUtils';
import { is_empty, is_nil } from '@karsegard/composite-js';


export default props => {
    const {
        actions: {
            quit,
            sqlite_unlock,
            sqlite_query,
            sqlite_import
        } } = useElectron()


    const callback = data => {
        console.log(data.type);

        if (data.result) {
        debugger;
            sqlite_import(data.result.list)
        }
        /*if (values.type == "import_subject") {
            sqlite_query({ query: "Select * from subjects where uuid=@uuid limit 1", values: { uuid: values.index_key }, fn: 'get' }).then(res => {
                let [vals, garbage] = spreadObjectPresentIn(['lastname', 'firstname', 'birthdate', 'uuid'], values.subject)
                if (is_empty(res)) {
                    sqlite_query({ type: 'geninsert', table: 'subjects', values: vals, fn: 'run' })
                } else {
                    sqlite_query({ type: 'genupdate', table: 'subjects', filter: { uuid: values.index_key }, values: vals, fn: 'run' })
                }
            })

        }


        if (values.type == "import_mesure") {

            sqlite_query({ query: "Select * from subjects where uuid=@uuid", values: { uuid: values.index_key }, fn: 'get' }).then(
                subject => {
                    if (!is_nil(subject)) {

                        sqlite_query({ query: "Select * from mesures where subject_id=@subject_id and date=@date", values: { subject_id: subject.id, date: values.mesure.date }, fn: 'get' })
                            .then(mesure => {
                                if (!is_empty(mesure)) {
                                    console.log('updating mesure',values)

                                } else {
                                    console.log('inserting mesure')

                                    let [vals, garbage] = spreadObjectPresentIn(['id', 'date', 'examinator'], values.mesure)

                                    sqlite_query({ type: 'geninsert', table: 'mesures', values: { ...vals, subject_id: subject.id }, fn: 'run' })
                                }
                            })

                    }
                }
            )


        }*/
    }

    return (<Component callback={callback} />)
}