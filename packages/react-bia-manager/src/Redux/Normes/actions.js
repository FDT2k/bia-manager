import {makeActionCreator as create ,makeAsyncActionCreator as createAsync} from '@karsegard/react-redux'


export default (getModule) => {

    const { types, selectors } = getModule()


    const actions = {};



    actions.refresh_norme = create(types.REFRESH)

    actions.fetched = create(types.FETCHED,payload=> {
        return payload;
    })


    


    return actions;
}



