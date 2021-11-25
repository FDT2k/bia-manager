import { LayoutFlex, LayoutFlexColumn } from '@karsegard/react-core-layout';
import React from 'react';



export const Component = props => {

    const { list, handleEdit } = props;
    return (<LayoutFlexColumn>

        {list.length === 0 && <div>aucun élément</div>}
        {
            list.map(item => {
                return (<LayoutFlex key={item.id} justBetween>
                    <div>{item.name}</div>
                    <div onClick={_ => handleEdit(item)}>editer</div>
                </LayoutFlex>)
            })
        }
    </LayoutFlexColumn>)
}

Component.defaultProps = {
    list: [



    ],
    handleEdit: id => _ => console.warn('click handler not set')
}

export default Component;