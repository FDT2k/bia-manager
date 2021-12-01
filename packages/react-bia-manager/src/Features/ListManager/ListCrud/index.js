import React, { useState, useEffect } from 'react';
import { Table } from './table'
import { useListManager } from '@/Context/ListManager';
import { useFieldValues } from '@karsegard/react-hooks';
import { LayoutFlex, ModalComponent, Container, LayoutFlexColumn, Grid } from '@karsegard/react-core-layout'
import ErrorBoundary from '@/Components/ErrorBoundary'
import Button from '@/Components/Form/Button';
import Field from '@/Components/Form/Fields';
import Modal from '@/Components/Modal';
import Input from '@/Components/Form/Input';



import ToggleSwitch from '@/Components/Form/ToggleSwitch'



export const Component = props => {


    return (

        <Table

            columns={[{
                Header: 'name',
                accessor: 'name',
            },
            {
                id: 'actions',
                accessor: 'id',
                Cell: ({ row }) => {
                    return (<button onClick={_ => handleAction('edit', row.original)} >Edit </button>)
                }
            }
            ]}
 {...props} />
    )
}

const empty_list_item = {
    name:'',
    sort:'0',
    default_value:false
}

export const ListCrudHOC = Component => props => {
    const { list, handlers: { cancelEdit, sortList, saveList, saveListItem, deleteListItem,setFilter },list_filter } = useListManager();

    const [edited, setEdited] = useState(null)
    const [deleting, setDeleting] = useState(null)

    const { values, inputProps, replaceValues,handleChangeValue } = useFieldValues(empty_list_item)

    const handleAdd = () => {

        setEdited({ name: '' });
        replaceValues({
           ...empty_list_item
        })
    }


    const handleSave = (item) => {
        saveListItem(edited, values);
        saveList();
        replaceValues({
           ...empty_list_item
        })
        setEdited(null);

    }

    const handleDragStop = _ => {
        saveList()
    }

    const handleDelete = (item) => {
        deleteListItem(deleting);
        saveList();
        setDeleting(null)
    }

    const handleAction = (action, item) => {
        if (action == 'edit') {
            setEdited(item)
            replaceValues({
               ...Object.assign({},empty_list_item,item)
            })
        } else if (action == 'delete') {
            /*  if (confirm('sur?')) {
                  del({ id: item._id })
              }*/
            setDeleting(item);
        }
        console.log(action)
    }



    return (<>
        <Grid templateColumns="auto" templateRows="40px auto 40px" contained cover >
            <Input onChange={e=> setFilter(e.target.value)} value={list_filter}/>
            <Container contained scrollable>
                <ErrorBoundary>
                    <Component
                        data={list}
                        onSort={sortList}
                        handleDragStop={handleDragStop}
                        actions={[
                            { key: 'edit', label: 'Editer' },
                            { key: 'delete', label: 'Suprimmer' }
                        ]}
                        columns={[{
                            Header: 'name',
                            accessor: 'name',
                        },
                        {
                            Header: 'ordre',
                            accessor: 'sort',
                        },
                        {
                            Header: 'Par défaut',
                            accessor: (value) => {
                              return   value.default_value === true ? 'oui' : 'non'
                            },
                        },
                        {
                            id: 'actions',
                            accessor: 'id',
                            Cell: ({ row }) => {
                                return (<LayoutFlex justEvenly><a onClick={_ => handleAction('edit', row.original)} >Editer </a>
                                    <a onClick={_ => setDeleting(row.original)} > Supprimer </a></LayoutFlex>)
                            }
                        }
                        ]}



                    />

                </ErrorBoundary>
            </Container>
            <LayoutFlex justBetween>

                <Button onClick={
                    handleAdd
                }>Ajouter</Button>
                <LayoutFlex justAround>
                    <Button onClick={cancelEdit}>Retour</Button>
                </LayoutFlex>

            </LayoutFlex>
        </Grid>
        <Modal visible={edited !== null} overlayOnClick={_ => setEdited(null)}>

            <LayoutFlexColumn>
                <LayoutFlex>
                <Field className="field--one" label={'Valeur'}>
                    <input autoFocus type="text" {...inputProps('name')} />
                </Field>
                <Field className="field--one" label={'Ordre'}>
                    <input type="text" {...inputProps('sort')} />
                </Field>
               {/* <Field className="field--one" label={'Par defaut'}>
                <ToggleSwitch labelYes="Oui" labelNo="Non" checked={values.default_value}  onChange={e => handleChangeValue('default_value',e.target.checked)}/>
            </Field>*/}
</LayoutFlex>
                <LayoutFlex justEnd>

                    <Button onClick={handleSave}>Enregistrer</Button>

                </LayoutFlex>
            </LayoutFlexColumn>

        </Modal>

        <Modal visible={deleting !== null}>

            <LayoutFlexColumn>
                <h3>Etes vous sur de vouloir supprimer cet élément?</h3>
                <LayoutFlex justBetween>
                    <Button onClick={_ => handleDelete()}>oui</Button>
                    <Button onClick={_ => setDeleting(null)}>non</Button>
                </LayoutFlex>
            </LayoutFlexColumn>

        </Modal>
    </>)
}

export default ListCrudHOC(Component)