import React,{useState} from 'react'
import {cEx} from '@geekagency/gen-classes'

import Grid from '../Grid'
export default props => {

  const {className, ...rest} = props

  const classes = cEx ([
    'layout-video-call',
    className,
  ])
  return (
        <Grid className={classes} {...rest}>
          {props.children}     
        </Grid>
  )
}
