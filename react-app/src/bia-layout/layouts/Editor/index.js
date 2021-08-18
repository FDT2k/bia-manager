import { bem, compose, withBaseClass, withModifiers } from '@karsegard/react-compose';
import Grid from '../Grid';
import './style.scss';



const modifiers = [
    'r3c1',
    'r3c3'
]

const [__base_class,element,modifier] = bem ('editor-grid-layout')

const EditorGrid = compose(
    withBaseClass(__base_class),
    withModifiers(x => modifier(x), modifiers)
)(Grid)


export default EditorGrid;
