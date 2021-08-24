import { is_nil } from '@karsegard/composite-js';
import React, { forwardRef } from 'react';

import SafeDatePicker from 'bia-layout/components/Form/DatePicker';

import EditableTextInput  from 'bia-layout/components/Form/Editable/TextInput'; 

SafeDatePicker.defaultProps={
    CustomInput: EditableTextInput
}

export default SafeDatePicker;