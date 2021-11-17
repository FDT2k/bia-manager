import React from 'react';


export default ({
    column: { filterValue, preFilteredRows, setFilter },
  }) =>
  
  {
    const count = preFilteredRows.length
  
    return (
      <input
        value={filterValue || ''}
        onChange={e => {
          setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        }}
        placeholder={``}
      />
    )
  }