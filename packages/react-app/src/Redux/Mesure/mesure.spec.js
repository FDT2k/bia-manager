import { identity } from '@karsegard/composite-js';
import Module from './index'

test('hello world', () => {

    let res = Module(identity, 'MESURE')


    let payload = {normes:{},left: { data: { 0: 12 } } }
    
    let newState = res.reducer(undefined, res.plugins.fds.actions.update(payload));

    console.log(newState)


    newState = res.reducer(newState, res.plugins.bmi_data.actions.update({height:177,weight:89}));

    console.log(newState)

})