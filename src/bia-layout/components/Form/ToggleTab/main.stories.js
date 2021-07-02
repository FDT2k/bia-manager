
import React, { useEffect,useMemo, useState, useRef } from 'react';
import { makeThemeSelect, Containers, Annotate } from 'stories/storybook-utils'
import makeData from 'seeders/makeData';
import ToggleTab from './index'
import Container from 'bia-layout/containers/Container'
export default Annotate({
      Concept: '',
      Default: ''
}, Containers('ViewComponents/ToggleTab'));



export const Simple = () =>  {

  
    return (
    <Container style={{width:'800px', 'backgroundColor':'blue','padding':'10px'}}>
        <ToggleTab />
    </Container>
    )
}
