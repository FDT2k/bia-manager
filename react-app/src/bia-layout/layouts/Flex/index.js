import React,{useState} from 'react'


import { filterPropStartingWith,applyModifiers, forwardProps, bem, cEx } from 'bia-layout/utils'
import './style.scss';

export const [__base_class,element, modifier] = bem('layout-flex')


export const LayoutFlex=  props => {
  const {className,

    cover,

    centered, // align && just Center
    alignCenter,
    alignStretch,
    alignStart,
    justStretch,
    justBetween,
    justAround,
    justEvenly,
    justCenter,
    justStart,
    justEnd,

    contentStart,

    column,
    columnReverse,
    row,
    rowReverse,

    wrap,
    nowrap,
    wrapReverse,
    ...rest
  } = props

  const classes = cEx ([
   __base_class,
    {
      [modifier('between')]: _=> justBetween,
      [modifier('evenly')]: _=> justEvenly,
      [modifier('center')]: _=> justCenter,
      [modifier('stretch')]: _=> justStretch,
      [modifier('around')]: _=> justAround,
      [modifier('start')]: _=> justStart,
      [modifier('end')]: _=> justEnd,
      [modifier('column')]: _=> column,
      [modifier('column-reverse')]: _=> columnReverse,
      [modifier('row-reverse')]: _=> rowReverse,
      [modifier('align-stretch')]: _=> alignStretch,
      [modifier('align-center')]: _=> alignCenter,
      [modifier('align-start')]: _=> alignStart,
      [modifier('centered')]: _=> centered,
      [modifier('cover')]: _=> cover,
      [modifier('wrap')]: _=> wrap,
      [modifier('nowrap')]: _=> nowrap,
      [modifier('wrap-reverse')]: _=> wrapReverse,
      [modifier('content-start')]: _=> contentStart,

    },
    className,
  ])
  return (
      <>
        <div className={classes} {...rest}>
          {props.children}
        </div>
      </>
  )
}
export const LayoutFlexColumn = applyModifiers({column:true})(LayoutFlex);
export const LayoutFlexRow = LayoutFlex;
export default LayoutFlex;
