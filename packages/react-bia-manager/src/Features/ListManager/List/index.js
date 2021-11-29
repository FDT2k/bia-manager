import { LayoutFlex, LayoutFlexColumn } from '@karsegard/react-core-layout';
import React from 'react';
import { useListManager } from '@/Context/ListManager';



export const Component = props => {
    const {lists,handlers:{editList} } = useListManager();
    return (<LayoutFlexColumn>

        {lists.length === 0 && <div>aucun élément</div>}
        {
            lists.map(item => {
                return (<LayoutFlex key={item.id} justBetween>
                    <div>{item.name}</div>
                    <div onClick={_ => editList(item)}>editer</div>
                </LayoutFlex>)
            })
        }
    </LayoutFlexColumn>)
}


export default Component;