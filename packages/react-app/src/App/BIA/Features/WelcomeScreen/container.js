import React from 'react';


export default Component => props => {
    const {open_file,start_loading,stop_loading} =props;
    const handleOpen = _ => {

        start_loading("Waiting on user confirmation");
        open_file(open)
            .then(result => {
                stop_loading()
                if (result) {
                    window.location.hash = '#/search'
                }

            })
            .catch(res=>{ stop_loading()});
    }

    return (<Component handleOpenDatabase={handleOpen} />)
}

