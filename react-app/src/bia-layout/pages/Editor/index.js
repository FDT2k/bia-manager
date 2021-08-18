// lib externes
//nos libs externes
import { applyModifiers, bem, compose, getClasseNames } from '@karsegard/react-compose';
import { ArrowBack, Delete } from 'bia-layout/components/Icons';
import ListMesure from 'bia-layout/components/ListMesure';
//nos libs internes
import MainView from 'bia-layout/components/Views/MainView';
import MesureEditor from 'bia-layout/components/Views/MesureEditor';
import PatientHeader from 'bia-layout/components/Views/PatientHeader';
import Container from 'bia-layout/containers/Container';
import { ComponentWithArea as Area, withGridArea } from 'bia-layout/hoc/grid/Area';
import EditorLayout from 'bia-layout/layouts/Editor';
import LayoutFlex from 'bia-layout/layouts/Flex';
import React, { forwardRef, useState } from 'react';
//styles externes
import "react-datepicker/dist/react-datepicker.css";
//styles
import './page-editor.scss';









const ContainerWithArea = withGridArea(Container);




const [__base_class, element, modifier] = bem('bia-editor')


const NavComponent = compose(
    applyModifiers({ 'alignCenter': true }),
    withGridArea
)(LayoutFlex);

const Editor = props => {

    const { className, renderFooter, t, handleGoBack, handleMesureOpen, handleChange, lines, data, mesure, handlePrint, selectedMesureIndex, ...rest } = getClasseNames(__base_class, props);
    const [startDate, setStartDate] = useState(new Date());
    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <div className="example-custom-input" onClick={onClick} ref={ref}>
            {value}
        </div>
    ));

    const onMesureClick = (d, idx) => {
        handleMesureOpen && handleMesureOpen(d, idx)
    }

    return (
        <MainView renderFooter={renderFooter} className="bia-main--editor" renderLeftNav={
            _ => {
                return (<NavComponent className={element('nav')} area="nav" onClick={handleGoBack}>
                    <ArrowBack /> <h4>Retour à la liste</h4>
                </NavComponent>)
            }
        }>
            <EditorLayout className={className}>

                <Area className={element('patient')} area="patient"><PatientHeader data={data} /></Area>
                <Area className={element('mesures')} area="mesures">

                    <ListMesure selectedIndex={selectedMesureIndex} title={t('Mesures')} itemLabelKey="date" handleClick={onMesureClick} data={[...data.mesures, { date: "<Nouvelle>" }]}
                        renderActions={
                            (data, item, idx) => {
                                if (idx < data.length - 1) {
                                    return (<Delete />)
                                } else {
                                    return (<></>)
                                }
                            }
                        }
                    />
                </Area>
                <ContainerWithArea className={element('form')} area="content" scrollable>
                    {mesure && <MesureEditor handlePrint={handlePrint} handleChange={handleChange} mesure={mesure} />}
                    {!mesure && <h1> ERREUR  !!!! Mesure introuvable</h1>}
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
        birthdate: 'N/A',
        age: 'N/A',
    },
    selectedMesureIndex: 0,
    t: x => x
}


export default (Editor);
