import {combineActionTypes} from '@geekagency/redux-action-types'



export const makeActionCreators = (ActionTypes)=>{

  const create = (payload) =>{
    return {type: ActionTypes.CREATE,payload}
  }

  const update = (payload)=>{
    return {type: ActionTypes.UPDATE,payload}

  }

  const del = (payload)=>{
    return {type: ActionTypes.DELETE,payload}

  }

  return {create,update,del};
}

export const makeActionTypes = combineActionTypes(
  'CREATE',
  'UPDATE',
  'DELETE',
)

export default makeActionCreators(makeActionTypes())
