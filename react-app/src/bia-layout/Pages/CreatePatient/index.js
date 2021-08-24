import React from 'react';
import MainView from "bia-layout/components/Views/MainView"
import PageHeader from 'bia-layout/components/PageHeader';
import { Container, Grid, LayoutFlex,ComponentWithArea } from '@karsegard/react-core-layout';
import Field from 'bia-layout/components/Form/Fields';
import Button from 'bia-layout/components/Form/Button';
import { enlist, identity ,safe_path,repeat} from '@karsegard/composite-js';
import Select from 'bia-layout/components/Form/Select'
import { useFieldValues } from '@karsegard/react-hooks';
import { keyval } from '@karsegard/composite-js/ObjectUtils';
import DatePicker from 'bia-layout/components/Form/DatePicker'
export const Page = props => {

    const { t, ...rest } = props;
    const fields = {
        'lastname': { type: 'text', label: 'Nom' },
        'firstname': { type: 'text', label: 'Prenom' },
        'birthdate': { type: 'date', label: 'Date de naissance' },
        'gender': { type: 'select', label: 'Sexe', options: ['M', 'F'] },

        'groups.path': { type: 'select', label: 'Groupe pathologique', options: ['a', 'b'] },
        'groups.ethno': { type: 'select', label: 'Groupe ethnique', options: ['a', 'b'] },
        'usual_height': { type: 'text', label: 'Taille' },
        'usual_weight': { type: 'text', label: 'Poids habituel' },
        'diag': { type: 'textarea', label: 'Diagnostic' },
    }

    const {values, inputProps,handleChangeValue} = useFieldValues({},{usePath:true})

    console.log(`${repeat(5,"firstname ")} . ${repeat(3,"birthdate ")} . ${repeat(4,"group_path ")} . ${repeat(3,"usual_height ")}`);
    return (
        <MainView className="page-create-subject">
            <Grid>
                <PageHeader label={t('Nouveau Patient')}></PageHeader>

                    <Grid 
                        
                        templateColumns="repeat(18,var(--col-1))"
                        columnGap="var(--gut-width)"
                        rowGap="var(--gut-2)"

                        templateAreas={[
                            `${repeat(5,"firstname ")} . ${repeat(3,"birthdate ")} . ${repeat(4,"groups_path ")} . ${repeat(3,"usual_height ")}`,
                            `${repeat(5,"lastname ")} . ${repeat(3,"gender ")} . ${repeat(4,"groups_ethno ")} . ${repeat(3,"usual_weight ")}`,
                            `${repeat(9,"diag ")}  ${repeat(9,". ")}`,
                            `${repeat(3,"btcancel ")} .  ${repeat(3,"btsave ")} ${repeat(11,". ")}`,
                        ]}

                        className="create-subject-form"
                    >
                        {enlist(fields).map(_field => {
                            const [fieldKey, field] = keyval(_field);
                            const label = t(field.label);
                            const type = field.type;
                            const val = safe_path('',fieldKey,values);
                            const options = fields.options;
                            return (<ComponentWithArea  key={fieldKey}  area={fieldKey.replace('.','_')}><Field label={label}>

                                { type === "select" && <Select {...inputProps(fieldKey)} options={options} />}
                                { type === "text" && <input type="text" {...inputProps(fieldKey)} options={options} />}
                                { type === "textarea" && <textarea {...inputProps(fieldKey)} options={options}></textarea>}
                                { type === "date" && <DatePicker   
                                    selected={values[fieldKey]}
                                    handleChange={handleChangeValue(fieldKey)} />}
                            </Field></ComponentWithArea>)
                        })}

                        <ComponentWithArea  area="btsave"><Button>Enregistrer</Button></ComponentWithArea>
                        <ComponentWithArea  area="btcancel"><Button>Annuler</Button></ComponentWithArea>

                    </Grid>
            </Grid>

        </MainView>

    )
}


Page.defaultProps = {

    t: identity
}


export default Page