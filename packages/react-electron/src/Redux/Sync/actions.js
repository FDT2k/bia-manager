import { createAction } from '@karsegard/react-redux';


import md5 from 'md5'



export default (getModule) => {

    const { types, selectors, submodules } = getModule()

    const actions = {}

    actions.add = createAction(types.ADD_FILE, arg=> {

        return {
            ...arg,
            hash:md5(arg.path)
        }
    })
    actions.attach = createAction(types.ATTACH)
    actions.error = createAction(types.ERROR)
    actions.detach = createAction(types.DETACH)

    actions.open = (files, forbidden) => (dispatch, getState) => {
        const existing_hashes = selectors.hashes(getState())
        debugger;
        return files.map(file => {
            if (file.path !== forbidden && !existing_hashes.includes(md5(file.path)))  {
                return dispatch(actions.add(file));
            }else{
                return false;
            }
        })
    }


    actions.refresh = () => (dispatch, getState) => {
     

    }

    return actions;

}



