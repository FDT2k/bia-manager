import React,{useEffect, useState} from 'react'


export default Component => props=> {

    const {list,fetch,...rest} = props;

    useEffect(()=>{

        fetch();
    },[])

 
    return (<Component list={list} {...rest}/>)
}