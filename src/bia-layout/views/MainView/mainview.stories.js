
import React, { useEffect,useMemo, useState, useRef } from 'react';
//import 'sass/projects/hermod/style.scss';
import { makeThemeSelect, Containers, Annotate } from 'stories/storybook-utils'
import MainView from 'bia-layout/views/MainView'

export default Annotate({
      Concept: '',
      Default: ''
}, Containers('Views/Main'));



export const SimpleList = () =>  {



    return (<MainView/>)
}
