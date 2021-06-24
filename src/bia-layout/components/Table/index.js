import React from 'react';
import { useTable, useSortBy, useGlobalFilter, usePagination, useFilters } from 'react-table'
import GlobalFilter from 'components/GlobalFilter';
import Pagination from 'bia-layout/components/Table/Pagination';
import { filterPropStartingWith, forwardProps, bem, cEx, modifiersToCeX } from 'bia-layout/utils'
import matchSorter from 'match-sorter'
import DefaultFilter from './Filters/DefaultFilter'
import './style.scss';


const [__base_class, element, modifier] = bem('listing')

export default props => {
    const { data, columns } = props;

    function fuzzyTextFilterFn(rows, id, filterValue) {
        console.log(rows,id,filterValue)
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
    const tableInstance = useTable({ columns, data,defaultColumn,filterTypes }, useFilters, useGlobalFilter, useSortBy, usePagination)


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
    console.log('render');
    return (
        <>
            <table className={cEx([__base_class])} {...getTableProps()}>
                <thead>
                    <tr>
                        <th
                            colSpan={visibleColumns.length}
                        >
                            <GlobalFilter
                                preGlobalFilteredRows={preGlobalFilteredRows}
                                globalFilter={state.globalFilter}
                                setGlobalFilter={setGlobalFilter}
                            />
                        </th>
                    </tr>
                   
                       
                       
                       
                    {headerGroups.map(headerGroup => (
                        <>
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th
                                   
                                >
                                    <div  {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}</div>
                                    <span>
                                        {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                       
                        </>
                    ))}
                    

                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
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
            <Pagination {...pageProps}/>
        </>
    )
}