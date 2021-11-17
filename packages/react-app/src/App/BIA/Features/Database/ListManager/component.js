import List from './List';
import ListCrud from './ListCrud';
import React, { useState } from 'react';



export const Component = props => {

    const [editedList, setEditedList] = useState(null);

    const handleEdit = item => {
        setEditedList(item.key);
    }


    const handleSave = () => {
        if (editedList) {
            props.save_list(editedList)
        }
    }

    return (<>
        {editedList == null && <List handleEdit={handleEdit} />}
        {editedList !== null && <ListCrud list_key={editedList} save={handleSave} cancel={_ => setEditedList(null)} />}
    </>)
}

Component.defaultProps = {

}

export default Component;