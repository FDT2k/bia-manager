import React from 'react';

import { connect, bindSelectors } from '@karsegard/react-redux';


import RecapGridComponent from '@/Components/RecapGrid';



export default ({
    selectors:{
        select_recap_list,
        select_recap_headers,
    }
}) => {


    const ConnectedRecapGrid = connect(bindSelectors({
        data: select_recap_list,
        headers: select_recap_headers
    }))(RecapGridComponent)

    return ConnectedRecapGrid
}