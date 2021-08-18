import { bem, cEx } from '@karsegard/react-compose';
import React, { useEffect, useRef, useState } from 'react';
import './style.scss';




const [__base_class, element,modifier]= bem('container-fullscreen')

export default props => {
  let { offset,overflowY, overflow, stretch,className, style:otherStyle, ...rest } = props;
  if (!offset) {
    offset = 0;
  }

  const ref = useRef();
  const [vh, setVh] = useState();
  const [_height, setHeight] = useState();

  const adapt = () => {
    setVh((window.innerHeight - offset) * 0.01);

    setHeight(ref.current.getBoundingClientRect().height)
  }


  useEffect(() => {
    adapt();
  }, [])

  useEffect(() => {
    window.addEventListener('resize', adapt);
    return () => {
      window.removeEventListener('resize', adapt)
    }
  }, [])

  const classes = cEx([
    __base_class,
    _=> overflowY ? modifier('overflow-y'): '',
    _=> overflow ? modifier('overflow'): '',
    _=> stretch && _height > window.innerHeight ? modifier('adapt'): '',
    className,
  ])
  return (
    <div ref={ref} className={classes} style={{ '--vh': `${vh}px` ,...otherStyle}} {...rest}>
      {props.children}
    </div>
  )
}
