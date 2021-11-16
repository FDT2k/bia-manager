import React from 'react'
import Component from './component'
import { useElectron } from '@/Context/Electron';
import { spreadObjectPresentIn } from '@karsegard/composite-js/ReactUtils';
import { is_nil } from '@karsegard/composite-js';


export default props => {
    const {
        actions: {
            quit,
            sqlite_unlock,
            sqlite_query
        } } = useElectron()


    const callback = values => {

        if (values.type == "import_subject") {
            let [vals, garbage] = spreadObjectPresentIn(['lastname', 'firstname', 'birthdate', 'uuid'], values.subject)

            sqlite_query({ type: 'geninsert', table: 'subjects', values: vals, fn: 'run' })
        }


        if (values.type == "import_mesure") {

            sqlite_query({ query: "Select * from subjects where uuid=@uuid limit 1", values: { uuid: values.index_key }, fn: 'get' }).then(
                res => {
                    if (!is_nil(res)) {
                        debugger;
                        let [vals, garbage] = spreadObjectPresentIn(['id', 'date', 'examinator'], values.mesure)

                        sqlite_query({ type: 'geninsert', table: 'mesures', values: {...vals,subject_id:res.id}, fn: 'run' })
                    }
                }
            )


        }
    }

    return (<Component callback={callback} />)
}