
import React, { useEffect,useMemo, useState, useRef } from 'react';
import { makeThemeSelect, AppToc, Annotate } from 'stories/storybook-utils'
import MainView from './index.js'

export default Annotate({
      Concept: '',
      Default: ''
}, AppToc('Views/Editor'));



export const SimpleList = () =>  {



    return (<MainView/>)
}
