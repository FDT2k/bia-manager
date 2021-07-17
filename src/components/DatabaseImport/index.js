import React, { useState,useRef } from 'react';

import LayoutFlex from 'bia-layout/layouts/Flex'
import { useFieldValues } from '@karsegard/react-hooks'
import useDatabaseFromContext from 'hooks/useBIAManager';
import {filterPropPresentIn} from 'bia-layout/utils'
import {enlist,is_type_string, is_type_object,is_type_function} from'@karsegard/composite-js';
import {key,value} from'@karsegard/composite-js/ObjectUtils';
export default props => {


    const [imported_data, setImportedData] = useState();
    const { values, inputProps, handleChange } = useFieldValues({ name: 'world' })
    const {api} = useDatabaseFromContext();
    const  fileRef = useRef();
    const mappings = {
        'BIAManager': {
            'prenom': 'firstname',
            'nom': 'lastname',
            'dateNaissance': 'birthdate',
            'groupePath': {name:'groups',transform: (state={},value) => ({...state,'path':value.groupePath})},
            'groupeEthno': {name:'groups',transform: (state={},value) => ({...state,'ethno':value.groupeEthno})},
            'age': 'age',
            'sexe': {name:'gender',transform: (state,value) => value.sexe =='H'? 'M': 'F'},
            'poidsHab': 'usual_weight',
            'tailleHab': 'usual_height',

        }
    }
    const patient_keys = [
         'nom', 'prenom', 'dateNaissance', 'age', 'sexe', 'groupeEthno', 'groupePath', 'tailleHab', 'poidsHab'
    ]
    const identifier = "PatientUuid";

    const separator= "|";
    const line_separator= '\n';
    const _import = promise => {
        promise.then(text => {
            let data = text.split(line_separator);

            let fields = data[0].split(separator);

            console.log(fields);
            data.shift();
            data = data.map((line) => {
                let values = line.split(separator);

                return values.reduce((carry, item, key) => {
                    carry[fields[key]] = item;
                    return carry;
                }, {});

            }).reduce((carry, item) => {

                const [patient,mesure] = filterPropPresentIn(patient_keys,item);
                //console.log(_patient,_mesure);

                /*const { PatientUuid, noPatient, idPatient, nom, prenom, dateNaissance, age, sexe, groupeEthno, groupePath, tailleHab, poidsHab, ...mesure } = item;

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

                };*/
                const index_key= item[identifier];
                if (typeof carry.data[index_key] == "undefined") {

                    const p = enlist(patient).reduce((carry,item)=>{
                        let _key = key(item);
                        let _mapped = mappings.BIAManager[_key];
                        if(_mapped && is_type_string(_mapped)){
                            carry[_mapped]= value(item);
                        }else if(is_type_object(_mapped)){
                            const {name,transform} = _mapped;
                            if(is_type_function(transform)){
                                carry[name]= transform(carry[name] ,patient);
                            }

                        }
                        return carry;
                    },{});

                    carry.data[index_key] = p;
                    carry.list.push(p);
                    carry.countPatient++;

                }
                if (typeof carry.data[index_key].mesures == "undefined") {
                    carry.data[index_key]['mesures'] = [];
                }
                carry.data[index_key].mesures.push(mesure);
                carry.countMesure++;

                return carry;
            }, { data: {},list:[], countPatient: 0, countMesure: 0 });




            setImportedData(data);
            console.log(data);
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
