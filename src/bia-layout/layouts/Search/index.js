import React,{useState} from 'react'
import {withBaseClass,withModifiers,compose, bem,divElement} from 'bia-layout/utils'

import Grid from '../Grid';
import './style.scss';



const [__base_class,element,modifier] = bem ('search-grid-layout')

const SearchGrid = compose(
    withBaseClass(__base_class),
)(Grid)


export default SearchGrid;
