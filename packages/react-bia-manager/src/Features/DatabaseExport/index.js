import { useTranslation } from '@';
import Modal from '@/Components/Modal';
import { Fullscreen, LayoutFlex, LayoutFlexColumn, Container, Grid } from '@karsegard/react-core-layout';
import React, { useRef, useState } from 'react';
import ToggleSwitch from '@/Components/Form/ToggleSwitch';

import 'react-circular-progressbar/dist/styles.css';
import './style.scss';
import { RangeFilterFeature as RangeFilter } from '@';
import { SexFilterFeature as GenderFilter } from '@';
import { Button  } from '@';
//import parse from './parser';
export const Component = (props) => {

    // const {custom_filters} = props;
    const [custom_filters, setCustomFilters] = useState({});
    const [rawExport, setRawExport] = useState(false);
    const { t } = useTranslation()
    
    const setFilter = (name, field, value,type="date_range") => {
        setCustomFilters(filters => {
            return {
                ...filters,
                [name]: {
                    ...value,
                    key: field,
                    type
                }
            }
        });
    }

    const clearFilter = (name) => {
        setCustomFilters(filters => {
            return {
                ...filters,
                [name]: {}
            }
        })
    }


    const {handleExport:_handleExport} = props;
    const handleExport = (e)=>{
        _handleExport({
            custom_filters,rawExport
        })
    }

    return (
        <Fullscreen>

            <Modal type="dialog" >
                <Container style={{ minWidth: "500px", width: "500px" }}>
                    <h1>{t('Export//title')}</h1>
                    <Grid templateColumns="auto" templateRows="auto auto 40px" rowGap={10} contained cover>
                        <LayoutFlex>
                            <GenderFilter
                                label={t('Sex//filter')}
                                buttonLabel="apply"
                                currentValues={custom_filters.sex}
                                handleSubmit={values => setFilter('sex', 'gender', values, 'bools')}
                                handleClear={_ => clearFilter('sex')} />
                            <RangeFilter buttonLabel="apply"
                                label={t('Measurements//filter date range')}
                                currentValues={custom_filters.mesure_range}
                                handleSubmit={values => setFilter('mesure_range', 'm.date', values)}
                                handleClear={_ => clearFilter('mesure_range')} />
                            <RangeFilter buttonLabel="apply"
                                label={t('Dates of birth//filter date range')}
                                currentValues={custom_filters.birthday_range}
                                handleSubmit={values => setFilter('birthday_range', 'birthdate', values)}
                                handleClear={_ => clearFilter('birthday_range')} />
                        </LayoutFlex>
                        <div>
                            <label>{t('Raw export//toggle label')}</label>
                            <ToggleSwitch tabIndex={6} checked={rawExport} onChange={e=>setRawExport(e.target.checked)} labelYes={t('Yes')} labelNo={t('No')} name="left_side" />
                        </div>
                        <Button onClick={handleExport}>{t('Export')}</Button>
                    </Grid>
                </Container>
            </Modal>
        </Fullscreen>
    )
}


Component.defaultProps = {
    handleExport:x=>x
}

export default Component;