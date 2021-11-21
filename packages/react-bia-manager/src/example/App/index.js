import React from 'react';


import StaticEditor from '@/example/StaticEditor'
import StaticSearch from '@/example/StaticSearch'
import StaticCreate from '@/example/StaticCreate'
import SearchWithBackend from '@/example/SearchWithBackend'
import TestMesureEditorRedux from '@/example/TestMesureEditorRedux'
import IntegrationEditor from '@/Integration/Editor'

import { Route, Link, Switch } from 'wouter';
import { Fullscreen, LayoutFlexColumn } from '@karsegard/react-core-layout';





const routes = [

    {
        path: '/integration/editor',
        component: IntegrationEditor,
        menu: 'Editor Integration'
    },
    {
        path: '/static/editor',
        component: StaticEditor,
        menu: 'Static Editor'
    },
    {
        path: '/static/search',
        component: StaticSearch,
        menu: 'Static Search'
    },
    {
        path: '/static/create',
        component: StaticCreate,
        menu: 'Static create'
    },
    {
        path: '/backend/search',
        component: SearchWithBackend,
        menu: 'SearchWithBackend'
    },
    {
        path: '/redux/editor',
        component: TestMesureEditorRedux,
        menu: 'Stateful Mesure Editor with Redux'
    }
]

export default props => {


    return (

        <Switch>
            {routes.map((route,idx) => {
                return <Route key={idx} path={route.path}><route.component /></Route>
            })}

            <Route>
                <LayoutFlexColumn>
                    {routes.map((route,idx) => {
                        return <Link key={idx} to={route.path}>{route.menu}</Link>
                    })}

                </LayoutFlexColumn>
            </Route>

        </Switch>

    )
}
