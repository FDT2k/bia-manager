import Container from "@/App/Electron/Loading/container";
import Component from "@/App/Electron/Loading/component";
import {ConnectLoading as connect} from '@/Providers/Stores/ElectronApp';
import { compose } from "@karsegard/composite-js";


export default compose (connect,Container)(Component)
