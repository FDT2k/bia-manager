import { LayoutFlex, LayoutFlexColumn, Grid, Container } from '@karsegard/react-core-layout';
import React, { useState } from 'react';



export const Component = props => {
    const [value, setValue] = useState('');
    const [edited, setEdited] = useState(-1);
    const { list, edit, del, cancel, save, set_filter, filter } = props;
    return (<Grid contained templateRows="30px auto 30px" style={{ height: '100%' }}>
        <LayoutFlex><input type="text" placeholder="filtrer" name="filter" onChange={e => set_filter(e.target.value)} value={filter} /> <button onClick={cancel}>save list</button> <button onClick={cancel}>cancel</button></LayoutFlex>
        <Container contained scrollable>
            <LayoutFlexColumn>
                {
                    list.map((item, idx) => {
                        return <LayoutFlex key={idx} justBetween>
                            {edited != idx && item.name}
                            {edited == idx && <input type="text" onChange={e => setValue(e.target.value)} value={value} />}
                            <LayoutFlex>
                                {edited != idx && <div onClick={_ => {
                                    setValue(item.name)
                                    setEdited(idx)

                                }} >edit</div>}
                                {edited == idx && <div onClick={_ => {
                                    edit({ name: value, id: item.id })
                                    setEdited(-1);
                                }}>save</div>}
                                <div onClick={_ => {
                                    if (confirm('sur?')) {
                                        del({ id: item.id })
                                    }
                                }}>del</div>
                            </LayoutFlex>
                        </LayoutFlex>
                    })
                }

            </LayoutFlexColumn>
        </Container>

    </Grid>)
}

Component.defaultProps = {

}

export default Component;