import React,{useEffect, useState} from 'react'


export default Component => props=> {

    const {list_key,list,fetch,...rest} = props;

    useEffect(()=>{

        fetch(list_key);
    },[])

 
    return (<Component list={list} {...rest}/>)
}