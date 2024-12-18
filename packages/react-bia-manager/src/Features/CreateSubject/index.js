import Button from '@/Components/Form/Button';
import DatePicker from '@/Components/Form/DatePicker';
import Field from '@/Components/Form/Fields';
import Select from '@/Components/Form/Select';
import Input from '@/Components/Form/Input';
import PageHeader from '@/Components/PageHeader';
import MainView from "@/Components/MainView";
import { enlist, identity, is_nil, is_numeric, repeat, safe_path, is_empty } from '@karsegard/composite-js';
import { curry } from '@karsegard/composite-js/Curry';
import { keyval } from '@karsegard/composite-js/ObjectUtils';
import { ComponentWithArea, Grid } from '@karsegard/react-core-layout';
import { useForm } from '@karsegard/react-hooks';
import React, { useEffect, useMemo } from 'react';
import { useLocation } from "wouter";
import MaskedTextInput from "react-text-mask";
import moment from 'moment'
import { useTranslation } from '@';

const mapItemListAsoption = (item) => {
    return { [item.id]: item.name }
}


export const Page = props => {

    const { patient, edit, handleChange, handleCancel, handleSave, lists, forms, locked, ...rest } = props;
    const [location, setLocation] = useLocation();
    console.log('lists',lists);
    const { t, dateSysToHuman, dateHumanToSys } = useTranslation()
    let fields = {
        'lastname': { type: 'text', label: t('Last name//create subject'), tabIndex: 1 },
        'firstname': { type: 'text', label: t('First name//create subject'), tabIndex: 2 },
        'birthdate': { type: 'date', label: t('Date of birth//create subject'), tabIndex: 3 },

        'usual_height': { type: 'text', label: t('Height//create subject'), tabIndex: 6 + 1 },
        'usual_weight': { type: 'text', label: t('Usual weight//create subject'), tabIndex: 6 + 2 },
        // 'diag': { type: 'textarea', label: 'Diagnostic', tabIndex: 6 + 3 },
    }

    if (locked === false) {
        fields = {
            ...fields,
            'med_name': { type: 'text', label: t('Doctor//create subject'), tabIndex: 6 + 4 },
            'med_service': { type: 'text', label: t('Unit//Create subject'), tabIndex: 6 + 5 },
            'diag': { type: 'textarea', label: t('Diagnosis//create subject'), tabIndex: 6 + 3 },
        }
    }

    // inject custom fields
    fields = useMemo(() => enlist(forms).reduce((carry, item, idx) => {
        const [_, { list_key, path,placeholder }] = keyval(item)
        //const {path,default_value,list} = item;
        let list = lists[list_key];
        if (list) {
            carry[path] = { type: 'select', tabIndex: 4 + idx, label: t(path), options: list,placeholder }
        }
        return carry;
    }, fields), [lists]);

    const relevantFields = useMemo(() => {
        const { age, mesures, mesure_count, ...result } = patient
        return result;
    }, [patient])


    const handleSubmit = (vals) => {
        handleSave(vals)
    }


    const required_string = curry((min, max, value) => {
        if (min > 0 && value.length < min) {
            return t(`at least {value} characters`,{value:min});
        }
        if (max > 0 && value.length > max) {
            return t(`max {value} characters`,{value:max});
        }
        if (is_nil(value) || value === "") {
            return t(`field is required`);
        }
        return true;
    });

    const required_number = curry((min, max, value, mandatory = true) => {
        if (isNaN(value)) {
            return t(`must be a number`)
        }
        if (is_empty(value) && mandatory) {
            return t(`field is required`)
        } else if(!is_empty(value) ){
            if (!is_nil(min) && value < min) {
                return t(`at least {value}`,{value:min});
            }
            if (!is_nil(max) && value > max) {
                return t(`max {value}`,{value:max});
            }
            if (is_nil(value) || value === "") {
                return t(`field is required`);
            }
        }
        return true;
    });

    const required_select = curry((value) => {
        if (is_nil(value) || value === "") {
            return t(`field is required`);
        }
        return true;
    });
    const validate = (name, value, values) => {
        const r = ['lastname', 'firstname']

        if (r.includes(name)) {
            return required_string(1, 255, value)
        } else if (name === 'gender') {
            return required_select(value)
        } else if (name === 'usual_weight') {
            return required_number(20, 200, value, false)
        } else if (name === 'usual_height') {
            return required_number(50, 240, value)
        } else if (name === 'birthdate') {
            if (!moment(value, "DD.MM.YYYY").isValid()) {
                return t(`Not a valid date`);
            }
        }
        return true;
    }

    const { values, inputProps, getValue, formProps, handleChangeValue, handleError, replaceValues } = useForm(relevantFields, { usePath: true, validate, onSubmit: handleSubmit })
    useEffect(_ => {
        replaceValues(relevantFields)
    }, [relevantFields])

    let mask = [/\d/, /\d/, ".", /\d/, /\d/, ".", /\d/, /\d/, /\d/, /\d/]
    return (
        <MainView className="page-create-subject">
            <Grid>
                {!edit && <PageHeader label={t('New Subject//create subject title')}></PageHeader>}
                {edit && <PageHeader label={t('Edit Subject//edit subject title')}></PageHeader>}
                <form {...formProps}>
                    <Grid

                        templateColumns="repeat(18,1fr)"
                        columnGap="16px"
                        rowGap="8px"

                        templateAreas={[
                            `${repeat(5, "lastname ")} . ${repeat(3, "birthdate ")} . ${repeat(4, "groups_patho ")} . ${repeat(3, "usual_height ")}`,
                            `${repeat(5, "firstname ")} . ${repeat(3, "gender ")} . ${repeat(4, "groups_ethno ")} . ${repeat(3, "usual_weight ")}`,
                            `${repeat(9, "diag ")}  ${repeat(3, "med_name ")}  ${repeat(6, "med_service ")}`,
                            `${repeat(3, "btcancel ")}  ${repeat(3, "btsave ")} ${repeat(12, ". ")}`,
                        ]}

                        className="create-subject-form"
                    >
                        {enlist(fields).map((_field, idx) => {
                            const [fieldKey, field] = keyval(_field);
                            const label = field.label;
                            const type = field.type;
                            const val = safe_path('', fieldKey, values);
                            const options = field.options;
                            const tabIndex = field.tabIndex;

                            const hasErrorClass = handleError(fieldKey, ({ error, touched, valid }) => {

                                return ((!valid && touched) ? "error" : "")
                            });
                            const autoFocus = idx === 0;

                            return (<ComponentWithArea key={fieldKey} area={fieldKey.replace('.', '_')}><Field label={label}>

                                {type === "select" && <Select tabIndex={tabIndex} {...inputProps(fieldKey)} options={options} placeholder={field.placeholder} />}
                                {type === "text" && <Input autoFocus={autoFocus} tabIndex={tabIndex} className={hasErrorClass} type="text" {...inputProps(fieldKey)} options={options} />}
                                {type === "textarea" && <textarea tabIndex={tabIndex} {...inputProps(fieldKey)} options={options}></textarea>}
                                {/*type === "date" && <DatePicker tabIndex={tabIndex}
                                    selected={values[fieldKey]}
                        handleChange={handleChangeValue(fieldKey)} />*/}
                                {type === "date" && <MaskedTextInput
                                    type="text"
                                    guide={true}
                                    keepCharPositions={true}
                                    tabIndex={tabIndex}
                                    showMask={true}
                                    mask={mask}
                                    {...inputProps(fieldKey)}
                                />}
                                {handleError(fieldKey, ({ error, touched, valid }) => {

                                    return (<>
                                        {!valid && touched && <span className="error">{error}</span>}
                                    </>)
                                })}
                            </Field></ComponentWithArea>)
                        })}

                        <ComponentWithArea tabIndex={30} area="btsave"><Button type="submit">{t('Save//create subject button')}</Button></ComponentWithArea>
                        <ComponentWithArea tabIndex={99} area="btcancel"><Button className="btn--secondary" onClick={_ => handleCancel()}>{t('Cancel//create subject button')}</Button></ComponentWithArea>

                    </Grid>
                </form>
            </Grid>

        </MainView>

    )
}


