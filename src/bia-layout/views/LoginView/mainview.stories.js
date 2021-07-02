
import React, { useEffect,useMemo, useState, useRef } from 'react';
//import 'sass/projects/hermod/style.scss';
import { makeThemeSelect, Containers, Annotate } from 'stories/storybook-utils'
import LoginView from 'bia-layout/views/LoginView'

export default Annotate({
      Concept: '',
      Default: ''
}, Containers('Views/Login'));



export const SimpleList = () =>  {



    return (<LoginView/>)
}
