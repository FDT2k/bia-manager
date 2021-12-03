import { bem, compose, withBaseClass } from '@karsegard/react-compose';
import {Grid} from '@karsegard/react-core-layout'


const [__base_class,element,modifier] = bem ('mesure-editor-grid-layout')

const MesureEditorGrid = compose(
    withBaseClass(__base_class),
)(Grid)


export default MesureEditorGrid;
