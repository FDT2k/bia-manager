import React,{useEffect,useRef} from 'react';

import './style.scss';
import { bem, compose, kebabize,filterPropPresentIn, baseElement, applyModifiers, withVariables, withModifiers, wrapComponent, asideElement, divElement, withBaseClass, cEx } from 'bia-layout/utils'

import {useFocus,useKeyPress} from '@karsegard/react-hooks';

const ToggleSwitch = props => {


    const [formProps, rest ] = filterPropPresentIn(['id','name'],props);
    const [inputProps, rest2 ] = filterPropPresentIn(['labelYes','labelNo'],rest);

    const {checked,onChange, ...rest3} = rest2;

    const ref = useRef();
    const {hasFocus} = useFocus({ref});

    const classes = cEx([
        'toggle-switch',
        _=> hasFocus? 'toggle-switch--focus':''
    ])
    return (<div className={classes} {...rest3}>
        <input
            ref={ref}
            type="checkbox"
            className="toggle-switch-checkbox"
            defaultChecked={checked}
            {...formProps}
            onChange={onChange}
            />
        <label className="toggle-switch-label" htmlFor={formProps.id}>
            <span className="toggle-switch-inner" data-yes={inputProps.labelYes} data-no={inputProps.labelNo} />
            <span className="toggle-switch-switch" />
        </label>
    </div>
    )

}


ToggleSwitch.defaultProps = {
    onChange: x=>x,
    id: 'toggle'
}



const WithColors =  withVariables(
    compose(x => `--${x}`, kebabize),
    x => `${x}`,
    ['colorYes','colorNo']
);


export default WithColors(ToggleSwitch);
