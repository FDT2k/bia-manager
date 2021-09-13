import Container from './container';

import Component from './component';
import connect from './connect';
import "react-datepicker/dist/react-datepicker.css";
//styles
import './page-editor.scss';

export default connect(Container(Component));