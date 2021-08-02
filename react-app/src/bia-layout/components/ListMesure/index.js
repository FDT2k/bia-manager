import React from 'react';

import LayoutFlex,{LayoutFlexColumn} from 'bia-layout/layouts/Flex'
import { bem,compose, withModifiers,applyModifiers, withVariables, divElement, withBaseClass, getClasseNames,makeBEM,withBEM, withBEMElement,withBEMModifiers,cEx } from 'bia-layout/utils'
import { Components } from 'stories/storybook-utils';

const ListItem = applyModifiers({'alignCenter':true,'justBetween':true})(LayoutFlex);

const HeaderListItem = withBEMElement('title')(ListItem)

const ItemListItem = compose(
    withBEMModifiers(['selected']),
    withBEMElement('item'),
)(ListItem)



export const Component =  props => {
    const {handleClick,  title, data, renderActions, selectedIndex,itemLabelKey,BEM, ...rest} = props;

    return (
        <LayoutFlexColumn {...rest}>
            <HeaderListItem BEM={BEM}><b>{title}</b></HeaderListItem>

            {data && data.map( (item,idx)=> {
              
             
                return <ItemListItem 
                            BEM={BEM}
                            key={idx} 
                            selected={selectedIndex === idx }
                            onClick={_=>handleClick(item,idx)}>
                                {item[itemLabelKey]} {renderActions && renderActions(data,item,idx)}
                        </ItemListItem>
            })}
        </LayoutFlexColumn>
    )
}

Components.defaultProps= {
    data: [],
    itemLabelKey:'date',
    selectedIndex:-1

}


export default withBEM(makeBEM('list-mesure'))(Component);