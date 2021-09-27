import Component from './component';
import Container from './hoc';
import {ListOperation} from '@karsegard/react-crud'

import connect from './connect';

export default connect(Container(ListOperation))