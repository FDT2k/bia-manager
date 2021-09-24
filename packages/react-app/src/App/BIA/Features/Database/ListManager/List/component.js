import { LayoutFlex, LayoutFlexColumn } from '@karsegard/react-core-layout';
import React from 'react';



export const Component =  props => {

    const {list,handleEdit} = props;
    return (<LayoutFlexColumn>
        {  
            list.map(item=> {
                return (<LayoutFlex key={item.id} justBetween>
                        <div>{item.name}</div> 
                        <div onClick={_=>handleEdit(item)}>editer</div> 
                    </LayoutFlex>)
            })
        }
    </LayoutFlexColumn>)
}

Component.defaultProps= {
    list:[
        {key: "genders", name: "genders",list:[], id: 1},
        {key: "physical_activity_rate", name: "physical_activity_rate", list: [], id: 2},
        {key: "pathological_groups", name: "pathological_groups", list: [], id: 12}
    ],
    handleEdit: id=>_=> console.warn('click handler not set')
}

export default Component;