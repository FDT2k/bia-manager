import { applyModifiers, compose, withBaseClass } from '@karsegard/react-compose';

import {LayoutFlex} from '@karsegard/react-core-layout'

import './style.scss';




const InputGroup = compose (
    withBaseClass('input-group'),
    applyModifiers({column:true,justBetween:true})
)(LayoutFlex);
/*
ToggleSwitch.defaultProps = {
    onChange: x=>x,
    id: 'toggle'
}



const WithColors =  withVariables(
    compose(x => `--${x}`, kebabize),
    x => `${x}`,
    ['colorYes','colorNo']
);
*/

export default InputGroup;
