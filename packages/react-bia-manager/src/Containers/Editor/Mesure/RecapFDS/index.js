import React from 'react';

import { connect, bindSelectors } from '@karsegard/react-redux';


import RecapGridComponent from '@/Components/RecapGrid';



export default ({
    selectors:{
        select_recap_fds,
        select_headers_fds,
    }
}) => {


    const ConnectedRecapGrid = connect(bindSelectors({
        data: select_recap_fds,
        headers: select_headers_fds,
        lines:state=>['left','right']
    }))(RecapGridComponent)


    return ConnectedRecapGrid
}