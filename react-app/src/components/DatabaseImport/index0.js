import React, { useState,useRef,useEffect } from 'react';
import Papa from 'papaparse';
import LayoutFlex,{LayoutFlexColumn} from 'bia-layout/layouts/Flex'
import { useFieldValues } from '@karsegard/react-hooks'
import useDatabaseFromContext from 'hooks/useBIAManager';
import Button from 'bia-layout/components/Form/Button';



export default props => {
    const [parsing, setParsing] = useState(false);
    const [parsed, setParsed] = useState(false);
    const [data, setData] = useState({});
    const { values, inputProps, handleChange } = useFieldValues({ headers: true})
    const {api} = useDatabaseFromContext();
    const  fileRef = useRef();
    const mappings = {
        'BIAManager': {
            'prenom': 'firstname',
            'nom': 'lastname',
            'dateNaissance': 'birthdate',
            'groupPath': 'groups[0]',
            'groupeEthno': 'groups[1]',
            'age': 'age',
            'sexe': 'gender',
            'poidsHab': 'usual_weight',
            'tailleHab': 'usual_height',
        }
    }
    const separator= "|";
    const line_separator= '\n';
    const _import = file => {
        setParsing(true)
        Papa.parse(file,{
            worker:true,
            complete: function(results) {
        		console.log(results);
                setParsing(false);
                setData(results.data);
                setParsed(true);
        	}
        });
    /*    promise.then(text => {
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
            }, { data: {},list:[], countPatient: 0, countMesure: 0, mapping:mappings.BIAManager });




            setImportedData(data);
        })

*/

    }

    const onFileChange = _=> {
        _import(fileRef.current.files[0]);
    //    _import(fileRef.current.files[0].text());

    }


    const addPatients = _=> {
    //    api.import_data(imported_data.list).then(_=>console.log('done'));

    }

    console.log(values);
    return (
        <LayoutFlex column>
            <LayoutFlex>
                <label>Choisir un fichier</label>

                <input ref={fileRef} type="file" onChange={onFileChange} />

            </LayoutFlex>
            <LayoutFlex>

                {parsing && <span>Parsing file, please wait</span>}
                {parsed && data &&
                    <LayoutFlexColumn>
                        <div>{data.length} lines to import</div>
                        <div><input type="checkbox" checked={values['headers']} onChange={e=>handleChange} name="headers"/> is the first line headers?</div>
                        <div>{data[0].join(',')}</div>
                        <div><Button>Next</Button></div>
                    </LayoutFlexColumn>

                }



            </LayoutFlex>

            {/*<LayoutFlex justStretch>
                <button onClick={addPatients}>Importer</button>
            </LayoutFlex>*/}

        </LayoutFlex>

    )
}
