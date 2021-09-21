
import React, { useEffect,useMemo, useState, useRef } from 'react';
//import 'sass/projects/hermod/style.scss';
import { makeThemeSelect, Containers, Annotate } from 'stories/storybook-utils'
import makeData from 'seeders/makeData';
import Table from './index'
import DefaultFilter from './Filters/DefaultFilter'

export default Annotate({
      Concept: '',
      Default: ''
}, Containers('Table'));



export const SimpleList = () =>  {

    const data = useMemo(
        () => {
            return makeData(600);
        },
        []
    )
    const columns = React.useMemo(

        () => [
            {
                Header: 'Column 1',
                accessor: 'nom',
                filter:'text'
            },
            {
                Header: 'Column 2',
                accessor: 'prenom',
                filter:'fuzzyText'
            },
            {
                Header: 'Column 3',
                accessor: (row) => {

                    return row.nom + row.prenom;
                }
            },
        ],
        []
    )

    return (<Table  data={data} columns={columns}/>)
}