
import React, { useEffect,useMemo, useState, useRef } from 'react';
import { makeThemeSelect, Containers, Annotate } from 'stories/storybook-utils'
import makeData from 'seeders/makeData';
import LayoutFlex from './index'
import Input from 'bia-layout/components/Form/Input';
import Label from 'bia-layout/components/Form/Label';
import Button from 'bia-layout/components/Form/Button';
import Container from 'bia-layout/containers/Container';
export default Annotate({
      Concept: '',
      Default: ''
}, Containers('Layouts/Flex'));



export const Defaut = () =>  {

    return (
        <Container style={{width:'500px'}}>
            <LayoutFlex column>
                    <LayoutFlex>
                        <Label>Login</Label>
                        <Input/>
                    </LayoutFlex>
                    <LayoutFlex>
                        <Label>Password</Label>
                        <Input/>
                    </LayoutFlex>
                    <LayoutFlex>
                        <Button/>
                    </LayoutFlex>
            </LayoutFlex>
        </Container>
    )
}

export const Centered = () =>  {

    return (
        <Container style={{width:'500px'}}>
            <LayoutFlex column justCenter>
                    <LayoutFlex column justBetween>
                        <Label>Login</Label>
                        <Input/>
                    </LayoutFlex>
                    <LayoutFlex column justBetween>
                        <Label>Password</Label>
                        <Input/>
                    </LayoutFlex>
                    <LayoutFlex justEnd>
                        <Button/>
                    </LayoutFlex>
            </LayoutFlex>
        </Container>
    )
}
