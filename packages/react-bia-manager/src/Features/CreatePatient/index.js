import Button from '@/Components/Form/Button';
import DatePicker from '@/Components/Form/DatePicker';
import Field from '@/Components/Form/Fields';
import Select from '@/Components/Form/Select';
import PageHeader from '@/Components/PageHeader';
import MainView from "@/Components/MainView";
import { enlist, identity, is_nil, repeat, safe_path } from '@karsegard/composite-js';
import { curry } from '@karsegard/composite-js/Curry';
import { keyval } from '@karsegard/composite-js/ObjectUtils';
import { ComponentWithArea, Grid } from '@karsegard/react-core-layout';
import { useForm } from '@karsegard/react-hooks';
import React, { useEffect, useMemo } from 'react';
import { useLocation } from "wouter";

const mapItemListAsoption = (item) => {
    return { [item.id]: item.name }
}


export const Page = props => {

    const { available_options, t, patient, handleChange, handleSave, ...rest } = props;
    const [location, setLocation] = useLocation();




    let fields = {
        'lastname': { type: 'text', label: 'Nom' },
        'firstname': { type: 'text', label: 'Prenom' },
        'birthdate': { type: 'date', label: 'Date de naissance' },
    
        'usual_height': { type: 'text', label: 'Taille' },
        'usual_weight': { type: 'text', label: 'Poids habituel' },
        'diag': { type: 'textarea', label: 'Diagnostic' },
    }

    // inject custom fields
    fields = useMemo(()=> available_options.reduce((carry,item)=>{
        const {path,default_value,list} = item;
        if(list ){
            carry[path] = { type: 'select', label: t(path), options:list}
        }
        return carry;
    },fields),[available_options]);

    const relevantFields = useMemo(() => {
        const { age, mesures, mesure_count, ...result } = patient
        return result;
    }, [patient])


    const handleSubmit = (vals) => {
        handleSave(vals)
    }


    const required = curry((min, max, value) => {
        if (min > 0 && value.length < min) {
            return `at least ${min} characters`;
        }
        if (max > 0 && value.length > max) {
            return `max ${max} characters`;
        }
        if (is_nil(value) || value === "") {
            return `is required`;
        }
        return true;
    });

    const validate = (name, value, values) => {
        const r = ['lastname', 'firstname', 'birthdate']

        if (r.includes(name)) {
            return required(4, 0, value)
        }
        return true;
    }

    const {  values, inputProps, formProps, handleChangeValue, handleError, replaceValues } = useForm(relevantFields, {usePath:true, validate, onSubmit: handleSubmit })
    useEffect(_ => {
        replaceValues(relevantFields)
    }, [relevantFields])


    return (
        <MainView className="page-create-subject">
            <Grid>
                <PageHeader label={t('Nouveau Patient')}></PageHeader>
                <form {...formProps}>
                    <Grid

                        templateColumns="repeat(18,var(--col-1))"
                        columnGap="var(--gut-width)"
                        rowGap="var(--gut-2)"

                        templateAreas={[
                            `${repeat(5, "lastname ")} . ${repeat(3, "birthdate ")} . ${repeat(4, "groups_patho ")} . ${repeat(3, "usual_height ")}`,
                            `${repeat(5, "firstname ")} . ${repeat(3, "gender ")} . ${repeat(4, "groups_ethno ")} . ${repeat(3, "usual_weight ")}`,
                            `${repeat(9, "diag ")}  ${repeat(9, ". ")}`,
                            `${repeat(3, "btcancel ")}  ${repeat(3, "btsave ")} ${repeat(12, ". ")}`,
                        ]}

                        className="create-subject-form"
                    >
                        {enlist(fields).map((_field, idx) => {
                            const [fieldKey, field] = keyval(_field);
                            const label = t(field.label);
                            const type = field.type;
                            const val = safe_path('', fieldKey, values);
                            const options = field.options;
                            const tabIndex = idx + 1;

                            const hasErrorClass=  handleError(fieldKey, ({ error, touched, valid }) => {

                                return ( (!valid && touched) ? "error" :"")
                            });
                            return (<ComponentWithArea key={fieldKey} area={fieldKey.replace('.', '_')}><Field label={label}>

                                {type === "select" && <Select tabIndex={tabIndex} {...inputProps(fieldKey)} options={options} />}
                                {type === "text" && <input tabIndex={tabIndex}  className={hasErrorClass} type="text" {...inputProps(fieldKey)} options={options} />}
                                {type === "textarea" && <textarea tabIndex={tabIndex} {...inputProps(fieldKey)} options={options}></textarea>}
                                {type === "date" && <DatePicker tabIndex={tabIndex}
                                    selected={values[fieldKey]}
                                    handleChange={x => {
                                        handleChangeValue(fieldKey,x)
                                    }} />}
                                {handleError(fieldKey, ({ error, touched, valid }) => {

                                    return (<>
                                        {!valid && touched && <span className="error">{error}</span>}
                                    </>)
                                })}
                            </Field></ComponentWithArea>)
                        })}

                        <ComponentWithArea tabIndex={30} area="btsave"><Button type="submit">Enregistrer</Button></ComponentWithArea>
                        <ComponentWithArea tabIndex={99} area="btcancel"><Button className="btn--secondary" onClick={_ => setLocation('/search')}>Annuler</Button></ComponentWithArea>

                    </Grid>
                </form>
            </Grid>

        </MainView>

    )
}


Page.defaultProps = {

    t: identity,
    handleSave: _ => console.warn('save handler not setup'),
    patient: {},
    available_options:{}
}


export default Page
