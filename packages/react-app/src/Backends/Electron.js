

const makeBindEvent =_=> {
    let bound = {

    }

    return (api, key, fn) => {
        if (!bound[key]) {
            bound[key] = fn;
            api.current[key](bound[key])
        } else {
            console.warn('tried to register unique event again');
        }
    }
}

export const makeApi = (bindEvent,api) => ({
    ...api,
    onOpenRequest: fn => bindEvent(api, 'handleOpenRequest', fn),
    onCloseRequest: fn => bindEvent(api, 'handleCloseRequest', fn),
    onSaveRequest: fn => bindEvent(api, 'handleSaveRequest', fn),
    onLocationChange: fn => bindEvent(api, 'handleLocationChange', fn),
})


export default makeApi(makeBindEvent(),window.electron);
