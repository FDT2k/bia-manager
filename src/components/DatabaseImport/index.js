import React, { useState,useRef } from 'react';

import LayoutFlex from 'bia-layout/layouts/Flex'
import { useFieldValues } from '@geekagency/use-fields-value'
import useDatabaseFromContext from 'hooks/useBIAManager';

export default props => {


    const [imported_data, setImportedData] = useState();
    const { values, inputProps, handleChange } = useFieldValues({ name: 'world' })
    const {api} = useDatabaseFromContext();
    const  fileRef = useRef();

    const _import = promise => {
        promise.then(text => {
            let data = text.split('\n');

            let fields = data[0].split('|');

            console.log(fields);
            data.shift();
            data = data.map((line) => {
                let values = line.split('|');

                return values.reduce((carry, item, key) => {
                    carry[fields[key]] = item;
                    return carry;
                }, {});

            }).reduce((carry, item) => {

                const { PatientUuid, noPatient, idPatient, nom, prenom, dateNaissance, age, sexe, groupeEthno, groupePath, tailleHab, poidsHab, ...mesure } = item;

                const patient = {
                    nom,
                    prenom,
                    dateNaissance,
                    age,
                    sexe,
                    groupeEthno,
                    groupePath,
                    tailleHab,
                    poidsHab,
                    PatientUuid, noPatient, idPatient,

                };
                if (typeof carry.data[item.PatientUuid] == "undefined") {
                    carry.data[item.PatientUuid] = patient;
                    carry.list.push(patient);
                    carry.countPatient++;

                }
                if (typeof carry.data[item.PatientUuid].mesures == "undefined") {
                    carry.data[item.PatientUuid]['mesures'] = [];
                }
                carry.data[item.PatientUuid].mesures.push(mesure);
                carry.countMesure++;

                return carry;
            }, { data: {},list:[], countPatient: 0, countMesure: 0 });




            setImportedData(data);
        })



    }

    const onFileChange = _=> {
        _import(fileRef.current.files[0].text());

    }
    const addPatients = _=> {
        api.import_data(imported_data.list).then(_=>console.log('done'));

    }
    return (
        <LayoutFlex column>
            <LayoutFlex>
                <label>Choisir un fichier</label>

                <input ref={fileRef} type="file" onChange={onFileChange} />

            </LayoutFlex>
            <LayoutFlex>
                {imported_data && <span>{imported_data.countPatient} patients et {imported_data.countMesure} mesures à importer</span>}
            </LayoutFlex>

            <LayoutFlex justStretch>
                <button onClick={addPatients}>Importer</button>
            </LayoutFlex>

        </LayoutFlex>

    )
}
