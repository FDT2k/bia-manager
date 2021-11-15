import { identity } from '@karsegard/composite-js';
import { useFieldValues, useWorker, useWrappedWorker } from '@karsegard/react-hooks';
import Button from '@/bia-layout/components/Form/Button';
import InputGroup from '@/bia-layout/components/Form/InputGroup';
import { LayoutFlex, LayoutFlexColumn } from '@karsegard/react-core-layout'

import React, { useEffect, useRef, useState } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import ReactLoading from 'react-loading';
import { useLocation } from "wouter";
import webWorker from './csvimport.worker.js?worker&inline'
import { CircularProgressbar } from 'react-circular-progressbar';


export default props => {

    const { callback } = props;

    const [location, setLocation] = useLocation();
    const [imported_data, setImportedData] = useState();
    const [anonymous, setAnon] = useState(false);
    const [parsing, setParsing] = useState();
    const [percentage, setPercentage] = useState(0);
    const [importing, setImporting] = useState(false);
    const [imported, setImported] = useState(false);
    const [lines_count, setLineCount] = useState(0);



    const fileRef = useRef();

    const dataRef = useRef();


    const workerCallback = data => {
        if (data.progress) {
            setPercentage(data.progress);
        }
        if (data.total) {
            setLineCount(data.total);
        }

        // console.log('progress',data)
        if (data.result) {
            dataRef.current = data.result;
            setParsing(false);
            //setImportedData(data.result)
            //console.log(data.result.list[5])
        }

     
        callback && callback(data);
    }


    //  const [parse] = useWorker('@/App/BIA/Features/Database/Import/csvimport.worker.js?worker', workerCallback);
    const [parse] = useWrappedWorker(webWorker, workerCallback);




    const mappings = {
        BIAManager: {
            lists: {
                'sexe': { name: 'genders', transform: "(state,value) => value.sexe =='H'? 'M': 'F'" },
                'actPhys': { name: 'physical_activity_rate', reduce: '' },
                'typeActPhys': { name: 'physical_activity_type', reduce: '' },
                'appareil': { name: 'machines', reduce: '' },
                'groupePath': { name: 'pathological_groups', reduce: '' },
                'groupeEthno': { name: 'ethnological_groups', reduce: '' },
                'nomExaminateur': { name: 'examinators', reduce: '' },
            },
            patient: {

                'prenom': 'firstname',
                'nom': 'lastname',
                'dateNaissance': 'birthdate',
                'groupePath': { name: 'groups', transform: "(state={},value) => ({...state,'patho':value.groupePath})" },
                'groupeEthno': { name: 'groups', transform: "(state={},value) => ({...state,'ethno':value.groupeEthno})" },
                'age': 'age',
                'sexe': { name: 'gender', transform: "(state,value) => value.sexe =='H'? 'M': 'F'" },
                'poidsHab': 'usual_weight',
                'tailleHab': 'usual_height'
            },
            mesure: {
                'dateExam': 'date',
                'bmiRef': 'bmi_ref',
                'bmiAct': 'bmi',
                'a100': { name: 'data', transform: "(state={},value)=> ({...state,a100:value.a100})" },
                'a5': { name: 'data', transform: "(state={},value)=> ({...state,a5:value.a5})" },
                'a50': { name: 'data', transform: "(state={},value)=> ({...state,a50:value.a50})" },
                'z100': { name: 'data', transform: "(state={},value)=> ({...state,z100:value.z100})" },
                'z5': { name: 'data', transform: "(state={},value)=> ({...state,z5:value.z5})" },
                'z50': { name: 'data', transform: "(state={},value)=> ({...state,z50:value.z50})" },
                'res100': { name: 'data', transform: "(state={},value)=> ({...state,res100:value.res100})" },
                'res5': { name: 'data', transform: "(state={},value)=> ({...state,res5:value.res5})" },
                'res50': { name: 'data', transform: "(state={},value)=> ({...state,res50:value.res50})" },
                'rea100': { name: 'data', transform: "(state={},value)=> ({...state,rea100:value.rea100})" },
                'rea5': { name: 'data', transform: "(state={},value)=> ({...state,rea5:value.rea5})" },
                'rea50': { name: 'data', transform: "(state={},value)=> ({...state,rea50:value.rea50})" },
                'typeActPhys': { name: 'sport', transform: "(state={},value)=> ({...state,type:value.typeActPhys})" },
                'actPhys': { name: 'sport', transform: "(state={},value)=> ({...state,rate:value.actPhys})" },
                'cote': { name: 'left_side', transform: "(state={},value)=> {return value.cote !='D' ? true: false}" },
                'smoker': { name: 'smoker', transform: "(state={},value)=> {return value.smoker ==='oui' ? true: false}" },
                'poidsAct': 'weight',
                'commentaire': 'comments',
                'nomExaminateur': 'examinator',
                'taille': 'height',
                'appareil': 'machine',

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

    const separator = "|";
    const line_separator = '\n';


    const onFileChange = _ => {
        setImported(false);
        setImporting(false);
        setParsing(true);
        fileRef.current.files[0].text().then(text => {
            const payload = { text, line_separator, separator, mapping: mappings.BIAManager, identifier, anonymous };
            //parse_previous_database (payload,workerCallback,identity,workerCallback);
            parse(payload);

        });
        //parse(fileRef.current.files[0].text());

    }


    const addPatients = _ => {
        setImporting(true)
        // api.import_data(imported_data.list).then(_=>{setImporting(false); setImported(true);}).catch(err=> console.error(err));
        import_csv(dataRef.current).then(res => {
            setImporting(false);
            setImported(true);
        }).catch(err => {
            console.error(err)
        })
    }

    useEffect(() => {
        setParsing(false);
    }, [])


    return (
        <LayoutFlex column>
            {!dataRef.current && !parsing && <LayoutFlexColumn>
                <InputGroup>
                    <label>anoymiser les données</label>
                    <input type="checkbox" value={anonymous} onChange={e => setAnon(e.target.checked)} />
                </InputGroup>
                <InputGroup>
                    <label>Choisir un fichier</label>
                    <input ref={fileRef} type="file" onChange={onFileChange} disabled={parsing} />
                </InputGroup>


            </LayoutFlexColumn>}
            <LayoutFlex>

                {!dataRef.current && parsing && <LayoutFlex alignCenter>
                    <div style={{ width: '50px', height: '50px' }}>
                        <CircularProgressbar value={percentage} text={`${percentage}%`} />
                    </div>
                    <div>Importation en cours (depuis CSV BIA Java)</div>
                </LayoutFlex>}
                <LayoutFlexColumn>
                {dataRef.current && <span><b>Données importées: </b><br />{dataRef.current.countPatient} patients <br /> {dataRef.current.countMesure} mesures</span>}
                {dataRef.current &&<Button onClick={_ => setLocation('/search')}>Terminé</Button>}
                </LayoutFlexColumn>

            </LayoutFlex>

          

        </LayoutFlex>

    )
}
