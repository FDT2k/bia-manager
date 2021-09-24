import { LayoutFlex, LayoutFlexColumn } from '@karsegard/react-core-layout';
import React from 'react';



export const Component = props => {

    const { list, cancel, save,set_filter,filter } = props;
    return (<LayoutFlexColumn>
        <input type="text" name="filter" onChange={e=> set_filter(e.target.value)} value={filter}/>
        {
            list.map(item => {
                return <LayoutFlex justBetween>
                    <div>{item.name}</div>
                    <LayoutFlex>
                        <div>edit</div>
                        <div>del</div>
                    </LayoutFlex>
                </LayoutFlex>
            })
        }
        <button onClick={cancel}>cancel</button>
    </LayoutFlexColumn>)
}

Component.defaultProps = {

}

export default Component;