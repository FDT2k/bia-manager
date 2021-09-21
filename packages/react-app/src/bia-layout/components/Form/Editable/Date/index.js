import { is_nil } from '@karsegard/composite-js';
import React, { forwardRef } from 'react';

import SafeDatePicker from '@/bia-layout/components/Form/DatePicker';

import EditableTextInput  from '@/bia-layout/components/Form/Editable/TextInput'; 



const Picker = props => {
    return <SafeDatePicker CustomInputComponent={<EditableTextInput/>} {...props}/>
}

export default Picker;