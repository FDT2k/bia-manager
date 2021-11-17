import { is_nil } from '@karsegard/composite-js';
import React, { forwardRef } from 'react';

import SafeDatePicker from '@/Components/Form/DatePicker';

import EditableTextInput  from '@/Components/Form/Editable/TextInput'; 



const Picker = props => {
    return <SafeDatePicker CustomInputComponent={<EditableTextInput/>} {...props}/>
}

export default Picker;