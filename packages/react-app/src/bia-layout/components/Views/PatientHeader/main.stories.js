
import React, { useEffect,useMemo, useState, useRef } from 'react';
import { makeThemeSelect, AppToc, Annotate } from 'stories/storybook-utils'
import makeData from 'seeders/makeData';
import MainView from './index'
import Container from '@/bia-layout/containers/Container'


export default Annotate({
      Concept: '',
      Default: ''
}, AppToc('ViewComponent/PatientHeader'));



export const Simple = () =>  {


    return (
        <MainView />
    )
}
