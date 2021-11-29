import React, { useState, useEffect } from 'react';
import { Table } from '@karsegard/react-crud'
import { useListManager } from '@/Context/ListManager';
import { useFieldValues } from '@karsegard/react-hooks';
import { LayoutFlex, ModalComponent, Container, LayoutFlexColumn, Grid } from '@karsegard/react-core-layout'
import ErrorBoundary from '@/Components/ErrorBoundary'
import Button from '@/Components/Form/Button';
import Field from '@/Components/Form/Fields';
import Modal from '@/Components/Modal';
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

            enableDrag={true} {...props} />
    )
}


export const ListCrudHOC = Component => props => {
    const { list, handlers: { cancelEdit, sortList, saveList, saveListItem, deleteListItem } } = useListManager();

    const [edited, setEdited] = useState(null)
    const [deleting, setDeleting] = useState(null)

    const { values, inputProps, replaceValues } = useFieldValues({ name: '' })

    const handleAdd = () => {

        setEdited({ name: '' });
        replaceValues({
            name: ''
        })
    }


    const handleSave = (item) => {
        saveListItem(edited, values);
        saveList();
        replaceValues({
            name: ''
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
                default_value: item.default_value || false,
                name: item.name
            })
        } else if (action == 'delete') {
            /*  if (confirm('sur?')) {
                  del({ id: item._id })
              }*/
            setDeleting(item);
        }
        console.log(action)
    }


    console.log(list);

    return (<>
        <Grid templateColumns="auto" templateRows="auto 40px" contained cover >
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
                            id: 'actions',
                            accessor: 'id',
                            Cell: ({ row }) => {
                                return (<><button onClick={_ => handleAction('edit', row.original)} >Edit </button>
                                    <button onClick={_ => setDeleting(row.original)} >Del </button></>)
                            }
                        }
                        ]}
                        enableDrag={true}



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
                <Field className="field--one" label={'Valeur'}>
                    <input autoFocus type="text" {...inputProps('name')} />
                </Field>

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