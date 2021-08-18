
import React, { useEffect,useMemo, useState, useRef } from 'react';
import { makeThemeSelect, Containers, Annotate } from 'stories/storybook-utils'
import makeData from 'seeders/makeData';
import {withBaseClass,withModifiers,withVariables,compose, bem,divElement} from '@karsegard/react-compose'
import EditorGrid from './index'
import Container from 'bia-layout/containers/Container';

export default Annotate({
      Concept: '',
      Default: ''
}, Containers('Layouts/Editor'));



const WithGridArea =  withVariables(
    x => `grid-area`,
    x => `${x}`,
    ['area']
);
const ComponentWithArea = compose(
    WithGridArea
)(divElement);

export const Defaut = () =>  {

    return (
        <Container style={{width:'500px', height:'500px',minHeight:'500px', backgroundColor:'#0000FF88'}}>
            <EditorGrid style={{backgroundColor:'#FF000088'}}>
                <ComponentWithArea area="nav">nav</ComponentWithArea>
                <ComponentWithArea area="search">search</ComponentWithArea>
                <ComponentWithArea style={{minHeight:'100%',height:'100%'}} area="mesures">mesures
                mesures
                mesures
                mesures
                mesures<br/>
                mesures<br/>
                mesures<br/>
                mesures<br/>
                mesures<br/>
                mesures<br/>
            </ComponentWithArea>

                <ComponentWithArea style={{minHeight:'100%',height:'100%'}} area="content">content</ComponentWithArea>
                <ComponentWithArea area="rest">rest</ComponentWithArea>
            </EditorGrid>
        </Container>
    )
}
