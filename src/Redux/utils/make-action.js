import {curry} from '@geekagency/composite-js'



export const makeActionCreator = curry((action,payload)=>{

  return {type:action,payload}
})

export default makeActionCreator;
