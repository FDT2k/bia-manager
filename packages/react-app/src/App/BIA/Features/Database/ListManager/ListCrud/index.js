//import Component from './component';
import Container from './hoc';
import {ListOperation,Table} from '@karsegard/react-crud'

import connect from './connect';

export default connect(Container(Table))