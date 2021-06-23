import React,{useState} from 'react'
import {cEx} from '@geekagency/gen-classes'


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
}
