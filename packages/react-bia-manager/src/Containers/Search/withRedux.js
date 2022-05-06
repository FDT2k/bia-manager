import React, { useEffect } from 'react';



import { useDispatch, useSelector } from '@karsegard/react-redux';




import SearchModule from '@/Redux/Search'


export const Module = SearchModule(state => state.search, 'search', {});
export const { actions, selectors } = Module;


export const Container = ({selectors,actions}) => Component => props => {


    const {handleCreate:_handleCreate,handlers:_handlers} = props;

    const dispatch = useDispatch();

    const results = useSelector(selectors.select_patients_list_filtered)
    const tags = useSelector(selectors.select_tags);
    const custom_filters=  useSelector(selectors.select_custom_filters);
    const has_filters = useSelector(selectors.has_custom_filters)
    const pageIndex = useSelector(selectors.current_page_index);
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
        dispatch(actions.clear_custom_filter(filter))
    }

    useEffect(()=>{
        return ()=>{
      //      dispatch(actions.clear());   
        }
    },[]);

    const handlePageChange= pageIndex=>{

        dispatch(actions.pageChange(pageIndex));
    }
    const handlers = {
        ..._handlers,
        handleSearch,
        setFilter,
        clearFilter,
        handleFetch,
        handlePageChange
    }
    return (

        <Component
            has_filters={has_filters}
            results={results}
            tags={tags}
            custom_filters={custom_filters}
            handlers={handlers} 
            pageIndex={pageIndex} />
    )
}


export default store => {

    store.manager.addModule(Module);

    return Container(Module)
}