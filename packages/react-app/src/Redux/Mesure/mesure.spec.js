import { identity } from '@karsegard/composite-js';
import Module from './index'

test('hello world', () => {

    let res = Module(identity, 'MESURE')


    let payload = {normes:{},left: { data: { 0: 12 } } }
    
    let reduc = res.reducer({}, res.plugins.fds.actions.update(payload));
    
    console.log(reduc)
})