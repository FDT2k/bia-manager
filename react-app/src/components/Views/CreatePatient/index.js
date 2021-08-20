import React, { useState } from 'react';
import CreatePatient from 'bia-layout/Pages/CreatePatient';
import { useLocation } from "wouter";



export default props => {
    const [location, setLocation] = useLocation();

 


    return (
        <>
            <CreatePatient/>
</>
    )
}
