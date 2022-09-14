import { bem, cEx } from '@karsegard/react-compose';
import Pagination from './Pagination';

import { LayoutFlexColumn } from '@karsegard/react-core-layout'
import { matchSorter } from 'match-sorter';
import React,{useEffect} from 'react';
import { useFilters, useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';
import DefaultFilter from './Filters/DefaultFilter';

import {useTranslation} from '@';
const [__base_class, element, modifier] = bem('listing')

export const Table =  props => {

    const { data,className, style,columns,tabIndex, forwardedRef,selectedIndex, handleSelect,handlePageChange, Tools, SortUp, SortDown,initialPageIndex, ...rest } = props;
    const {t}=useTranslation();
    function fuzzyTextFilterFn(rows, id, filterValue) {
        return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
    }

    // Let the table remove the filter if the string is empty
    fuzzyTextFilterFn.autoRemove = val => !val

    const filterTypes = React.useMemo(
        () => ({
            // Add a new fuzzyTextFilterFn filter type.
            fuzzyText: fuzzyTextFilterFn,
            // Or, override the default text filter to use
            // "startWith"
            text: (rows, id, filterValue) => {
                return rows.filter(row => {
                    const rowValue = row.values[id]
                    return rowValue !== undefined
                        ? String(rowValue)
                            .toLowerCase()
                            .startsWith(String(filterValue).toLowerCase())
                        : true
                })
            },
        }),
        []
    )

    const sortTypes= React.useMemo(()=>({
   
            alphanumeric: (row1, row2, columnName) => {

                const rowOneColumn = row1.values[columnName];
                const rowTwoColumn = row2.values[columnName];
                if (isNaN(rowOneColumn)) {
                    return rowOneColumn.toUpperCase() >
                        rowTwoColumn.toUpperCase()
                        ? 1
                        : -1;
                }
                return Number(rowOneColumn) > Number(rowTwoColumn) ? 1 : -1;
            }
        
    }));

    const defaultColumn = React.useMemo(
        () => ({
            // Let's set up our default Filter UI
            Filter: DefaultFilter,
        }),
        []
    )
    const tableInstance = useTable({ columns, data, defaultColumn, filterTypes,sortTypes, initialState: {
        sortBy: [
            {
                id: 'lastname',
                desc: false
            }
        ],
        pageIndex:initialPageIndex
    } }, useFilters, useGlobalFilter, useSortBy, usePagination)

  

  

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        page,
        prepareRow,
        state,
        visibleColumns,
        preGlobalFilteredRows,
        setGlobalFilter,
    } = tableInstance

    useEffect(()=>{
       console.log(state.pageIndex);
    },[state.pageIndex]);

  
    const pageProps = {};

    ({

        canPreviousPage: pageProps.canPreviousPage,
        canNextPage: pageProps.canNextPage,
        pageOptions: pageProps.pageOptions,
        pageCount: pageProps.pageCount,
        gotoPage: pageProps.gotoPage,
        nextPage: pageProps.nextPage,
        previousPage: pageProps.previousPage,
        setPageSize: pageProps.setPageSize,
        state: { pageIndex: pageProps.pageIndex, pageSize: pageProps.pageSize }

    } = tableInstance);

    useEffect(()=>{
        console.log('going to page',initialPageIndex);
        pageProps.gotoPage(initialPageIndex);
    },[initialPageIndex]);
   
    
    return (<LayoutFlexColumn justBetween cover tabIndex={tabIndex} className={className} style={style}>
        <table ref={forwardedRef} className={cEx([__base_class])} {...getTableProps()} {...rest}>
            <thead  >
                {headerGroups.map((headerGroup, idx) => (

                    <tr key={idx} {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column, idx) => (
                            <th
                                key={idx}
                            >
                                <div  {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')} <span>
                                        {column.isSorted ? (column.isSortedDesc ? (SortUp ? <SortUp /> : ' 🔽') : (SortDown ? <SortDown /> : ' 🔼')) : ''}
                                    </span></div>

                            </th>
                        ))}
                    </tr>


                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {page.length == 0 && <tr><td colSpan={visibleColumns.length} align="center">{t('No results')}</td></tr>}
                {page.map((row, idx) => {
                    prepareRow(row)
                    return (
                        <tr
                            key={idx}
                            {...row.getRowProps()}
                            className={cEx([
                                { 'selected': _ => selectedIndex == idx }
                            ])}
                            onClick={_ => handleSelect(idx,row)}
                        >
                            {row.cells.map(cell => {
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                    >
                                        {cell.render('Cell')}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>

        </table>
        {pageProps.pageCount > 1 && <Pagination handlePageChange={handlePageChange} {...pageProps}  />}
    </LayoutFlexColumn>
    )
}

Table.defaultProps= {
    initialPageIndex:0
}

export default Table;