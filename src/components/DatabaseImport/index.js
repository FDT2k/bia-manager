import React,{useState} from 'react';

import LayoutFlex from 'bia-layout/layouts/Flex'
import {useFieldValues}  from '@geekagency/use-fields-value'
import FileInput from 'bia-layout/form/FileInput'
export default props => {


    const [imported_data,setImportedData] = useState();
    const {values, inputProps,handleChange} = useFieldValues({name:'world'})
    const _import = promise => {
        promise.then(text=>{
            let data = text.split('\n');

            let fields = data[0].split('|');

            console.log(fields);
            data.shift();
            data = data.map((line)=>{
                let values = line.split('|');

                return values.reduce((carry,item,key)=>{
                    carry[fields[key]]= item;
                    return carry;
                },{});

            }).reduce( (carry,item)=> {

                const {PatientUuid,noPatient,idPatient,nom,prenom,dateNaissance,age,sexe,groupeEthno,groupePath,tailleHab,poidsHab,...mesure}= item;

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
                    PatientUuid,noPatient,idPatient,
                    
                };
                if(typeof carry.data[item.PatientUuid] == "undefined"){
                    carry.data[item.PatientUuid]=  patient;
                    carry.countPatient++;

                }
                if(typeof carry.data[item.PatientUuid].mesures == "undefined"){
                    carry.data[item.PatientUuid]['mesures']=[];
                }
                carry.data[item.PatientUuid].mesures.push(mesure);
                carry.countMesure++;

                return carry;
            },{data:{},countPatient:0,countMesure:0} );

            setImportedData(data);
        })

    }

    return (
        <LayoutFlex column>
            <LayoutFlex>
                <label>Choisir un fichier</label>

                <FileInput handleChange={ files => {
                    _import(files[0].text())
                }}/> 
                
            </LayoutFlex>
            <LayoutFlex>
                {imported_data && <span>{imported_data.countPatient} patients et {imported_data.countMesure} mesures à importer</span>}
            </LayoutFlex>
            <LayoutFlex>
                <label>Nom de la base de données</label>
                <input type="text" name="name" {...inputProps('name')}/> 
            </LayoutFlex>
            <LayoutFlex justStretch>
                <button>Créer</button>
            </LayoutFlex>

        </LayoutFlex>

    )
}