
import React, { useEffect, useState } from 'react';

import { Modal, Button } from '@karsegard/react-bia-manager';
import { LayoutFlexColumn, LayoutFlex } from '@karsegard/react-core-layout';

import { useForm, required_string } from '@karsegard/react-hooks';
import { useTranslation } from '@karsegard/react-bia-manager';
import { Field, Input } from '@karsegard/react-bia-manager'

export default ({ handleSubmit: _handleSubmit, handleCancel, visible }) => {


    const validate = (name, value, values) => {
        if (name === 'key_confirm') {
            if (value !== values.key) {
                return 'Passwords don\'t match';
            }
        }
        if (name === 'key') {
            return required_string(5, -1, value);
        }

        return true;
    }


    const { values, inputProps, defaultHandleError, formProps } = useForm({ key: '', key_confirm: '' }, { validate, onSubmit: _handleSubmit });
    const { t } = useTranslation();

    return (
        <>
            <Modal type="dialog" visible={visible}>
                    <form {...formProps}>
                <LayoutFlexColumn style={{ gap: '10px', maxWidth: '750px' }} justCenter alignCenter>
                        <h3>{t('Create a database//title')} </h3>
                        <LayoutFlexColumn style={{ gap: '10px',  }}>
                            <Field label={`${t('Type a password//create database')}:`}>
                                <Input autoFocus  {...inputProps('key')} type="password" />
                                {defaultHandleError('key')}
                            </Field>
                            <Field label={`${t('Password confirmation//create database')}:`}>
                                <Input  {...inputProps('key_confirm')} type="password" />
                                {defaultHandleError('key_confirm')}
                            </Field>
                        </LayoutFlexColumn>
                        <LayoutFlex style={{ gap: '10px' }}>
                            <Button className="btn--secondary" onClick={_ => handleCancel()}>{t('Cancel//create database')}</Button>
                            <Button type="submit">{t('Create//create database')}</Button>
                        </LayoutFlex>
                </LayoutFlexColumn>
                    </form>
            </Modal>
        </>
    )
}