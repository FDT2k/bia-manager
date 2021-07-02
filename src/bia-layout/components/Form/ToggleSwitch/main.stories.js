
import React, { useEffect,useMemo, useState, useRef } from 'react';
import { makeThemeSelect, Containers, Annotate } from 'stories/storybook-utils'
import makeData from 'seeders/makeData';
import ToggleSwitch from './index'
import Container from 'bia-layout/containers/Container'
export default Annotate({
      Concept: '',
      Default: ''
}, Containers('Form/Fields/ToggleSwitch'));



export const Simple = () =>  {

  
    return (
    <Container style={{width:'500px', 'backgroundColor':'blue','padding':'10px'}}>
        <ToggleSwitch id="hey"/>
    </Container>
    )
}

export const Variables = () =>  {

  
    return (
    <Container style={{width:'500px', 'backgroundColor':'blue','padding':'10px'}}>
        <ToggleSwitch id="hey" colorYes="red" colorNo="pink"/>
    </Container>
    )
}
