import React from 'react';
import MainView from "bia-layout/components/Views/MainView"
import PageHeader from 'bia-layout/components/PageHeader';
import { Container, Grid, LayoutFlex } from '@karsegard/react-core-layout';
import Field from 'bia-layout/components/Form/Fields';
import { enlist, identity ,safe_path} from '@karsegard/composite-js';
import Select from 'bia-layout/components/Form/Select'
import { useFieldValues } from '@karsegard/react-hooks';
import { keyval } from '@karsegard/composite-js/ObjectUtils';

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
        'diagnostic': { type: 'text', label: 'Diagnostic' },
    }

    const {values, inputProps} = useFieldValues({},{usePath:true})
    return (
        <MainView>
            <Grid>
                <PageHeader label={t('Nouveau Patient')}></PageHeader>
                <Container>

                    <LayoutFlex>
                        {enlist(fields).map(_field => {
                            const [fieldKey, field] = keyval(_field);
                            const label = t(field.label);
                            const type = field.type;
                            const val = safe_path('',fieldKey,values);
                            const options = fields.options;
                            return (<Field key={fieldKey} label={label}>

                                { type === "select" && <Select {...inputProps(fieldKey)} options={options} />}
                            </Field>)
                        })}

                    </LayoutFlex>
                </Container>
            </Grid>

        </MainView>

    )
}


Page.defaultProps = {

    t: identity
}


export default Page