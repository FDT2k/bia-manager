/*

    each children of the stack is presented on top of each other. The
*/
import React from 'react';
import Fullscreen from 'containers/Fullscreen'
import { filterPropStartingWith, forwardProps, bem, cEx } from 'utils'


const [__base_class,  element,modifier] = bem('container-stack')


export default props => {
    const { className, baseKey,baseIndex, ...rest } = props;
    const classes = cEx([
        __base_class,
        className
    ])

    const _baseIndex = baseIndex || 1000;
    const _baseKey = baseKey || '';
    return (
        <div className={classes}>
            {
                React.Children.toArray(props.children).map(
                    (children, idx) =>
                        React.cloneElement(children, {
                            className: cEx([children.props.className, element('stacked')]),
                            key: `${baseKey}${idx}`,
                            style: {
                                ...children.props.style,
                                position: 'absolute',
                                zIndex: _baseIndex + idx
                            }
                        })

                )
            }
        </div>

    )
}