import { cEx, compose, filterPropPresentIn, kebabize, withVariables } from '@karsegard/react-compose';
import {is_nil} from '@karsegard/composite-js'
import { useFocus } from '@karsegard/react-hooks';
import React, { useRef } from 'react';
import './style.scss';



const ToggleSwitch = props => {


    const [formProps, rest] = filterPropPresentIn(['id', 'name'], props);
    const [inputProps, rest2] = filterPropPresentIn(['labelYes', 'labelNo'], rest);

    const { checked, onChange,tabIndex, ...rest3 } = rest2;
    const ref = useRef();
    const { hasFocus } = useFocus({ ref });
    const _checked = is_nil(checked) ? false: checked;
    const classes = cEx([
        'toggle-switch',
        _ => hasFocus ? 'toggle-switch--focus' : ''
    ])
    return (<div className={classes} {...rest3}>
        <input
            ref={ref}
            type="checkbox"
            className="toggle-switch-checkbox"
            checked={_checked}
            tabIndex={tabIndex}
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
    onChange: x => x,
    id: 'toggle'
}



const WithColors = withVariables(
    compose(x => `--${x}`, kebabize),
    x => `${x}`,
    ['colorYes', 'colorNo']
);


export default WithColors(ToggleSwitch);
