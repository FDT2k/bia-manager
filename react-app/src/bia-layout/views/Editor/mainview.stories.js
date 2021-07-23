
import React, { useEffect,useMemo, useState, useRef } from 'react';
import { makeThemeSelect, Containers, Annotate } from 'stories/storybook-utils'
import MainView from './index.js'

export default Annotate({
      Concept: '',
      Default: ''
}, Containers('Views/Editor'));



export const SimpleList = () =>  {



    return (<MainView/>)
}
