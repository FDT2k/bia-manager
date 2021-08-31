
import React, { useEffect,useMemo, useState, useRef } from 'react';
import { makeThemeSelect, Containers, Annotate } from 'stories/storybook-utils'
import makeData from 'seeders/makeData';
import Button from './index'
import Container from '@/bia-layout/containers/Container'
export default Annotate({
      Concept: '',
      Default: ''
}, Containers('Form/Buttons'));



export const Simple = () =>  {


    return (
    <Container style={{width:'500px', 'backgroundColor':'blue','padding':'10px'}}>
        <Button id="hey"/>
    </Container>
    )
}

export const Variables = () =>  {


    return (
    <Container style={{width:'500px', 'backgroundColor':'blue','padding':'10px'}}>
        <Button id="hey" colorYes="red" colorNo="pink"/>
    </Container>
    )
}
