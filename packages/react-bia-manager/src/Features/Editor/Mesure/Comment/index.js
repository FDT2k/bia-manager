import React, { useEffect } from 'react';
import { useFieldValues } from '@karsegard/react-hooks';
import Field from '@/Components/Form/Fields';
import EditableTextArea from '@/Components/Form/Editable/TextArea';
import { useTranslation } from '@'
export default ({ onValuesChange, data }) => {
    const { t } = useTranslation()
    const { values, handleChange, replaceValues } = useFieldValues(data, { usePath: true, onValuesChange })

    useEffect(() => {
        replaceValues(data)
    }, [data])
    return (
        <div className="comments">
            <label>{t("Comments / Interpretations")}</label>
            <EditableTextArea value={values.comments} name="comments" onChange={handleChange} />
        </div>
    )
}
