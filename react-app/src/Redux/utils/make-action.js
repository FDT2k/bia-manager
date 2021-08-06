import {curry} from '@karsegard/composite-js'



export const makeActionCreator = curry((action,payload)=>{

  return {type:action,payload}
})



export default makeActionCreator;
