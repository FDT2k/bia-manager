import Component from './component';
import Container from './hoc';

import connect from './connect';

export default connect(Container(Component))