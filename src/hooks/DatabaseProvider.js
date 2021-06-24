import React from 'react';


import DatabaseContext from './DatabaseContext';

import createDatabase from './database';
export default props => {
    const { children, name  } = props;
    const db = createDatabase(name);
    return ( 
        <DatabaseContext.Provider value={db}>
            {React.Children.only(children)}
        </DatabaseContext.Provider>
    );
}