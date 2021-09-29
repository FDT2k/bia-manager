import MainView from '@/bia-layout/components/Views/MainView';
import React from 'react';
import './page-search.scss';

import Search from './index'
import connect from './connect_page'
import { LayoutFlex } from '@karsegard/react-core-layout'

export const Component = props => {
    debugger;
    const {db_name,stats,patients, ...rest } = props;
    const {count,count_mesures} = stats;
    const renderFooter = _ => {
        return (
            <>
                <LayoutFlex>
                    <div>Base de donnée: {db_name} </div>
                    <div> — </div>
                    <div> Patients: {count} </div>
                    <div> — </div>
                    <div> Mesures: {count_mesures}</div>
                </LayoutFlex>
                <div>Résultats de la recherche: {patients.length} patients</div>
            </>
        )
    }

    return (
        <MainView renderFooter={renderFooter}>
            <Search {...props} />
        </MainView>
    )

}


export default connect(Component);
