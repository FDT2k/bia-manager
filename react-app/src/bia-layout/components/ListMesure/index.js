import React from 'react';

import LayoutFlex,{LayoutFlexColumn} from 'bia-layout/layouts/Flex'
import { bem,compose, withModifiers,applyModifiers, withVariables, divElement, withBaseClass, getClasseNames,makeBEM,withBEM } from 'bia-layout/utils'
import { Components } from 'stories/storybook-utils';

const ListItem = applyModifiers({'alignCenter':true,'justBetween':true})(LayoutFlex);


export const Component =  props => {
    const {handleClick,  title, data, renderActions,itemLabelKey,BEM, ...rest} = props;
    console.log(BEM)
    return (
        <LayoutFlexColumn {...rest}>
            <ListItem className={BEM.element('title').current} ><b>{title}</b></ListItem>
            {data && data.map( (item,idx)=> {
                return <ListItem 
                            className={BEM.element('item').current} 
                            key={idx} 
                            onClick={_=>handleClick(item,idx)}>
                                {item[itemLabelKey]} {renderActions && renderActions(data,item,idx)}
                        </ListItem>
            })}
        </LayoutFlexColumn>
    )
}

Components.defaultProps= {
    data: [],
    itemLabelKey:'date'

}


export default withBEM(makeBEM('list-mesure'))(Component);