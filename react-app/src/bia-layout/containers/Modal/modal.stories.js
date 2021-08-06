import React, { useEffect, useState, useRef } from 'react';
import Modal from 'bia-layout/containers/Modal'
import Fullscreen from 'bia-layout/containers/Fullscreen'
import Container from 'bia-layout/containers/Container'
import Flex from 'bia-layout/layouts/Flex'
import {makeThemeSelect,Containers,Annotate} from 'stories/storybook-utils'



import { withKnobs, text, boolean, number, optionsKnob as options } from "@storybook/addon-knobs";

export default Annotate({
  Concept:'Creates a block that is the size of the view port. This should work on desktop && mobile seamlessly',
  Default: 'The red area should cover all the viewport. \n Available modifiers: - overflowY'
},Containers('Modal'));

export const S1FullScreen = () => {
  const fullscreen = options('size', {
    fullscreen: 'fullscreen',
    centered: 'centered',

  }, 'fullscreen', { display: 'radio' })
  return (

    <div className={makeThemeSelect()}>
      <Fullscreen>
        <Modal cover style={{ backgroundColor: 'red' }}>
          <Flex className="layout-flex--cover layout-flex--centered">
            <p style={{ textAlign: 'center' }}>this screen should cover all the visible area and I should be centered on the viewport</p>
          </Flex>
        </Modal>
      </Fullscreen>
    </div>

  );
}

export const S1DefaultFit = () => {
  const fullscreen = options('size', {
    fullscreen: 'fullscreen',
    centered: 'centered',

  }, 'fullscreen', { display: 'radio' })
  return (

    <div className={makeThemeSelect()}>
      <Fullscreen>
        <Modal style={{ backgroundColor: 'red' }}>
          <Flex className="layout-flex--cover layout-flex--centered">
            <p style={{ width:'100px', textAlign: 'center' }}>Modal should fit children by default</p>
          </Flex>
        </Modal>
      </Fullscreen>
    </div>

  );
}


export const S2AbsoluteFit = () => {
  const fullscreen = options('size', {
    fullscreen: 'fullscreen',
    centered: 'centered',

  }, 'fullscreen', { display: 'radio' })
  return (

    <div className={makeThemeSelect()}>
      <Fullscreen>
        <Modal fit style={{ backgroundColor: 'red' }}>
          <Flex className="layout-flex--cover layout-flex--centered">
            <p style={{ width:'100px', textAlign: 'center' }}>this screen should be on top and fitting this text</p>
          </Flex>
        </Modal>
      </Fullscreen>
    </div>

  );
}


export const S2RelativeFit = () => {
  const fullscreen = options('size', {
    fullscreen: 'fullscreen',
    centered: 'centered',

  }, 'fullscreen', { display: 'radio' })
  return (

    <div className={makeThemeSelect()}>
      <p> some disturbing stuff</p>
      <div style={{
        width:'200px;',
        height:'200px',
        backgroundColor:'blue'
      }}>
        <Modal relative fit style={{ backgroundColor: 'red' }}>
          <Flex className="layout-flex--cover layout-flex--centered">
            <p style={{ width:'100px', textAlign: 'center' }}>this screen should be on top and fitting this text</p>
          </Flex>
        </Modal>
      </div>
    </div>

  );
}


export const S3AbsoluteFitCentered = () => {
  const fullscreen = options('size', {
    fullscreen: 'fullscreen',
    centered: 'centered',

  }, 'fullscreen', { display: 'radio' })
  return (

    <div className={makeThemeSelect()}>
      <Fullscreen>
        <Modal fit centered style={{ backgroundColor: 'red' }}>
          <Flex className="layout-flex--cover layout-flex--centered">
            <p style={{  width:'100px',textAlign: 'center' }}>this screen should centered in viewport and fitting this text</p>
          </Flex>
        </Modal>
      </Fullscreen>
    </div>

  );
}


export const S3RelativeFitCentered = () => {
  const fullscreen = options('size', {
    fullscreen: 'fullscreen',
    centered: 'centered',

  }, 'fullscreen', { display: 'radio' })
  return (

    <div className={makeThemeSelect()}>
      <p> some disturbing stuff</p>
      <div style={{
        width:'200px;',
        height:'200px',
        backgroundColor:'blue'
      }}>
        <Modal fit  relative centered style={{ backgroundColor: 'red' }}>
          <Flex className="layout-flex--cover layout-flex--centered">
            <p style={{  width:'100px',textAlign: 'center' }}>this screen should centered in viewport and fitting this text</p>
          </Flex>
        </Modal>
      </div>
    </div>

  );
}

