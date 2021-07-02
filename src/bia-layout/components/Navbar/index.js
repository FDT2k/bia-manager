import React from 'react';
import LayoutFlex from 'bia-layout/layouts/Flex'
import {compose,applyModifiers,withBaseClass} from 'bia-layout/utils';
import './style.scss';


const Headline = withBaseClass('navbar')
const Layout = applyModifiers({'justBetween':true,'alignCenter':true})
const enhance = compose(Layout,Headline)

export default enhance(LayoutFlex)
