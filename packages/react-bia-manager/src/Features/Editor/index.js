// lib externes
//nos libs externes
import { applyModifiers, bem, compose, getClasseNames } from '@karsegard/react-compose';
import { ArrowBack, Delete } from '@/Components/Icons';
//nos libs internes
import MainView from '@/Components/MainView';



import EditorLayout from '@/Components/EditorLayout';

import ReactLoading from 'react-loading'
import React, { forwardRef, useState,useMemo } from 'react';


import {Container,LayoutFlex,withGridArea ,ComponentWithArea as Area} from '@karsegard/react-core-layout'
import MesureEditor from './Mesure';
import PatientHeader from './PatientHeader';


import ListMesure from './ListMesure';

const ContainerWithArea = withGridArea(Container);

const [__base_class, element, modifier] = bem('bia-editor')

const NavComponent = compose(
    applyModifiers({ 'alignCenter': true }),
    withGridArea
)(LayoutFlex);

const Editor = props => {
    const {className, handlers,defaultHandlers,...renderers} = getClasseNames(__base_class, props);

    const {handleGoBack,handlePrint,handleMesureCreate, handleMesureOpen,handleMesureDelete, handleSubjectChange,handleChange,handleClickSave} = Object.assign({},defaultHandlers,handlers);


    const {RightFooter, ...remaining} = renderers;
    const {t,  lines, data, mesure,selectedMesureIndex, ...rest} = remaining


    return (
        <MainView RightFooter={RightFooter} className="bia-main--editor" renderLeftNav={
            _ => {
                return (<NavComponent className={element('nav')} area="nav" onClick={handleGoBack}>
                    <ArrowBack /> <h4>{t('Retour à la liste')}</h4>
                </NavComponent>)
            }
        }>
            <EditorLayout className={className}>

                {<Area className={element('patient')} area="patient"><PatientHeader handleChange={handleSubjectChange} data={data} /></Area>}
                <Area className={element('mesures')} area="mesures">

                    <ListMesure selectedIndex={selectedMesureIndex} title={t('Mesures')} itemLabelKey="date" handleItemListClick={handleMesureOpen} handleCreateClick={
                        handleMesureCreate
                    } data={data.mesures}
                        renderActions={
                            (data, item, idx) => {
                                return (<Delete className="action-icon" onClick={_=> handleMesureDelete(idx)}/>)
                            }
                        }
                    />
                </Area>
                <ContainerWithArea className={element('form')} area="content" scrollable>
                    {mesure && <MesureEditor  handleClickSave={handleClickSave} handlePrint={handlePrint} handleChange={handleChange} mesure={mesure} />}
                    {!mesure && "Aucune mesure "}
                </ContainerWithArea>

            </EditorLayout>
        </MainView>
    )

}

Editor.defaultProps = {
    data: {
        mesures: [],
        lastname: 'N/A',
        firstname: 'N/A',
        birthdate: '1970-01-01',
        age: 'N/A',
    },
    selectedMesureIndex: 0,
    handleMesureOpen:x=> console.warn('no handler set for handleMesureOpen'),
    handleMesureDelete:x=>console.warn('no handler set for handleMesureDelete'),
    t: x => x,
    defaultHandlers:{
        handleChange: _=> console.warn ('no handler set for handleChange'),
        handleSubjectChange: _=> console.warn ('no handler set for handleSubjectChange'),
        handleClickSave: _=> console.warn ('no handler set for handleClickSave'),
        handleMesureDelete: _=> console.warn ('no handler set for handleMesureDelete'),
        handleMesureOpen: _=> console.warn ('no handler set for handleMesureOpen'),
        handleMesureCreate: _=> console.warn ('no handler set for handleMesureCreate'),
        handleGoBack: _=> console.warn ('no handler set for handleGoBack'),
    }
}


export default (Editor);
