import React, { useState,useRef,useEffect } from 'react';
import ReactLoading from 'react-loading';
import { useLocation } from "wouter";

import LayoutFlex from 'bia-layout/layouts/Flex'
import { useFieldValues,useWorker } from '@karsegard/react-hooks'
import useDatabaseFromContext from 'hooks/useBIAManager';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Button from 'bia-layout/components/Form/Button';
import InputGroup from 'bia-layout/components/Form/InputGroup';
import { mostAccurateFormula } from 'references';
import {parse} from './parser'
import { identity } from '@karsegard/composite-js';
export default props => {

    const [location, setLocation] = useLocation();
    const [imported_data, setImportedData] = useState();

    const [parsing, setParsing] = useState();
    const [percentage, setPercentage] = useState(0);
    const [importing,setImporting] = useState(false);
    const [imported,setImported] = useState(false);
    const [lines_count,setLineCount] = useState(0);


    const { values, inputProps, handleChange } = useFieldValues({ name: 'world' })
    const {api} = useDatabaseFromContext();
    const  fileRef = useRef();


    const workerCallback = data=>{
        if(data.progress){
            setPercentage(data.progress);
        }
        if(data.total){
            setLineCount(data.total);
        }
    //    console.log('progress',data)
        if(data.result){
            setParsing(false);
            setImportedData(data.result)
            console.log(data.result.list[0])
        }
    }


   // const [parse] = useWorker('workers/csvimport.worker.js', workerCallback);


    

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
                'bmiRef': 'bmi_ref',
                'bmiAct': 'bmi',
                'a100':{name:'data', transform: "(state={},value)=> ({...state,a100:value.a100})"},
                'a5':{name:'data', transform: "(state={},value)=> ({...state,a5:value.a5})"},
                'a50':{name:'data', transform: "(state={},value)=> ({...state,a50:value.a50})"},
                'z100':{name:'data', transform: "(state={},value)=> ({...state,z100:value.z100})"},
                'z5':{name:'data', transform: "(state={},value)=> ({...state,z5:value.z5})"},
                'z50':{name:'data', transform: "(state={},value)=> ({...state,z50:value.z50})"},
                'res100':{name:'data', transform: "(state={},value)=> ({...state,res100:value.res100})"},
                'res5':{name:'data', transform: "(state={},value)=> ({...state,res5:value.res5})"},
                'res50':{name:'data', transform: "(state={},value)=> ({...state,res50:value.res50})"},
                'rea100':{name:'data', transform: "(state={},value)=> ({...state,rea100:value.rea100})"},
                'rea5':{name:'data', transform: "(state={},value)=> ({...state,rea5:value.rea5})"},
                'rea50':{name:'data', transform: "(state={},value)=> ({...state,rea50:value.rea50})"},
                'cote':{name:'left_side', transform: "(state={},value)=> ( value !=='D' ? true: false)"},
                'poidsAct':'weight',
                'taille' : 'height',
                'appareil':'machine',
                
              /*  't2R': {name:'bia', transform: "(state={},value)=>({...state,ht2r: value.t2R})"},
                'dens': {name:'bia', transform: "(state={},value)=>({...state,density: value.dens})"},
                'eau': {name:'bia', transform: "(state={},value)=>({...state,water: value.eau})"},
                'pcEau': {name:'bia', transform: "(state={},value)=>({...state,pct_water: value.pcEau})"},
                'mng': {name:'bia', transform: "(state={},value)=>({...state,ffm: value.mng})"},
                'pcMng': {name:'bia', transform: "(state={},value)=>({...state,pct_ffm: value.pcMng})"},
                'ffmi': {name:'bia', transform: "(state={},value)=>({...state,ffmi: value.ffmi})"},
                'mngs': {name:'bia', transform: "(state={},value)=>({...state,dffm: value.mngs})"},
                'pcMngs': {name:'bia', transform: "(state={},value)=>({...state,pct_dffm: value.pcMngs})"},
                'mg': {name:'bia', transform: "(state={},value)=>({...state,fm: value.mg})"},
                'pcMg': {name:'bia', transform: "(state={},value)=>({...state,pct_ffm: value.pcMg})"},
                'fmi': {name:'bia', transform: "(state={},value)=>({...state,fmi: value.fmi})"},*/
              /*  'signe': {name:'most_accurate_bia_formula', transform: `(state={},value,values)=>{
                    const accurate_formula = ${mostAccurateFormula.toString()};

                    return accurate_formula(values.gender,values.bmi)
                }`},*/
            }
        }
    }


    const identifier = "PatientUuid";

    const separator= "|";
    const line_separator= '\n';


    const onFileChange = _=> {
        setImported(false);
        setImporting(false);
        setParsing(true);
        fileRef.current.files[0].text().then(text=> {
            return new Promise((resolve,reject)=>{

                parse ({text,line_separator,separator,mapping: mappings.BIAManager,identifier},identity,identity,workerCallback);
                resolve();
            })
            
        });
        //parse(fileRef.current.files[0].text());

    }


    const addPatients = _=> {
        setImporting(true)
        api.import_data(imported_data.list).then(_=>{setImporting(false); setImported(true);});

    }

    useEffect(()=>{
        setParsing(false);
    },[])


    return (
        <LayoutFlex column>
            <LayoutFlex>
                <InputGroup>
                <label>Choisir un fichier</label>
                <input ref={fileRef} type="file" onChange={onFileChange} disabled={parsing} />
                </InputGroup>
            </LayoutFlex>
            <LayoutFlex>

                {parsing && <LayoutFlex alignCenter>
                    <div style={{width:'50px',height:'50px'}}>
                        <CircularProgressbar value={percentage} text={`${percentage}%`} />
                    </div>
                    <div>Conversion de {lines_count} lignes en cours (depuis CSV BIA Java)</div>
                </LayoutFlex>}
                {imported_data && <span>{imported_data.countPatient} patients et {imported_data.countMesure} mesures à importer</span>}


            </LayoutFlex>

            <LayoutFlex justStretch>
                {imported_data && ! importing && !imported && <Button disabled={importing} onClick={addPatients}>Importer</Button>}
                {importing && <ReactLoading type="spin" color="#000000"/>}
                {importing && <p>importation en cours</p>}
                {imported &&  <p>importation terminée</p> }
                {imported && <Button onClick={_=>setLocation('/')}>Terminé</Button>}
            </LayoutFlex>

        </LayoutFlex>

    )
}
