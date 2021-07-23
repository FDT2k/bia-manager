import React,{useState,useEffect, useRef} from 'react'

import './style.scss';
import { filterPropStartingWith, forwardProps, bem, cEx, modifiersToCeX } from 'bia-layout/utils'


const [__base_class, element,modifier]= bem('container')
export default props => {

  const {className,fit,grow,contained,cover,scrollable, ...rest} = props

  
  const classes = cEx ([
    'container',
    className,
    _=> fit ? modifier('fit'): '',
    _=> grow ? modifier('grow'): '',
    _=> contained ? modifier('contained'): '',
    _=> cover ? modifier('cover'): '',
    _=> scrollable ? modifier('scrollable'): '',

  ])

  return (
    <div className={classes} {...rest}>
      {props.children}
    </div>
  )
}
