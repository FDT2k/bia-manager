import { applyModifiers, compose, makeBEM, withBEM, withBEMElement, withBEMModifiers, withRemovedProps } from '@karsegard/react-compose';

import { LayoutFlex, LayoutFlexColumn } from '@karsegard/react-core-layout'
import React from 'react';
import { useTranslation } from '@';
import { dateSysToHuman, oneDecimal } from '@/references/format';



const ListItem = compose(
    withRemovedProps(['BEM']),
    applyModifiers({ 'alignCenter': true, 'justBetween': true })

)
    (LayoutFlex);

const HeaderListItem = withBEMElement('title')(ListItem)

const ItemListItem = compose(
    withBEMModifiers(['selected']),
    withBEMElement('item'),
)(ListItem)



export const Component = props => {

    const { handleCreateClick, handleItemListClick, title, data, renderActions, selectedIndex, itemLabelKey, BEM, className, ...rest } = props;
    const { t } = useTranslation();
    let mesures = data.filter(item => item.status != 'deleted');
    return (
        <LayoutFlexColumn className={className}>
            <HeaderListItem BEM={BEM}><b>{title}</b></HeaderListItem>
            {mesures.map((item, idx) => {

                return <ItemListItem
                    BEM={BEM}
                    key={idx}
                    selected={selectedIndex == idx}
                    onClick={_ => handleItemListClick(item, idx)}>
                    {dateSysToHuman(item[itemLabelKey])} {renderActions && renderActions(data, item, idx)}
                </ItemListItem>
            })}

            {(!mesures || mesures.length === 0) && <i>{t('aucune mesure')}</i>}
            {/**Peut être remplacé , simplement utiliser le onclick */}
            <ItemListItem BEM={BEM} selected={selectedIndex >= mesures.length} onClick={handleCreateClick}>{t('Créer')}</ItemListItem>
        </LayoutFlexColumn>
    )
}

Component.defaultProps = {
    data: [],
    itemLabelKey: 'date',
    selectedIndex: -1,

}

const enhance = compose(


    withBEM(makeBEM('list-mesure')),


)

export default enhance(Component);