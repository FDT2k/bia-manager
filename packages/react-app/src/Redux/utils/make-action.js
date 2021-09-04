import {  is_type_function } from '@karsegard/composite-js';
import { curry } from '@karsegard/composite-js/Curry';



export const makeActionCreator = curry((action, payload) => {
  if(is_type_function(payload)){
    return makeActionCreatorWithPrepare(action,payload);
  }
  return { type: action, payload }
},true)


export const makeActionCreatorWithPrepare = (action,prepare)=> {
  return (...args)=> ({type:action,payload:prepare(...args)});
}



export default makeActionCreator;
