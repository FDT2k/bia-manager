import React from 'react';
import { useFieldValues } from '@karsegard/react-hooks';
import Field from '@/Components/Form/Fields';
import EditableTextArea from '@/Components/Form/Editable/TextArea';
import {useTranslation} from '@'
export default ({onValuesChange,data}) => {
    const {t} = useTranslation()
    const {values,handleChange} = useFieldValues(data,{usePath:true,onValuesChange})
    return (
        <Field label={t("Remarques / Interprétations")}>
                    <EditableTextArea value={values.comments} name="comments" onChange={handleChange} />
                </Field>
    )
}