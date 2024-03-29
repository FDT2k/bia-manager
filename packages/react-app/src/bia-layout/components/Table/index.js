import { bem, cEx } from '@karsegard/react-compose';
import Pagination from '@/bia-layout/components/Table/Pagination';

import { LayoutFlexColumn } from '@karsegard/react-core-layout'
import { matchSorter } from 'match-sorter';
import React from 'react';
import { useFilters, useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';
import DefaultFilter from './Filters/DefaultFilter';
import './style.scss';


const [__base_class, element, modifier] = bem('listing')

export default props => {


    const { data,className, style,columns,tabIndex, forwardedRef,selectedIndex, handleSelect, Tools, SortUp, SortDown, ...rest } = props;

    function fuzzyTextFilterFn(rows, id, filterValue) {
        console.log(rows, id, filterValue)
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

    const defaultColumn = React.useMemo(
        () => ({
            // Let's set up our default Filter UI
            Filter: DefaultFilter,
        }),
        []
    )
    const tableInstance = useTable({ columns, data, defaultColumn, filterTypes }, useFilters, useGlobalFilter, useSortBy, usePagination)


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
                {page.length == 0 && <tr><td colSpan={visibleColumns.length} align="center">Aucun résultat</td></tr>}
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
        {pageProps.pageCount > 1 && <Pagination {...pageProps} />}
    </LayoutFlexColumn>
    )
}
