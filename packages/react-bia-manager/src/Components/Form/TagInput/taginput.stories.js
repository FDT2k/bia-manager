
import React, { useEffect,useReducer,useMemo, useState, useRef } from 'react';
import { makeThemeSelect, Containers, Annotate } from 'stories/storybook-utils'
import makeData from 'seeders/makeData';
import TagInput from './index'
import Container from '@/bia-layout/containers/Container'
export default Annotate({
      Concept: '',
      Default: ''
}, Containers('Form/Fields/TagInput'));


const initialState =[];

function reducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...state,action.payload];

    default:
      throw new Error();
  }
}
export const Simple = () =>  {


    return (
    <Container style={{width:'500px', 'backgroundColor':'blue','padding':'10px'}}>
        <TagInput fields={['test','test2']}/>
    </Container>
    )
}


export const WithInitialTags = () =>  {


    const [events, dispatch] = useReducer(reducer, initialState);
    const handleChange = event=> _=> {
        console.log(event);
        dispatch({type:'add',payload:event});
    }
    return (
        <>
        <Container style={{width:'500px', 'backgroundColor':'blue','padding':'10px'}}>

            <TagInput tags={['hello','world']} handleAddTag={handleChange('add')} handleRemoveTag={handleChange('delete')}  handleChange={handleChange('change')} fields={['test','test2']}/>

        </Container>
        <ul>{
                events.map( event => <li>{event}</li>)
            }</ul>
        </>
    )
}
