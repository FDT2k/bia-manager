import { identity } from '@karsegard/composite-js';
import Button from 'bia-layout/components/Form/Button';
import { LayoutFlexRow } from 'bia-layout/layouts/Flex';
import React from 'react';

const Component =  props => {


    const { gotoPage, previousPage, nextPage, setPageSize, canPreviousPage,canNextPage,pageCount,pageIndex,pageOptions,pageSize } = props;

    return (<LayoutFlexRow className="pagination">
        <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
        </Button>{' '}
        <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
        </Button>{' '}
        <span>
            Page{' '}
            <strong>
                {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
        </span>
        <Button onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
        </Button>{' '}
        <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {'>>'}
        </Button>{' '}
     
        {/*<span>
            | Go to page:{' '}
            <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={e => {
                    const page = e.target.value ? Number(e.target.value) - 1 : 0
                    gotoPage(page)
                }}
                style={{ width: '100px' }}
            />
            </span>*/}
       {/* <select
            value={pageSize}
            onChange={e => {
                setPageSize(Number(e.target.value))
            }}
        >
            {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                </option>
            ))}
            </select>*/}

    </LayoutFlexRow>)
}

Component.defaultProps= {
    gotoPage:identity,
    previousPage:identity,
    nextPage:identity,
    canNextPage:false,
    canPreviousPage:false,
}

export default Component;
