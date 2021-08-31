
import React, { useEffect,useMemo, useState, useRef } from 'react';
//import 'sass/projects/hermod/style.scss';
import { makeThemeSelect, Containers, Annotate } from 'stories/storybook-utils'
import LayoutFlex from '@/bia-layout/layouts/Flex'
import Navbar from './index.js'

export default Annotate({
      Concept: '',
      Default: ''
}, Containers('Header/Navbar'));



export const SimpleList = () =>  {

   

    return (<Navbar>
        <LayoutFlex>
            <div>item 1</div>
            <div>item 1</div>
            <div>item 1</div>
        </LayoutFlex>
        <div>hello world</div>
         </Navbar>)
}