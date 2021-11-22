import React from 'react'; 

import {CreateSubjectFeature, useCustomList,useBackend} from '@karsegard/react-bia-manager'
import {useHostProvider} from '@/Context/Host'

export default props => {
    const {lists,forms}= useCustomList();

    const {create_subject} = useBackend();
    const {add_error} = useHostProvider();



    const  handleSave = values => {
        Promise.resolve(create_subject(values))
        .then()
        .catch(add_error)
    };


    return <CreateSubjectFeature lists={lists} forms={forms.create_subject} handleSave={handleSave} />
}