Page.defaultProps = {

    t: identity,
    handleCancel: _ => window.location.href = '#/search',
    handleSave: _ => console.warn('save handler not setup'),
    forms: [
        { list_key: 'pathological_groups', path: 'groups.patho' },
        { list_key: 'genders', path: 'gender' ,placeholder:'Select gender'},
        { list_key: 'ethnological_groups', path: 'groups.ethno' },
    ],
    edit: false,
    patient: {
        firstname: '',
        lastname: '',
        usual_height: '',
        usual_weight: '',
        gender: '',
        groups: {
            patho: 'VENS2018',
            ethno: 'Caucasien'
        },
        birthdate: ''
    },
    lists: {
        "genders": [
            {
                "list_key": "genders",
                "id": "F",
                "value": "Femme"
            },
            {
                "list_key": "genders",
                "id": "M",
                "value": "Homme"
            }
        ],
        "ethnological_groups": [
            {
                "list_key": "ethnological_groups",
                "id": "Caucasien",
                "value": "Caucasien"
            },
            {
                "list_key": "ethnological_groups",
                "id": "Indo-Européen",
                "value": "Indo-Européen"
            },
            {
                "list_key": "ethnological_groups",
                "id": "Asiatique",
                "value": "Asiatique"
            },
            {
                "list_key": "ethnological_groups",
                "id": "Afro",
                "value": "Afro"
            },
            {
                "list_key": "ethnological_groups",
                "id": "Latino-américain",
                "value": "Latino-américain"
            },
            {
                "list_key": "ethnological_groups",
                "id": "inconnu",
                "value": "inconnu"
            }
        ]
    }
}


export default Page
