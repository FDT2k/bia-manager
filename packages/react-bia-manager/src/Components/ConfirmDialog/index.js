import React, { useEffect } from 'react';
import Modal from '@/Components/Modal';
import { identity,enlist, is_nil, keys, is_type_function, is_type_object } from '@karsegard/composite-js';
import { keyval } from '@karsegard/composite-js/ObjectUtils';
import { LayoutFlexColumn, LayoutFlex } from '@karsegard/react-core-layout';
import Button from '@/Components/Form/Button';
import { useTranslation, useConfirm } from '@';
import { useFieldValues,useKeypress } from '@karsegard/react-hooks';


export const Component = props => {

    const {
        prompt = "",
        title = 'Confirm',
        okLabel = 'proceed',
        cancelLabel = 'cancel',
        isOpen = false,
        validateKey= 'Enter',
        cancelKey='Escape',
        proceed,
        fields,
        form,
        validate,
        cancel
    } = useConfirm();

    const validateKeyPressed = useKeypress(validateKey);
    const cancelKeyPressed = useKeypress(cancelKey);


    const { t } = useTranslation()

  

    const { values, inputProps,replaceValues } = useFieldValues(form || {},{usePath:true});

    useEffect(()=>{
        if(isOpen === true && validateKeyPressed === true){
            handleProceed();
        }else if(isOpen === true && cancelKeyPressed === true){
            handleCancel();
        }
    },[validateKeyPressed,cancelKeyPressed]);

    useEffect(()=>{
        replaceValues(form);
    },[form,fields])

   

    const handleProceed = _=> {



        let result = true ;

        if(is_type_object(values)){
            result = values;
        }
        

        if(is_type_function(validate)){
            if(validate(values) === true){
                proceed(result);
            }
        }else {
            proceed(result);
        }
            
        
    }

    const handleCancel = _=> {

        return cancel(false);
    }

    return (<>
        <Modal type="confirm" visible={isOpen}>
            <LayoutFlexColumn style={{ gap: '10px' }} justCenter alignCenter>
                <h2>{t(title)}</h2>
                {t(prompt)}
                <LayoutFlexColumn style={{ gap: '10px' }}>
                    {fields && fields.length > 0 && fields.map((field, idx) => {
                        return (<div className="field" key={idx}>
                            <label className="field__label">{field.label}</label>
                            <div className="field__field">
                                <input className="field" type={field.type} {...inputProps(field.name)} autoFocus={field.autoFocus|| false} />
                            </div>
                        </div>
                        )
                    })}
                </LayoutFlexColumn>
                <LayoutFlex style={{ gap: '10px' }}><Button onClick={handleProceed}>{t(okLabel)}</Button>
                    <Button onClick={handleCancel}>{t(cancelLabel)}</Button></LayoutFlex>
            </LayoutFlexColumn>
        </Modal>
    </>)

}

export default Component