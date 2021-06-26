import React from 'react';
import DatabaseProvider from 'hooks/DatabaseProvider'
import List from 'components/List'
import { PouchDB, useFind, useDB } from "react-pouchdb";

import ImportData from 'components/DatabaseImport'
export default props => {
    
    return (
        <PouchDB name="bia_pouch">
            <>
                <List/>
                <ImportData/>
            </>
        </PouchDB>
    )



}