
import React, { useEffect,useMemo, useState, useRef } from 'react';
//import 'sass/projects/hermod/style.scss';
import { makeThemeSelect, Containers, Annotate,AppToc } from 'stories/storybook-utils'
import LoginView from './index.js'
import MainView from 'bia-layout/components/Views/MainView'

import Login from 'bia-layout/components/Views/Login';
import LayoutFlex from 'bia-layout/layouts/Flex';

export default Annotate({
      Concept: '',
      Default: ''
}, AppToc('Views/Login'));



export const SimpleList = () =>  {



    return (
      <LoginView/>
    )
}
