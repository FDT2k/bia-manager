import React, { useEffect } from 'react';
import Button from '@/Components/Form/Button';
import EditableSelect from '@/Components/Form/Editable/Select';
import EditableTextInput from '@/Components/Form/Editable/TextInput';
import EditableTextArea from '@/Components/Form/Editable/TextArea';
import { safe_path } from '@karsegard/composite-js'
import Field from '@/Components/Form/Fields';
import { useFieldValues } from '@karsegard/react-hooks';


import {useTranslation,useCustomList} from '@'

export default props => {
    const {t,oneDecimal,oneDecimalPct} = useTranslation();
    const lists = useCustomList();

    const {handleClickSave,handlePrint,data,onValuesChange} = props;

    const { values,  inputProps, handleChange, replaceValues } = useFieldValues(data, { onValuesChange, usePath: true });    


    const _handleClickSave = () => {
        Promise.resolve(onValuesChange(values)).then(_ => {
            handleClickSave()

        });
    }
    useEffect(()=>{
        replaceValues(data);
    },[data])

    return (

        <>
         <Button style={{ minWidth: '100%', width: '100%', maxWidth: '100%' }} tabIndex={33} onClick={_handleClickSave}>{t('Enregistrer')}</Button>
                <Button tabIndex={44} className="btn--secondary" onClick={handlePrint}>{t('Imprimer')}</Button>
                <Field label={t("Examinateur")}>
                    <EditableTextInput value={values.examinator} name="examinator" onChange={handleChange} />
                </Field>
                <Field label={t("Bio-impédancemètre")}>
                    <EditableSelect {...inputProps('machine')} options={safe_path([], 'machines', lists)} />
                </Field>
                <Field label={t("Poids Idéal (%)")}>
                    <div>{oneDecimal(values.ideal_weight)} ({oneDecimalPct(values.pct_ideal_weight)})</div>
                </Field>
                <Field label={t("BMI Actuel")}>
                    <div>{values.bmi}</div>
                </Field>
                <Field label={t("BMI Reference")}>
                    <EditableTextInput value={values.bmi_ref} name="bmi_ref" onChange={handleChange} />
                </Field>
                <Field label={t("Remarques / Interprétations")}>
                    <EditableTextArea value={values.comments} name="comments" onChange={handleChange} />
                </Field>
        </>
    )
}