import React, { useEffect, useRef, useState } from 'react'
import Button from '@/Components/Form/Button';
import { LayoutFlex, ModalComponent, Container, LayoutFlexColumn, Grid } from '@karsegard/react-core-layout'
import { useFieldValues } from '@karsegard/react-hooks';
import Field from '@/Components/Form/Fields';
import Modal from '@/Components/Modal';

import { bindSelectors, connect } from '@karsegard/react-redux'

import ErrorBoundary from '@/Components/ErrorBoundary'

import {
    selectors, actions

} from '../ListManager';

debugger;

export const ConnectCrudList = connect(
    bindSelectors(
        {
            list: selectors.list,
            filter: selectors.filter
        }),
    {
        fetch: actions.fetch,
        set_key: actions.set_key,
        edit: actions.edit,
        del: actions.del,
        set_filter: actions.set_filter,
        add: actions.add,

    })



export const ListCrudHOC = Component => props => {

    debugger;
    const [edited, setEdited] = useState(null)
    const [deleting, setDeleting] = useState(null)

    const { values, inputProps, replaceValues } = useFieldValues({ name: '' })


    const {
        list_key,
        getData,
        list, add, edit, fetch, del, sort,  //the actions
        filter, set_filter,
        cancel, save,
        ...rest } = props;

    useEffect(() => {
        debugger;
        getData(list_key).then(items => {
            debugger;

            fetch({ items });

        })
    }, [])

    const handleAdd = () => {
        let res = add({ id: '', name: '' })
        setEdited(res.payload);
    }


    const handleSave = (item) => {
        edit({ name: values.name, id: values.name, _id: edited._id });
        save();
        replaceValues({
            name: ''
        })
        setEdited(null);

    }

    const handleSort = (list) => {
        sort(list)


    }
    const handleDragStop = _ => {
        save()
    }

    const handleDelete = (item) => {
        del({ id: deleting._id });
        save();
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

    debugger
    return (<>
        <Grid templateColumns="auto" templateRows="auto 40px" contained cover >
            <Container contained scrollable>
                <ErrorBoundary>
                    <Component
                        data={list}
                        onSort={handleSort}
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
                                return (<button onClick={_ => handleAction('edit', row.original)} >Edit </button>)
                            }
                        }
                        ]}
                        enableDrag={true}



                        {...rest}
                    />

                </ErrorBoundary>
            </Container>
            <LayoutFlex justBetween>

                <Button onClick={
                    handleAdd
                }>Ajouter</Button>
                <LayoutFlex justAround>
                    <Button onClick={cancel}>Retour</Button>
                </LayoutFlex>

            </LayoutFlex>
        </Grid>
        <Modal visible={edited !== null} overlayOnClick={_ => setEdited(null)}>

            <LayoutFlexColumn>
                <Field className="field--one" label={'Valeur'}>
                    <input type="text" {...inputProps('name')} />
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
