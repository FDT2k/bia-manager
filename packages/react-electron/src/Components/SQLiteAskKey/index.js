
import React, { useEffect, useState } from 'react';

import { Modal, Button } from '@karsegard/react-bia-manager';
import { LayoutFlexColumn } from '@karsegard/react-core-layout';
import { useForm, required_string } from '@karsegard/react-hooks';
import { useTranslation } from '@karsegard/react-bia-manager';
import {Field,Input} from '@karsegard/react-bia-manager'

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
                    <h3>{t('Create a database//title')} </h3>
                    <LayoutFlexColumn>
                        <Field label={`${t('Type a password//create database')}:`}>
                             <Input autoFocus  {...inputProps('key')} type="password" />
                        {defaultHandleError('key')}
                        </Field>
                        <Field label={`${t('Password confirmation//create database')}:`}>
                        <Input  {...inputProps('key_confirm')} type="password" />
                        {defaultHandleError('key_confirm')}
                        </Field>
                    </LayoutFlexColumn>
                    <Button type="submit">{t('Create//create database')}</Button>
                    <Button onClick={_ => handleCancel()}>{t('Cancel//create database')}</Button>
                </form>
            </Modal>
        </>
    )
}