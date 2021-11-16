import Container from "./container";
import Component from "./component";
import {ConnectLoading as connect} from '@/Providers/Stores/ElectronApp';
import { compose } from "@karsegard/composite-js";


export default compose (connect,Container)(Component)
