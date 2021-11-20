import React,{useEffect} from 'react';



import {useBackend} from '@'


export default Component => ({tags,custom_filters,has_filters,handlers,...rest}) => {
    const {search,search_custom_filters} =  useBackend();
    useEffect(()=>{
      
        if (!has_filters  && tags.length === 1) { // if the first tag did change, then refetch a preset from the database.
          
            search(tags).then(res => {
                handlers.handleFetch(res)
            });
        } else if (has_filters) {
         
            search_custom_filters(custom_filters).then(res=>{
                handlers.handleFetch(res)
               
            })
        } else {
          
     
        } 
    },[tags,custom_filters]);
  //  const {search,search_custom_filters} =  useBackend();

  //  const {handleSearch,setFilter,clearFilter,handleFetch} = handlers;
  /*  const _handleSearch = (_tags)=> {
        const [first_tag, ...other_tags] = _tags;

       if (!has_filters && first_tag && _tags.length === 1 && first_tag !== tags[0]) { // if the first tag did change, then refetch a preset from the database.
          
            search(tags).then(res => {
                handleSearch(tags);
                handleFetch(res);
            });
        } else if (has_filters) {
         
            search_custom_filters(custom_filters).then(res=>{
                handleSearch(tags);
                handleFetch(res);
            })
        } else {
            handleSearch(tags);
     
        } 
       
    }
    const setFilter = (filter, key, values, type = 'date_range') => {
        setFilter(...args)
    }

    const clearFilter = filter => {
        dispatch(clear_custom_filter(filter))
    }*/

    return (

        <Component
            {...rest}
            handlers={handlers}
           
              />
    )
}