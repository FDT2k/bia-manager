
import React, { useEffect,useMemo, useState, useRef } from 'react';
//import 'sass/projects/hermod/style.scss';
import { makeThemeSelect, Containers, Annotate } from 'stories/storybook-utils'
import makeData from 'seeders/makeData';
import TagInput from './index'
import Container from 'bia-layout/containers/Container'
export default Annotate({
      Concept: '',
      Default: ''
}, Containers('Form/Fields/TagInput'));



export const Simple = () =>  {

  
    return (
    <Container style={{width:'500px', 'backgroundColor':'blue','padding':'10px'}}>
        <TagInput fields={['test','test2']}/>
    </Container>
    )
}


export const InModal = () =>  {

  
    return (
    <Container style={{width:'500px', 'backgroundColor':'blue','padding':'10px'}}>
        <TagInput fields={['test','test2']}/>
    </Container>
    )
}