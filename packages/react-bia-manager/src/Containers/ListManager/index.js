import {connect,bindSelectors} from '@karsegard/react-redux'
import {Modules} from '@karsegard/react-redux'
import React,{useEffect} from'react';

export const module =  Modules.FilterableCollection(state=> state.lists, `lists`,{default_key:'_id'})



export const {selectors,actions } = module;


export const connectLists= connect(
    bindSelectors(
        {
            list:selectors.list,
            filter:selectors.filter
        })
    ,{
        fetch:actions.fetch
    })



export const ListsHoc = Component =>  props=> {

    const {list,getData,fetch,...rest} = props;

    useEffect(()=>{
        getData().then(items=>{

            fetch({items});

        });
    },[])


 
    return (<Component list={list} {...rest}/>)
}