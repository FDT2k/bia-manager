
import React, { useEffect,useMemo, useState, useRef } from 'react';
//import 'sass/projects/hermod/style.scss';
import { makeThemeSelect, Containers, Annotate } from 'stories/storybook-utils'
import Search from './index'

export default Annotate({
      Concept: '',
      Default: ''
}, Containers('Views/Search'));



export const SimpleList = () =>  {

const results = [{
  'lastname':'Fabien',
  'firstname':'Di Tore',
  'birthdate': '1982-24-02',
  'groups':{'path':'VENS2019'},
  'gender':'M',
  'mesures':[]
},{
  'lastname':'Fabien',
  'firstname':'Di Tore',
  'birthdate': '1982-24-02',
  'groups':{'path':'VENS2019'},
  'gender':'M',
  'mesures':[]
}]

    return (<Search results={results}/>)
}
