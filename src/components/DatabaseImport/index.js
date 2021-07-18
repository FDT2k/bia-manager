import React, { useState,useRef,useEffect } from 'react';

import LayoutFlex from 'bia-layout/layouts/Flex'
import { useFieldValues } from '@karsegard/react-hooks'
import useDatabaseFromContext from 'hooks/useBIAManager';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const useWorker = (workerPath,callback) => {
    const workerRef = useRef();



    useEffect(
        () => {
            const worker = new Worker(workerPath);
            workerRef.current = worker;
            worker.onmessage = message => callback(message.data)
            return () => {
                worker.terminate();
            };
        },
        [workerPath]
    );

    return [
        (...args) => {
            workerRef.current.postMessage(...args);
        }
    ];
};

export default props => {


    const [imported_data, setImportedData] = useState();

    const [parsing, setParsing] = useState();
    const [percentage, setPercentage] = useState(0);


    const { values, inputProps, handleChange } = useFieldValues({ name: 'world' })
    const {api} = useDatabaseFromContext();
    const  fileRef = useRef();


    const workerCallback = data=>{
        if(data.progress){
            setPercentage(data.progress);
        }
    //    console.log('progress',data)
        if(data.result){
            setParsing(false);
            setImportedData(data.result)
            console.log(data.result.list[0])
        }
    }


    const [parse] = useWorker('./csvimport.worker.js', workerCallback);


    const mappings = {
        BIAManager: {
            patient: {
                'prenom': 'firstname',
                'nom': 'lastname',
                'dateNaissance': 'birthdate',
                'groupePath': {name:'groups',transform: "(state={},value) => ({...state,'path':value.groupePath})"},
                'groupeEthno': {name:'groups',transform: "(state={},value) => ({...state,'ethno':value.groupeEthno})"},
                'age': 'age',
                'sexe': {name:'gender', transform: "(state,value) => value.sexe =='H'? 'M': 'F'"},
                'poidsHab': 'usual_weight',
                'tailleHab': 'usual_height'
            },
            mesure:{
                'dateExam': 'date',
                'a100':{name:'data', transform: "(state={},value)=> ({...state,a100:value.a100})"},
                'a5':{name:'data', transform: "(state={},value)=> ({...state,a5:value.a5})"},
                'a50':{name:'data', transform: "(state={},value)=> ({...state,a50:value.a50})"},
                'appareil':'machine'
            }
        }
    }


    const identifier = "PatientUuid";

    const separator= "|";
    const line_separator= '\n';


    const onFileChange = _=> {
        setParsing(true);
        fileRef.current.files[0].text().then(text=> {
            parse ({text,line_separator,separator,mapping: mappings.BIAManager,identifier})
        });
        //parse(fileRef.current.files[0].text());

    }


    const addPatients = _=> {
        api.import_data(imported_data.list).then(_=>console.log('done'));

    }

    useEffect(()=>{
        setParsing(false);
    },[])


    return (
        <LayoutFlex column>
            <LayoutFlex>
                <label>Choisir un fichier</label>

                <input ref={fileRef} type="file" onChange={onFileChange} disabled={parsing} />

            </LayoutFlex>
            <LayoutFlex>

                {parsing && <CircularProgressbar value={percentage} text={`${percentage}%`} />}
                {imported_data && <span>{imported_data.countPatient} patients et {imported_data.countMesure} mesures à importer</span>}


            </LayoutFlex>

            <LayoutFlex justStretch>
                <button onClick={addPatients}>Importer</button>
            </LayoutFlex>

        </LayoutFlex>

    )
}
