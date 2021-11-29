import React from 'react'
import { useTable, useSortBy } from 'react-table'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper'
import {ArrowUp as SortUp, ArrowDown as SortDown} from '@/Components/Icons'
export const DND_ITEM_TYPE = 'row'

export const ICON_BURGER = _ => (<svg viewBox="0 0 100 80" width="20" height="20">
  <rect width="100" height="10"></rect>
  <rect y="30" width="100" height="10"></rect>
  <rect y="60" width="100" height="10"></rect>
</svg>)

export const Row = ({ row, index, moveRow, enableDrag, handleDragStart, handleDragStop, handleDrop, DragIcon }) => {
  const dropRef = React.useRef(null)
  const dragRef = React.useRef(null)

  const [, drop] = useDrop({
    accept: DND_ITEM_TYPE,
    drop(item, monitor) {
      const dragIndex = item.index
      const hoverIndex = index
    },
    hover(item, monitor) {
      if (!dropRef.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = dropRef.current.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      moveRow(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag, preview] = useDrag({
    type: DND_ITEM_TYPE,
    item: () => {
      handleDragStart && handleDragStart()
      return { type: DND_ITEM_TYPE, index }
    },

    end: () => {
      handleDragStop && handleDragStop()
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1

  preview(drop(dropRef))
  drag(dragRef)



  return (
    <tr ref={dropRef} style={{ opacity }}>
      {enableDrag && <td ref={dragRef} style={{ verticalAlign: 'middle' }}><DragIcon /></td>}
      {row.cells.map(cell => {
        return <td {...cell.getCellProps()} style={{ verticalAlign: 'middle' }}>{cell.render('Cell')}</td>
      })}

    </tr>
  )
}

Row.defaultProps = {
  handleDragStop: () => console.warn('dragging stopped'),
  handleDragStart: () => console.warn('dragging started'),
  DragIcon: ICON_BURGER
}

export const Table = ({ columns, data, enableDrag, onSort, actions, handleAction, Row, handleDragStart, handleDragStop }) => {
  //const [records, setRecords] = React.useState(data)
  const getRowId = React.useCallback(row => {
    return row.id
  }, [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    data,
    columns,
    getRowId,
  },useSortBy)

  const moveRow = (dragIndex, hoverIndex) => {
    const dragRecord = data[dragIndex]
    const list = update(data, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragRecord],
      ],
    });

    onSort && onSort(list, dragIndex, hoverIndex)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <table {...getTableProps()} className="list-manager">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {enableDrag && <th></th>}
              {headerGroup.headers.map((column,idx) => (
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
          {rows.map(
            (row, index) =>
              prepareRow(row) || (
                <Row
                  enableDrag={enableDrag}
                  index={index}
                  row={row}
                  actions={actions}
                  handleDragStart={handleDragStart}
                  handleDragStop={handleDragStop}
                  handleAction={handleAction}
                  moveRow={moveRow}
                  {...row.getRowProps()}
                />
              )
          )}
        </tbody>
      </table>
    </DndProvider>
  )
}

Table.defaultProps = {
  actions: [],
  handleAction: (item, action) => console.warn('handleItem not set'),
  Row: Row,
  enableDrag:false
}