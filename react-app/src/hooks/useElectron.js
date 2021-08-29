import { useEffect, useRef } from 'react';


/**
 * Custom React Hook that listen to channel. When a new message arrives `listener` would be called with `listener(event, args...)`
 * @param {string} channel - The name of the channel
 * @param {Function} listener - The handler function
 */
const useElectron = (channel, listener) => {
    const savedHandler = useRef();
    if(window.electron){
        window.electron.handleSaveRequest(args => console.log('trigerred save ', args))
    }

    useEffect(() => {
        savedHandler.current = listener;
    }, [listener]);

    useEffect(() => {
        if (window.electron) {
            if (window.electron.ipcRenderer) {

                const eventHandler = (event, ...rest) => savedHandler.current(event, ...rest);

                window.electron.ipcRenderer.on(channel, eventHandler);

                return () => {
                    window.electron.ipcRenderer.removeListener(channel, eventHandler);
                    
                };
            } else {
                console.warn(`[electron] ${channel} not registred`)
            }
        }
    },
        [channel],
    );
};

export default useElectron;