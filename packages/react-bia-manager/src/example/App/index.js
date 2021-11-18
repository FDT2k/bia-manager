import React from 'react';


import StaticEditor from '@/example/StaticEditor'
import StaticSearch from '@/example/StaticSearch'
import TestMesureEditorRedux from '@/example/TestMesureEditorRedux'
import IntegrationEditor from '@/Integration/Editor'

import {Route,Link,Switch} from 'wouter';
import { Fullscreen, LayoutFlexColumn } from '@karsegard/react-core-layout';





export default props => {


    return (

        <Switch>
            <Route path="/integration/editor"><IntegrationEditor/></Route>
            <Route path="/static/editor"><StaticEditor/></Route>
            <Route path="/static/search"><StaticSearch/></Route>
            <Route path="/redux/editor"><TestMesureEditorRedux/></Route>
            <Route>
                <LayoutFlexColumn>
                    <Link to="/integration/editor">Editor integration</Link>
                    <Link to="/static/editor">Static Editor</Link>
                    <Link to="/static/search">Static Search</Link>
                    <Link to="/redux/editor">Stateful Mesure Editor with Redux</Link>
                </LayoutFlexColumn>
            </Route>

        </Switch>
        
    )
}
