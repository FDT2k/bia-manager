import React,{useState} from 'react'
import {cEx} from '@karsegard/cex'
import {withBaseClass,withModifiers,compose, bem,divElement} from 'bia-layout/utils'
import './style.scss';/*
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

const modifiers = [
    'r3c1',
    'r3c3'
]

const [__base_class,element,modifier] = bem ('layout-grid')

const Grid = compose(
    withBaseClass(__base_class),
    withModifiers(x => modifier(x), modifiers)
)(divElement)


export default Grid;
