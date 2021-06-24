import {combineReducers, createReducer,updateObject} from 'Redux/Lib/redux-utils';







export const makeReducer =  (actionTypes,customHandlers={})=>{


  const defaultHandlers = {

    add : (state,action)=>{
      let {payload} = action
      

      return [...state,payload];

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


  const ListReducer =  createReducer([],{
    [actionTypes.CREATE]: handlers.add,
    [actionTypes.DELETE]: handlers.delete,
    [actionTypes.UPDATE]: handlers.update,
  })



  const byIdsIndexer = (state,action)=> {
    return state.reduce((acc,value)=>{
      acc[value.id]=value
      return acc;
    },{})

  }

  const ByIdsReducer = createReducer([],{
    [actionTypes.CREATE]: byIdsIndexer,
    [actionTypes.DELETE]: byIdsIndexer,
    [actionTypes.UPDATE]:byIdsIndexer,
  })




  

  return combineReducers({
    list:ListReducer,
    byIds:ByIdsReducer
  });
}

