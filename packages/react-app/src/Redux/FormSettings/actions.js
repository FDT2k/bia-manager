import {makeActionCreator as create ,makeAsyncActionCreator as createAsync} from '@karsegard/react-redux'


export default (getModule) => {

    const { types, selectors } = getModule()


    const actions = {};

 

    return actions;
}



