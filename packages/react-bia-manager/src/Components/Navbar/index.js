import { applyModifiers, compose, withBaseClass } from '@karsegard/react-compose';

import {LayoutFlex} from '@karsegard/react-core-layout'



const Headline = withBaseClass('navbar')
const Layout = applyModifiers({'justBetween':true,'alignCenter':true})
const enhance = compose(Layout,Headline)




export default enhance(LayoutFlex)
