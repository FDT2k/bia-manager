import {makeActionCreator as create ,makeAsyncActionCreator as createAsync} from '@karsegard/react-redux'


export default (getModule) => {

    const { types, submodules,selectors } = getModule()


    const actions = {...submodules.collection.actions};

 

    return actions;
}



