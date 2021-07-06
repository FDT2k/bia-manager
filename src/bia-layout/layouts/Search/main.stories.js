
import React, { useEffect,useMemo, useState, useRef } from 'react';
import { makeThemeSelect, Containers, Annotate } from 'stories/storybook-utils'
import makeData from 'seeders/makeData';
import {withBaseClass,withModifiers,withVariables,compose, bem,divElement} from 'bia-layout/utils'
import Search from './index'
import Container from 'bia-layout/containers/Container';

export default Annotate({
      Concept: '',
      Default: ''
}, Containers('Layouts/Search'));



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
        <Container style={{width:'1280px', height:'500px',minHeight:'500px', backgroundColor:'#0000FF88'}}>
            <Search style={{backgroundColor:'#FF000088'}}>
                <ComponentWithArea area="search">nav</ComponentWithArea>
                <ComponentWithArea area="filter">search</ComponentWithArea>
                <ComponentWithArea style={{minHeight:'100%',height:'100%'}} area="list">mesures
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
            </Search>
        </Container>
    )
}
