
import React, { useEffect,useMemo, useState, useRef } from 'react';
import { makeThemeSelect, Containers, Annotate } from 'stories/storybook-utils'
import makeData from 'seeders/makeData';
import MainView from './index'
import Container from 'bia-layout/containers/Container'
export default Annotate({
      Concept: '',
      Default: ''
}, Containers('ViewsComponent/Main'));



export const Simple = () =>  {


    return (
        <MainView id="hey"/>
    )
}
