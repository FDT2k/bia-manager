import React, { useEffect, useRef, useState } from 'react'
import Button from '@/bia-layout/components/Form/Button';
import { LayoutFlex, ModalComponent, Container, LayoutFlexColumn,Grid } from '@karsegard/react-core-layout'
import { useFieldValues } from '@karsegard/react-hooks';
import Field from '@/bia-layout/components/Form/Fields';
import Modal from '@/App/Components/Modal';

export default Component => props => {

    const [edited, setEdited] = useState(null)
    const [deleting, setDeleting] = useState(null)

    const { values, inputProps, replaceValues } = useFieldValues({ name: '' })


    const {
        list_key,
        list, add, edit, fetch, del,sort,  //the actions
        filter, set_filter,
        cancel, save,
        ...rest } = props;

    useEffect(() => {

        fetch(list_key);
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



    return (<>
        <Grid templateColumns="auto" templateRows="auto 40px" contained cover >
            <Container contained scrollable>
                <Component
                    data={list}
                    onSort={handleSort}
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
                        Cell: ({row}) => {
                        return (<button onClick={_=>handleAction('edit',row.original)} >Edit </button>)
                        }
                    }
                    ]}
                    enableDrag={true}



                    {...rest}
                />


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
