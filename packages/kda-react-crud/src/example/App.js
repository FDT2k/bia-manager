import React, { useState, Children, cloneElement, useEffect } from 'react';
import { Store, FilteredCrud as FilteredCrudModule } from './redux'

import { connect, bindSelectors } from '@karsegard/react-redux'
import { nanoid } from '@reduxjs/toolkit';

import { Container, LayoutFlex, LayoutFlexColumn, Fullscreen, Grid } from '@karsegard/react-core-layout';
import '@karsegard/react-core-layout/dist/index.css'

import { is_type_function, run_or_yield } from '@karsegard/composite-js'

import {ListOperation} from '@'
const randomColor = _ => "#" + ((1 << 24) * Math.random() | 0).toString(16);

const Tile = props => {

    return (

        <Container cover style={{ backgroundColor: randomColor() }}>
            <LayoutFlexColumn cover justCenter alignCenter>
                {props.children}
            </LayoutFlexColumn>
        </Container>
    )
}

const StdListOperation = Component => props => {
    const [editedId, setEditedId] = useState(null);


    const handleAction = (action, item) => { 
        if(action == 'edit'){
            setEditedId(item.id)
        }
        else{
            console.log(`${action} on ${item.id}`)
        }

    }
    const columns = [
        { accessor: 'id', className: 'helloworld' },
        { accessor: 'name', colTemplate: 'auto' , render: ({row})=> {
            return (<>
                {row.id ===editedId && <div><input type="text" value={row.name}/></div> }
                {row.id !==editedId &&  <div>{row.name}</div> }
                </>
                )
        }},
        { accessor: 'role' ,render: ({row})=> {
            return (<>
                {row.id ===editedId && <div><select><option>admin</option><option>user</option></select></div> }
                {row.id !==editedId && <div>{row.role}</div> }
                </>
                )
        }},
        { type: 'actions', render: ({row},{renderActions,renderAction}) => {
            return (<>
                {row.id === editedId && renderAction('save','Sauver')}
                {row.id !== editedId && renderActions()}
            </>)
        }}
    ];

    return (
        <Component handleAction={handleAction} 
        
        renderHeader={_=>{ return <input type="text" placeholder="filter"/>}}

        renderFooter={_=>{ return <><button>Nouveau</button> <button>retour</button></>}}
        
        columns={columns} 
        actions={[{ key: 'edit', label: 'Editer' }, { key: 'del', label: 'Delete' }]}
        list={[
            { id: 1, name: "Fabien", role: "admin" },
            { id: 2, name: "Hector", role: "admin" },
            { id: 3, name: "Jarvis" },
            { id: 4, name: "Tony" },
            { id: 1, name: "Fabien", role: "admin" },
            { id: 2, name: "Hector", role: "admin" },
            { id: 3, name: "Jarvis" },
            { id: 4, name: "Tony" },
            
           
        ]} />
    )

}
const MyCrud = connect(
    bindSelectors(FilteredCrudModule.selectors),
    FilteredCrudModule.actions

)(StdListOperation(ListOperation))

export default props => {

    return (
        <Store>
            <Fullscreen overflowY>
                <Tile>
                    <h1>Crud Editor</h1>
                    <Container style={{ width: '900px', height: '500px' }}>

                        <MyCrud />
                    </Container>
                </Tile>
        

            </Fullscreen>
        </Store>
    )
}