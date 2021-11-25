import MainView from '@/Components/MainView';
import {Container,LayoutFlex, LayoutFlexColumn} from '@karsegard/react-core-layout'


import List from './List';
import ListCrud from './ListCrud';
import React, { useState } from 'react';



export const Component = props => {

    const {ListsManagerComponent,ListCrudComponent} = props
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
        {editedList == null && <ListsManagerComponent handleEdit={handleEdit} />}
        {editedList !== null && <ListCrudComponent list_key={editedList} save={handleSave} cancel={_ => setEditedList(null)} />}
    </>)
}

Component.defaultProps={
    ListsManagerComponent: List,
    ListCrudComponent: ListCrud
}





export const Page =  (props) => {
    const{ children,renderFooter, ...rest} = props;
    return (
        <MainView renderFooter={renderFooter} className="list-editor">
            <LayoutFlexColumn cover centered justBetween>
                <h1>Gestion des listes</h1>
                <Container style={{minWidth:'600px',minHeight:'500px'}}>
                   
                    {children}
                </Container>
            </LayoutFlexColumn>

        </MainView>
    )

}


export default props=>{

    return (<Page><Component/></Page>)
}