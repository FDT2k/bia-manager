import React from 'react'
import {withBaseClass,withModifiers,withVariables,compose, bem,divElement, cEx} from 'bia-layout/utils'

import './tooltip.scss'


export const withTooltip =  Component => props => {

    const {right,top,left,bottom,tooltipText,...rest} = props

    return (<div className="tooltip">
        <Component {...rest}/>
        <span className="tooltiptext">{tooltipText}</span>
    </div>)
}

export default withModifiers(x=>`tooltiptext--${x}`,['left','top','bottom','right'])(props => {
    const {className, tooltipText,children,...rest} = props
    console.log(className)

    const cls = cEx([
        className,
        "tooltiptext"
    ])
    return (<div className="tooltip">
        {React.cloneElement(React.Children.only(children),rest)}
        <span className={cls}>{tooltipText}</span>
    </div>)
})