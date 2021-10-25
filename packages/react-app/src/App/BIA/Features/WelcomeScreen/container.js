import Modal from '@/App/Components/Modal';
import { LayoutFlex, LayoutFlexColumn } from '@karsegard/react-core-layout';
import Button from '@/bia-layout/components/Form/Button';
import React,{useState} from 'react';


export default Component => props => {
    const { open_file, start_loading, stop_loading, create_database } = props;

    const [warn,setWarn] = useState(false)
    const [dev ,setDev] = useState(false)

    const handleOpen = _ => {

        start_loading("Waiting on user confirmation");
        open_file(open)
            .then(result => {
                stop_loading()
                if (result) {
                    window.location.hash = '#/search'
                }

            })
            .catch(res => { stop_loading() });
    }

    const handleCreate = _ => {

        create_database().then(res => {
            debugger;
            window.location.hash = '#/search'
        }).catch(_=> alert('something went wrong'))
    }

    const handleConnect = _ => {
        setWarn(true);
    }

    return (<><Component handleOpenDatabase={handleOpen} handleCreateDatabase={handleCreate} handleConnect={handleConnect} />
        <Modal visible={warn} overlayOnClick={_=>setWarn(false)}>
            <LayoutFlexColumn justCenter alignCenter>
                <h1>Attention</h1>
                <p>Le mode réseau est a utiliser avec précaution. veillez à bien vérifier les réseaux auxquels vous vous connectez.</p>
                <LayoutFlex style={{width:'100%'}} justBetween>
                    <Button onClick={_=>setDev(true)}>Continuer</Button>
                    <Button onClick={_=>setWarn(false)}>Fermer</Button>
                </LayoutFlex>
            </LayoutFlexColumn>
        </Modal>

        <Modal visible={dev} overlayOnClick={_=>setDev(false)}>
            <LayoutFlexColumn justCenter alignCenter>
                <p>En developpement</p>
                <LayoutFlex style={{width:'100%'}} justBetween>
                    <Button onClick={_=>setDev(false)}>Fermer</Button>
                </LayoutFlex>
            </LayoutFlexColumn>
        </Modal>
    </>)
}

