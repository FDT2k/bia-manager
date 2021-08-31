import { Delete } from '@/bia-layout/components/Icons';
import Container from '@/bia-layout/containers/Container';
import Fullscreen from '@/bia-layout/containers/Fullscreen';
import LayoutFlex from '@/bia-layout/layouts/Flex';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add, del, selectDatabases } from '@/Stors/Databases';


export default props => {

    const dispatch = useDispatch();
    const databases = useSelector(selectDatabases);
    const _add = _ => {
        dispatch(add('test'))
    };
    return (
        <Fullscreen>
            <Container style={{ width: '200px',minHeight:'500px', 'backgroundColor': 'blue' }}>
                <h1> Database selection</h1>
                <LayoutFlex cover column>

                    {
                        databases.map(item => {
                            return <LayoutFlex justBetween key={item.uid}>
                                <div>{item.name}</div>
                                <button onClick={_ => dispatch(del({ uid: item.uid }))}><Delete /></button>
                            </LayoutFlex>
                        })
                    }
                    <LayoutFlex>
                        <button onClick={_add}>add</button>
                    </LayoutFlex>

                </LayoutFlex>
            </Container>
        </Fullscreen>
    )
}