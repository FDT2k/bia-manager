import React,{useState} from 'react'
import {withBaseClass,withModifiers,compose, bem,divElement} from 'bia-layout/utils'

import Grid from '../Grid';
import './style.scss';


const modifiers = [
    'r3c1',
    'r3c3'
]

const [__base_class,element,modifier] = bem ('editor-grid')

const EditorGrid = compose(
    withBaseClass(__base_class),
    withModifiers(x => modifier(x), modifiers)
)(Grid)


export default EditorGrid;
