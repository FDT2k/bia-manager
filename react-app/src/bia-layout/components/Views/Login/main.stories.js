
import React, { useEffect,useMemo, useState, useRef } from 'react';
import { makeThemeSelect, AppToc, Annotate } from 'stories/storybook-utils'
import makeData from 'seeders/makeData';
import Login from './index'
import Container from 'bia-layout/containers/Container'
export default Annotate({
      Concept: '',
      Default: ''
}, AppToc('ViewComponent/Login'));



export const Simple = () =>  {


    return (
    <Container style={{width:'500px', }}>
        <Login id="hey"/>
    </Container>
    )
}
