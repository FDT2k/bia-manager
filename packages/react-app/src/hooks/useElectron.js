import {useState, useEffect, useRef } from 'react';

import { is_nil } from '@karsegard/composite-js';





const useElectron = (api, { onSaveRequest, onOpenRequest }) => {
    const electron_api = useRef();
    useEffect(() => {
        if (api !== undefined) {
            electron_api.current = api;
        }

    }, [api]);


    useEffect(() => {
       
        if (!is_nil(electron_api.current)) {

            function handleOpen (){
                return onOpenRequest(electron_api.current);
            }
            function handleSave () {
                return onSaveRequest(electron_api.current);
            }
            electron_api.current.handleSaveRequest(handleSave);
            electron_api.current.handleOpenRequest(handleOpen);


            return () => {

                electron_api.current.revokeSaveRequest(handleSave);
                electron_api.current.revokeOpenRequest(handleOpen);

            }
        }

    }, [])

    return {...electron_api.current}
};

export default useElectron;