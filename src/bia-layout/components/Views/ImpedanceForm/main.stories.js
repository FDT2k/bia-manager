
import React, { useEffect,useMemo, useState, useRef } from 'react';
import { makeThemeSelect, Containers, Annotate } from 'stories/storybook-utils'
import makeData from 'seeders/makeData';
import {withBaseClass,withModifiers,withVariables,compose, bem,divElement} from 'bia-layout/utils'
import ImpedanceLayout from './index'
import Container from 'bia-layout/containers/Container';
import Input from 'bia-layout/components/Form/Input'
export default Annotate({
    Concept: '',
    Default: ''
}, Containers('ViewComponent/Impedance'));



const WithGridArea =  withVariables(
    x => `grid-area`,
    x => `${x}`,
    ['area']
);
const ComponentWithArea = compose(
    WithGridArea
)(divElement);

export const Defaut = () =>  {

    return (
        <ImpedanceLayout style={{backgroundColor:'#FF000088'}}>



        </ImpedanceLayout>
    )
}
