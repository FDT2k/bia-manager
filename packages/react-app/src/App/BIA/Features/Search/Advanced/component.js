import Button from '@/bia-layout/components/Form/Button';
import DatePicker from '@/bia-layout/components/Form/DatePicker';
import Field from '@/bia-layout/components/Form/Fields';
import { enlist, identity, repeat, safe_path } from '@karsegard/composite-js';
import { keyval } from '@karsegard/composite-js/ObjectUtils';
import { ComponentWithArea, Grid } from '@karsegard/react-core-layout';
import { useForm } from '@karsegard/react-hooks';
import React from 'react';

export const AdvancedForm = props => {
    const { t, handleSearch,tabOffset } = props;
    const handleSubmit = (vals) => {
        console.log('advanced searching')
        handleSearch(vals)
    }

    let fields = {
        'lastname': { type: 'text', label: 'Nom' },
        'firstname': { type: 'text', label: 'Prenom' },
        'birthyear': { type: 'text', label: 'Année de naissance' },
        'mesure_start': { type: 'date', label: 'Mesures depuis:', },
        'mesure_end': { type: 'date', label: 'jusqu\'au:', },
        
    }

    const validate = (name, value, values) => {
        const valid = false;


        return valid;
    }


    const { fields: values, inputProps, formProps, handleChangeValue, fieldValidation, replaceValues } = useForm({}, { usePath: true, validate, onSubmit: handleSubmit })


    return (<Grid

        templateColumns="repeat(12,1fr)"
        columnGap="var(--gut-width)"
        rowGap="var(--gut-2)"

        templateAreas={[
            `${repeat(3, "lastname ")} ${repeat(3, "firstname ")} ${repeat(2, "birthyear ")}  ${repeat(4, ". ")}`,
            `${repeat(3, "mesure_start ")}  ${repeat(3, "mesure_end ")}  ${repeat(6, ". ")}`,
            `${repeat(3, "btsave ")}  ${repeat(3, "btcancel ")}  ${repeat(3, "btexport ")} ${repeat(3, "btcreate ")}`,
        ]}
        className="create-subject-form"
    >
        {enlist(fields).map((_field, idx) => {
            const [fieldKey, field] = keyval(_field);
            const label = t(field.label);
            const type = field.type;
            const val = safe_path('', fieldKey, values);
            const options = field.options;
            const tabIndex = tabOffset+idx + 1;
            return (<ComponentWithArea key={fieldKey} area={fieldKey.replace('.', '_')}><Field label={label}>

                {type === "select" && <Select tabIndex={tabIndex} {...inputProps(fieldKey)} options={options} />}
                {type === "text" && <input tabIndex={tabIndex} type="text" {...inputProps(fieldKey)} options={options} />}
                {type === "textarea" && <textarea tabIndex={tabIndex} {...inputProps(fieldKey)} options={options}></textarea>}
                {type === "date" && <DatePicker allow_null={true} masked_input={true} tabIndex={tabIndex}
                    selected={values[fieldKey]}
                    handleChange={x => {
                        handleChangeValue(fieldKey, x)
                    }} />}
              
            </Field></ComponentWithArea>)
        })}

        <ComponentWithArea tabIndex={30} area="btsave"><Button type="submit">Rechercher</Button></ComponentWithArea>
        <ComponentWithArea tabIndex={30} area="btcancel"><Button type="button" onClick={_=>replaceValues({})}>Reset</Button></ComponentWithArea>
        <ComponentWithArea tabIndex={30} area="btexport"><Button type="button" onClick={_=>replaceValues({})}>Exporter</Button></ComponentWithArea>
        <ComponentWithArea tabIndex={30} area="btcreate"><Button type="button" className="button--big" onClick={_=>replaceValues({})}>CREER Un nouveau patient</Button></ComponentWithArea>


    </Grid>)
}
AdvancedForm.defaultProps = {
    t: identity,
    tabOffset:0
}

export default AdvancedForm