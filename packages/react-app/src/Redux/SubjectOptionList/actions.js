import {makeActionCreator as create ,makeAsyncActionCreator as createAsync} from '@karsegard/react-redux'


export default (getModule) => {

    const { submodules,types, selectors } = getModule()


    const actions = {};

    
    actions.fetch_options = (data={
        "genders":[
            { 'id': 'M', 'name': 'Male',default:true },
            { 'id': 'F', 'name': 'Female' },
          
        ],
        "ethno":[
            { 'id': 'caucasian', 'name': 'Caucasien', default:true },
            { 'id': 'african', 'name': 'Africain' },
            { 'id': 'asian', 'name': 'Asiatique' },
            { 'id': 'latino', 'name': 'Latino' },
          
        ],
        'patho':[]
    }) => (dispatch,getState)=>{

        dispatch(submodules.options.genders.actions.fetch(data.gender));
        dispatch(submodules.options.ethno.actions.fetch(data.ethno));
        dispatch(submodules.options.patho.actions.fetch(data.patho));
    }

 

    return actions;
}