const LotOfStuff = _=> (
  <Flex className="layout-flex--cover layout-flex--centered layout-flex--list">
  <div><p style={{ textAlign: 'center' }}>...top...</p></div>
  <div><p style={{ textAlign: 'center' }}>...---...</p></div>
  <div><p style={{ textAlign: 'center' }}>...---...</p></div>
  <div><p style={{ textAlign: 'center' }}>...---...</p></div>
  <div><p style={{ textAlign: 'center' }}>...---...</p></div>
  <div><p style={{ textAlign: 'center' }}>...---...</p></div>
  <div><p style={{ textAlign: 'center' }}>...---...</p></div>
  <div><p style={{ textAlign: 'center' }}>...---...</p></div>
  <div><p style={{ textAlign: 'center' }}>...---...</p></div>
  <div><p style={{ textAlign: 'center' }}>...---...</p></div>
  <div><p style={{ textAlign: 'center' }}>This should scroll if</p></div>
  <div><p style={{ textAlign: 'center' }}>bigger</p></div>
  <div><p style={{ textAlign: 'center' }}>than viewport</p></div>
  <div><p style={{ textAlign: 'center' }}>...---...</p></div>
  <div><p style={{ textAlign: 'center' }}>...---...</p></div>
  <div><p style={{ textAlign: 'center' }}>...---...</p></div>
  <div><p style={{ textAlign: 'center' }}>...---...</p></div>
  <div><p style={{ textAlign: 'center' }}>...---...</p></div>
  <div><p style={{ textAlign: 'center' }}>...---...</p></div>
  <div><p style={{ textAlign: 'center' }}>...---...</p></div>
  <div><p style={{ textAlign: 'center' }}>...---...</p></div>
  <div><p style={{ textAlign: 'center' }}>...---...</p></div>
  <div><p style={{ textAlign: 'center' }}>...---...</p></div>
  <div><p style={{ textAlign: 'center' }}>...---...</p></div>
  <div><p style={{ textAlign: 'center' }}>...---...</p></div>
  <div><p style={{ textAlign: 'center' }}>...---...</p></div>
  <div><p style={{ textAlign: 'center' }}>...---...</p></div>
  <div><p style={{ textAlign: 'center' }}>...---...</p></div>
  <div><p style={{ textAlign: 'center' }}>...---...</p></div>
  <div><p style={{ textAlign: 'center' }}>...---...</p></div>
  <div><p style={{ textAlign: 'center' }}>...---...</p></div>
  <div><p style={{ textAlign: 'center' }}>...---...</p></div>
  <div><p style={{ textAlign: 'center' }}>...bottom...</p></div>
</Flex>
)

export const S4AbsoluteFitCenteredWithBigHeight = () => {
  const fullscreen = options('size', {
    fullscreen: 'fullscreen',
    centered: 'centered',

  }, 'fullscreen', { display: 'radio' })
  return (

    <div className={makeThemeSelect()}>
      <Fullscreen>
      hello world

        <Modal fit centered style={{ backgroundColor: 'red' }}>
          <LotOfStuff></LotOfStuff>
        </Modal>
      </Fullscreen>
    </div>

  );
}

export const S4AbsoluteScrollableContainedWithBigHeight = () => {
  const fullscreen = options('size', {
    fullscreen: 'fullscreen',
    centered: 'centered',

  }, 'fullscreen', { display: 'radio' })
  return (

    <div className={makeThemeSelect()}>
      <Fullscreen>
      hello world
      hello world
      hello world
      hello world
      hello world
      hello world
      hello world
      hello world
      hello world
      hello world
      hello world
      hello world
      hello world
      hello world
      hello world
      hello world
      hello world
      hello world
      hello world
      hello world
      hello world
      hello world
      hello world
      hello world
      hello world
      hello world
      hello world
      hello world
      hello world
      hello world

        <Modal centered contained scrollable style={{ backgroundColor: 'red' }}>
          <LotOfStuff></LotOfStuff>
        </Modal>
      </Fullscreen>
    </div>

  );
}

export const S4RelativeitCenteredWithBigHeight = () => {
  const fullscreen = options('size', {
    fullscreen: 'fullscreen',
    centered: 'centered',

  }, 'fullscreen', { display: 'radio' })
  return (
    <div>
    <p> some disturbing stuff</p>  <p> some disturbing stuff</p>
    <div className={makeThemeSelect()}>
       <Container style={{
        width:'200px;',
        height:'200px',
        backgroundColor:'blue'
      }}>
        <Modal relative fit centered style={{ backgroundColor: 'red' }}>
          <LotOfStuff></LotOfStuff>
        </Modal>
      </Container>
    </div>
    </div>
  );
}

export const Bottom = () => {
  const position = options('size', {
    bottom: 'bottom',
    centered: 'centered',
    hcenter: 'hcenter',
    vcenter: 'vcenter',

  }, [], { display: 'check' },'prout').reduce((carry,item)=>{
    carry[item]=true;
    return carry;
  },{});

  return (

    <div className={makeThemeSelect()}>
      <Fullscreen>
        
        <Modal fit {...position}   style={{ backgroundColor: 'red' }}>
          <Flex>
            <div><p style={{ textAlign: 'center' }}>...---...</p></div>
            <div><p style={{ textAlign: 'center' }}>...---...</p></div>
    
          </Flex>
        </Modal>
      </Fullscreen>
    </div>

  );
}
