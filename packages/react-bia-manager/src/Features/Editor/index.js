// lib externes
//nos libs externes
import { useTranslation } from '@';
import EditorLayout from '@/Components/EditorLayout';
import { ArrowBack, Delete } from '@/Components/Icons';
//nos libs internes
import MainView from '@/Components/MainView';
import { applyModifiers, bem, compose, getClasseNames } from '@karsegard/react-compose';
import { ComponentWithArea as Area, Container, LayoutFlex, withGridArea } from '@karsegard/react-core-layout';
import React from 'react';



import DefaultListMesure from './ListMesure';
import DefaultPatientHeader from './PatientHeader';
import DefaultMesureEditor from './Mesure';





const ContainerWithArea = withGridArea(Container);

const [__base_class, element, modifier] = bem('bia-editor')

const NavComponent = compose(
    applyModifiers({ 'alignCenter': true }),
    withGridArea
)(LayoutFlex);

const Editor = props => {
    const { customPrintHeader,MesureEditor,PatientHeader, ListMesure,className, handlers, defaultHandlers, ...renderers } = getClasseNames(__base_class, props);
    const { handleGoBack, handlePrint, handleMesureCreate, handleMesureOpen, handleMesureDelete, handleSubjectChange, handleChange, handleClickSave } = Object.assign({}, defaultHandlers, handlers);

    const { RightFooter, ...remaining } = renderers;
    const { lines, data, mesure, selectedMesureIndex, ...rest } = remaining

    const { t } = useTranslation();
    return (
        <MainView RightFooter={RightFooter} className="bia-main--editor" renderLeftNav={
            _ => {
                return (<NavComponent className={element('nav')} area="nav" onClick={handleGoBack}>
                    <ArrowBack /> <h4>{t('Back to list')}</h4>
                </NavComponent>)
            }
        }>
            <EditorLayout className={className}>

                <Area className={element('patient')} area="patient">
                    <PatientHeader
                        handleChange={handleSubjectChange}
                        data={data}
                    />
                </Area>
                <Area className={element('mesures')} area="mesures">
                    <ListMesure
                        selectedIndex={selectedMesureIndex}
                        title={t('Measurement')}
                        itemLabelKey="date"
                        handleItemListClick={handleMesureOpen}
                        handleCreateClick={
                            handleMesureCreate
                        }
                        data={data.mesures}
                        renderActions={
                            (data, item, idx) => {
                                return (<Delete className="action-icon" onClick={e => handleMesureDelete(idx)} />)
                            }
                        }
                    />
                </Area>
                <ContainerWithArea className={element('form')} area="content" grow>
                    {mesure && <MesureEditor
                        handleClickSave={handleClickSave}
                        handlePrint={handlePrint}
                        handleChange={handleChange}
                        mesure={mesure} 
                        customPrintHeader={customPrintHeader}
                        />}
                    {!mesure && " No measurement "}
                </ContainerWithArea>

            </EditorLayout>
        </MainView>
    )

}

Editor.defaultProps = {
    customPrintHeader:null,
    data: {
        mesures: [],
        lastname: 'N/A',
        firstname: 'N/A',
        birthdate: '1970-01-01',
        age: 'N/A',
    },
    selectedMesureIndex: 0,
    t: x => x,
    defaultHandlers: {
        handleChange: _ => console.warn('no handler set for handleChange'),
        handleSubjectChange: _ => console.warn('no handler set for handleSubjectChange'),
        handleClickSave: _ => console.warn('no handler set for handleClickSave'),
        handleMesureDelete: _ => console.warn('no handler set for handleMesureDelete'),
        handleMesureOpen: _ => console.warn('no handler set for handleMesureOpen'),
        handleMesureCreate: _ => console.warn('no handler set for handleMesureCreate'),
        handleGoBack: _ => console.warn('no handler set for handleGoBack'),
    },
    MesureEditor:DefaultMesureEditor,
    PatientHeader:DefaultPatientHeader,
    ListMesure:DefaultListMesure
}


export default (Editor);
