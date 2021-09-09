import { applyModifiers, compose, makeBEM, withBEM, withBEMElement, withBEMModifiers, withRemovedProps } from '@karsegard/react-compose';

import {LayoutFlex,LayoutFlexColumn} from '@karsegard/react-core-layout'
import Button from '@/bia-layout/components/Form/Button'
import React from 'react';


import './style.scss';


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
    const { handleCreateClick ,handleItemListClick, title, data, renderActions, selectedIndex, itemLabelKey, BEM, ...rest } = props;
    return (
        <LayoutFlexColumn {...rest}>
            <HeaderListItem BEM={BEM}><b>{title}</b></HeaderListItem>
            {data && data.map((item, idx) => {
                return <ItemListItem
                    BEM={BEM}
                    key={idx}
                    selected={selectedIndex == idx}
                    onClick={_ => handleItemListClick(item, idx)}>
                    {item[itemLabelKey]} {renderActions && renderActions(data, item, idx)}
                </ItemListItem>
            })}
            {(!data || data.length ===0) && <i>aucune mesure</i>}
            <ItemListItem  BEM={BEM}  selected={selectedIndex >= data.length} onClick={handleCreateClick}>Créer</ItemListItem>
        </LayoutFlexColumn>
    )
}

Component.defaultProps = {
    data: [],
    itemLabelKey: 'date',
    selectedIndex: -1
}


export default withBEM(makeBEM('list-mesure'))(Component);