import { bem, compose, withBaseClass } from '@karsegard/react-compose';
import {Grid} from '@karsegard/react-core-layout'

import './style.scss'



const [__base_class,element,modifier] = bem ('search-grid-layout')

const SearchGrid = compose(
    withBaseClass(__base_class),
)(Grid)


export default SearchGrid;
