
import React, { useEffect, useState, useRef } from 'react';
//import 'sass/projects/hermod/style.scss';
import { makeThemeSelect, Containers, Annotate } from 'stories/storybook-utils'

import Container from './index'


export default Annotate({
      Concept: 'Creates a block that is the size of the view port. This should work on desktop && mobile seamlessly',
      Default: 'The red area should cover all the viewport. \n Available modifiers: - overflowY'
}, Containers('Container'));


const Component = (props) => {
      const {initialText,...rest} = props;
      const [text, setText] = useState([initialText])
      return (
            <>
            <button onClick={_ => setText([...text, text[0]])}>more text</button>
                  <Container {...rest}>
                        {text}
                  </Container>
                  
            </>
      )
};

export const Idle = _=> (<Component initialText="Container is growing with the children content" 
            style={{ backgroundColor: 'red', width: '200px' }}
/>)

export const Fit = () =>  (<Component initialText="Container is growing with the children content"  fit
            style={{ backgroundColor: 'red', width: '200px' }}
/>)


export const Grow = () =>  (<Component initialText="Container is growing with the children content"  grow
            style={{ backgroundColor: 'red', width: '200px' }}
/>)


export const Scrollable = () =>  (<Component initialText="Container should grow until 300px, and then scroll"  scrollable
      style={{ backgroundColor: 'red', width: '200px',maxHeight:'300px' }}
/>)




export const Cover = () => (
      <Container style={{ backgroundColor: 'blue', width: '500px', height: '500px' }}>
            <Container cover style={{ backgroundColor: 'red' }}>
                  The red screen should cover all the visible area with no scrollbar
            </Container>
      </Container>
);



export const Contained = () => (
      <Container style={{ backgroundColor: 'blue', width: '200px', height: '200px' }}>
            <Container contained style={{ backgroundColor: 'red' }}>
                  The red screen should cover all the visible area with no scrollbar
                  The red screen should cover all the visible area with no scrollbar
                  The red screen should cover all the visible area with no scrollbar
                  The red screen should cover all the visible area with no scrollbar
                  The red screen should cover all the visible area with no scrollbar
                  The red screen should cover all the visible area with no scrollbar
                  The red screen should cover all the visible area with no scrollbar
                  The red screen should cover all the visible area with no scrollbar
                  The red screen should cover all the visible area with no scrollbar
                  The red screen should cover all the visible area with no scrollbar
                  The red screen should cover all the visible area with no scrollbar
                  The red screen should cover all the visible area with no scrollbar
                  The red screen should cover all the visible area with no scrollbar
                  The red screen should cover all the visible area with no scrollbar
                  The red screen should cover all the visible area with no scrollbar
                  The red screen should cover all the visible area with no scrollbar
                  The red screen should cover all the visible area with no scrollbar
                  The red screen should cover all the visible area with no scrollbar
                  The red screen should cover all the visible area with no scrollbar
                  The red screen should cover all the visible area with no scrollbar
                  The red screen should cover all the visible area with no scrollbar
                  The red screen should cover all the visible area with no scrollbar
                  The red screen should cover all the visible area with no scrollbar
                  The red screen should cover all the visible area with no scrollbar
                  The red screen should cover all the visible area with no scrollbar
                  The red screen should cover all the visible area with no scrollbar
                  The red screen should cover all the visible area with no scrollbar
                  The red screen should cover all the visible area with no scrollbar
                  The red screen should cover all the visible area with no scrollbar
                  The red screen should cover all the visible area with no scrollbar
                  The red screen should cover all the visible area with no scrollbar
                  The red screen should cover all the visible area with no scrollbar
                  The red screen should cover all the visible area with no scrollbar
                  The red screen should cover all the visible area with no scrollbar
                  The red screen should cover all the visible area with no scrollbar
                  The red screen should cover all the visible area with no scrollbar
                  The red screen should cover all the visible area with no scrollbar
                  The red screen should cover all the visible area with no scrollbar
                  The red screen should cover all the visible area with no scrollbar
                  The red screen should cover all the visible area with no scrollbar
                  The red screen should cover all the visible area with no scrollbar
                  The red screen should cover all the visible area with no scrollbar
                  The red screen should cover all the visible area with no scrollbar
                  The red screen should cover all the visible area with no scrollbar
                  The red screen should cover all the visible area with no scrollbar
                  The red screen should cover all the visible area with no scrollbar
            </Container>
      </Container>
);

