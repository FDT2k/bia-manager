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
        } 
        
    },[tags,custom_filters]);
 

    return (

        <Component
            {...rest}
            handlers={handlers}
           
              />
    )
}