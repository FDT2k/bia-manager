import { identity } from '@karsegard/composite-js';
import Button from '@/Components/Form/Button';
import {LayoutFlexRow} from '@karsegard/react-core-layout'

import React from 'react';


const Component = props => {


    const { gotoPage, previousPage, nextPage, setPageSize, canPreviousPage, canNextPage, pageCount, pageIndex, pageOptions, pageSize,handlePageChange } = props;

    return (<LayoutFlexRow className="pagination" justBetween>
        <div>
            <Button onClick={() => {gotoPage(0); handlePageChange(0)}} disabled={!canPreviousPage}>
                {'<<'}
            </Button>{' '}
            <Button onClick={() => { previousPage(); handlePageChange(pageIndex-1)}} disabled={!canPreviousPage}>
                {'<'}
            </Button>{' '}
        </div>
        <span style={{alignSelf:'center'}}>
            Page{' '}
            <strong>
                
                {pageIndex + 1} / {pageOptions.length}
            </strong>{' '}
        </span>
        <div>
            <Button onClick={() =>{ nextPage(); handlePageChange(pageIndex+1)}} disabled={!canNextPage}>
                {'>'}
            </Button>{' '}
            <Button onClick={() =>{ gotoPage(pageCount - 1);; handlePageChange(pageCount-1)}} disabled={!canNextPage}>
                {'>>'}
            </Button>{' '}
        </div>
       

    </LayoutFlexRow>)
}

Component.defaultProps = {
    gotoPage: identity,
    previousPage: identity,
    nextPage: identity,
    canNextPage: false,
    canPreviousPage: false,
}

export default Component;
