import React,{useState} from 'react'
import {cEx} from '@karsegard/cex'
import {withBaseClass,withModifiers,withVariables,compose, bem,divElement, camelize} from 'bia-layout/utils'
import './grid.scss';/*
export default props => {

  const {className,layout3,layout2, ...rest} = props

  const classes = cEx ([
    'layout-grid',
    className,
    _=> layout3 ? 'layout-grid--3r': '',
    _=> layout2 ? 'layout-grid--2r': ''
  ])
  return (
      <>
        <div className={classes} {...rest}>
          {props.children}
        </div>
      </>
  )
}*/
import { identity, is_array, ucfirst } from '@karsegard/composite-js';

const modifiers = [
    'r3c1',
    'r3c3',
    'cover',
    'grow',
    'contained',
    'scrollable',
    'fit'
]

const withTemplateAreas = withVariables(
  _ => `gridTemplateAreas`,
  x => {
    if(is_array(x)){
      return x.map(item=> `"${item}"`).join(' ')
    }else {
      return`"${x}"`;
    }
  },
  ['templateAreas']
)

const withTemplateColRow = withVariables(
  x=> camelize(`grid-${x}`),
  identity,
  ['templateColumns','templateRows','autoRows']
)

const [__base_class,element,modifier] = bem ('layout-grid')

const Grid = compose(
    withTemplateAreas,
    withTemplateColRow,
    withModifiers(x => modifier(x), modifiers),
    withBaseClass(__base_class)
)(divElement)


export default Grid;
