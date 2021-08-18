import LoginView from 'bia-layout/pages/Login';
import React from 'react';
import { useLocation } from "wouter";


export default props => {
    const [location, setLocation] = useLocation();

    const handleSubmit = values=>{
        setLocation("/search");
    }

    return (
        <LoginView handleSubmit={handleSubmit}/>

    )
}
