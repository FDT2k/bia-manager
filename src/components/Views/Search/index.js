import React from 'react';

import MainView from 'bia-layout/views/MainView'

import {useDispatch} from 'react-redux';
import { useLocation } from "wouter";


export default props => {
    const [location, setLocation] = useLocation();

    const handleSubmit = values=>{
        setLocation("/search");
    }

    return (
        <MainView/>


    )
}
