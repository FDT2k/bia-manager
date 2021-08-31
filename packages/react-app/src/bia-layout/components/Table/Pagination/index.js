import { identity } from '@karsegard/composite-js';
import Button from '@/bia-layout/components/Form/Button';
import {LayoutFlexRow} from '@karsegard/react-core-layout'

import React from 'react';


const Component = props => {


    const { gotoPage, previousPage, nextPage, setPageSize, canPreviousPage, canNextPage, pageCount, pageIndex, pageOptions, pageSize } = props;

    return (<LayoutFlexRow className="pagination" justBetween>
        <div>
            <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                {'<<'}
            </Button>{' '}
            <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
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
            <Button onClick={() => nextPage()} disabled={!canNextPage}>
                {'>'}
            </Button>{' '}
            <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
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
