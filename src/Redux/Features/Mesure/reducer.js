import {combineReducers, createReducer} from 'Redux/Lib/redux-utils';
import {updateObject} from '@geekagency/redux-registry/Reducer'


const makeReducer =  (actionTypes,customHandlers={})=>{


  const defaultHandlers = {

    add : (state,action)=>{
      let {payload} = action
      

      return state;

    },
    delete : (state,action)=>{
      let {payload} = action
      

      return state;

    },
    update : (state,action)=>{
      let {payload} = action
      

      return state;
    },
  }

  const handlers = updateObject(defaultHandlers,customHandlers)


  const reducer =  createReducer([],{
    [actionTypes.ADD]: handlers.add,
    [actionTypes.DELETE]: handlers.delete,
    [actionTypes.UPDATE]: handlers.update,
  })

  return reducer;
}

export default makeReducer
