import React from 'react';



import { useDispatch, useSelector } from '@karsegard/react-redux';




import SearchModule from '@/Redux/Search'


export const Module = SearchModule(state => state.search, 'search', {});
export const { actions, selectors } = Module;


export const Container = ({selectors,actions}) => Component => props => {


    const {handleCreate:_handleCreate} = props;

    const dispatch = useDispatch();

    const results = useSelector(selectors.select_patients_list_filtered)
    const tags = useSelector(selectors.select_tags);
    const custom_filters=  useSelector(selectors.select_custom_filters);
    const has_filters = useSelector(selectors.has_custom_filters)

    const handleSearch = (tags,results) => {
        dispatch( actions.search(tags))
    }

    const handleFetch = (results) => {
        dispatch(actions.fetch(results))
    }

    const setFilter = (filter, key, values, type = 'date_range') => {
        dispatch(actions.add_custom_filter(filter, values, type, key));
    }

    const clearFilter = filter => {
        dispatch(clear_custom_filter(filter))
    }


    const handlers = {
        handleSearch,
        setFilter,
        clearFilter,
        handleFetch
    }
    return (

        <Component
            has_filters={has_filters}
            results={results}
            tags={tags}
            custom_filters={custom_filters}
            handlers={handlers} />
    )
}


export default store => {

    store.manager.addModule(Module);

    return Container(Module)
}