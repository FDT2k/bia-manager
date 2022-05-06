import { createAction } from '@karsegard/react-redux';



import { compare } from '@karsegard/composite-js/List';
export default (getModule) => {


    const { types, baseSelector, selectors } = getModule()
    const actions = {};

    actions.clear = createAction(types.CLEAR);
    actions.update_search_tags = createAction(types.UPDATE_SEARCH_TAGS);
    actions.fetched = createAction(types.FETCHED,payload=>{
        debugger;
        return payload;
    });


    actions.filter_patients = createAction(types.FILTER_PATIENTS);
    actions.remove_filter = createAction(types.REMOVE_FILTER);


    actions.add_custom_filter = createAction(types.ADD_CUSTOM_FILTER, (field, values, type, key) => ({ field, filter: { ...values, type, key } }));
    actions._clear_custom_filter = createAction(types.CLEAR_CUSTOM_FILTER);
    actions.clear_custom_filter = filter => (dispatch,getState)=>{
        dispatch(actions._clear_custom_filter(filter));
        dispatch(actions.filter_results());
    }

    const ensure_array = x => {
        if (typeof x === 'undefined' || x === null) {
            return []
        }
        return x;
    }
    actions._pageChange = createAction(types.PAGE_CHANGE);
    actions.pageChange = (pageIndex)=>(dispatch, getState) => {
        const { current_page_index } = selectors;

        let current_page = current_page_index(getState())
            dispatch(actions._pageChange(pageIndex));
    }

    actions.search = (tags = []) => (dispatch, getState) => {
        console.log('[TAGS]',tags)
        const { filter_results, update_search_tags, fetched_patient, clear } = actions;
        const { select_tags, has_custom_filters, select_custom_filters } = selectors;
     
        const current_tags = select_tags(getState());
        const has_filters = has_custom_filters(getState());
        const custom_filters = select_custom_filters(getState());
       
        const [first_tag, ...other_tags] = tags;

        if (tags.length == 0 && !has_filters) {
            dispatch(clear());
            return;
        }

        if (!has_filters && compare(current_tags, tags)) { // can happen
         //   debugger;
         //   return;
        }



        dispatch(update_search_tags(tags));

        dispatch(actions.filter_results())
    }



    actions.fetch = results => (dispatch,getState)=> {
        const { current_page_index } = selectors;
        dispatch(actions.fetched(results))
      /*  let current_page = current_page_index(getState())
        dispatch(actions.pageChange(current_page));*/
        dispatch(actions.filter_results())
    }

    actions.filter_results = _ => (dispatch, getState) => {
        const { has_custom_filters } = selectors;
        const state = baseSelector(getState())
        // eslint-disable-next-line no-unused-vars
        const [first_tag, ...other_tags] = state.tags;


        const has_filters = has_custom_filters(getState());
        if (!has_filters) {

            if(state.tags.length ===0){
                return dispatch(actions.clear());
            }

            if (state.tags.length >= 1 && state.tags.length < state.patients.filtered.length) {
                debugger;
                dispatch(actions.remove_filter(null));

            }

            other_tags.map(
                tag => dispatch(actions.filter_patients(tag))
            )

            
        }else{
            state.tags.map(
                tag => dispatch(actions.filter_patients(tag))
            )
        }
    }


    return actions
}