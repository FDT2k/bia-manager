
import React,{useEffect,useState,useRef} from 'react';
//import 'sass/projects/hermod/style.scss';
import {makeThemeSelect,Containers,Annotate} from 'stories/storybook-utils'

import Fullscreen from './index.js'


export default Annotate({
  Concept:'Creates a block that is the size of the view port. This should work on desktop && mobile seamlessly',
  Default: 'The red area should cover all the viewport. \n Available modifiers: - overflowY'
},Containers('Fullscreen'));


export const Simple = () => (
      <Fullscreen style={{backgroundColor:'red'}}>
         The red screen should cover all the visible area with no scrollbar
      </Fullscreen>
);


export const Overflow = () => (
      <Fullscreen style={{backgroundColor:'red'}} overflowY>
         The red screen should cover all the visible area with a scrollbar
      </Fullscreen>
);


export const OverflowAuto = () => (
      <Fullscreen style={{backgroundColor:'red'}} overflow>
         The red screen should cover all the visible area with a scrollbar
      </Fullscreen>
);

