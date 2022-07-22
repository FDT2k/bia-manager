import { LayoutFlex, LayoutFlexColumn } from '@karsegard/react-core-layout';
import React from 'react';
import { useListManager } from '@/Context/ListManager';
import { useTranslation} from '@'


export const Component = props => {
    const {lists,handlers:{editList} } = useListManager();
    const {t} = useTranslation();
    return (<LayoutFlexColumn>

        {lists.length === 0 && <div>{t('no element')}</div>}
        {
            lists.map(item => {
                return (<LayoutFlex key={item.id} justBetween>
                    <div>{item.name}</div>
                    <div style={{cursor:'pointer'}} onClick={_ => editList(item)}>{t('Edit')}</div>
                </LayoutFlex>)
            })
        }
    </LayoutFlexColumn>)
}


export default Component;