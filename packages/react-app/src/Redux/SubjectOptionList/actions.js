import { enlist, } from '@karsegard/composite-js';
import { keyval } from '@karsegard/composite-js/ObjectUtils';
import { mergeAll } from '@karsegard/composite-js/List';


import {makeActionCreator as create ,makeAsyncActionCreator as createAsync} from '@karsegard/react-redux'


export default (getModule) => {

    const { submodules,types, selectors } = getModule()


    const actions = {};


    actions.fetched = create(types.FETCHED_OPTIONS,payload => {
        return {
            subactions: mergeAll(enlist(payload.data).map(item=> {
                const [key,value] = keyval(item);
                return {[key]:submodules.options[key].actions.fetch(value)}
            })),
            available_options:payload.available_options
        }

    });
    
    actions.fetch_options = (data={
       
    }) => (dispatch,getState)=>{

        const options = selectors.available_options(getState());

        return dispatch(actions.fetched({data,available_options:options}));

    }

 

    return actions;
}



