import BIARouter from "@/BIARouter"
import { Provider as ViewProvider, useViewProvider } from "@/Context/BIAViews"
import { Provider as TranslationProvider, useTranslation } from "@/Context/Translation"
import { Provider as CustomListProvider, useCustomList } from "@/Context/CustomList"
import { Provider as BackendProvider, useBackend } from "@/Context/Backend"
import { Provider as ListManagerProvider, useListManager } from "@/Context/ListManager"
import ConfirmDialog from "@/Components/ConfirmDialog"


import { ConfirmProvider, useConfirm } from "@karsegard/react-hooks";

import {useLocation} from 'wouter';

import Modal from '@/Components/Modal'
import Button from '@/Components/Form/Button'
import ErrorMessage from '@/Components/ErrorMessage'
import Loading from '@/Components/Loading'


import {Component as SearchFeature, Page as SearchPage} from '@/Features/Search'
import {Page as CreateSubjectFeature} from '@/Features/CreateSubject'

import {
    withBackend as searchWithBackend,
    withReduxModule as searchWithReduxModule,
    SearchReduxContainer,
    reduxModule as searchReduxModule,
} from '@/Containers/Search'


import Field from '@/Components/Form/Fields'
import Input from '@/Components/Form/Input'

import WelcomeScreen from '@/Features/WelcomeScreen'

import DatabaseImportFeature from '@/Features/Database'


import EditorFeature from '@/Features/Editor';
import AboutFeature from '@/Features/About';
import DatabaseSyncFeature from '@/Features/DatabaseSync';
import DatabaseExportFeature from '@/Features/DatabaseExport';
import PatientHeaderFeature from '@/Features/Editor/PatientHeader';
import MesureEditorFeature from '@/Features/Editor/Mesure';
import ListMesureFeature from '@/Features/Editor/ListMesure';

import ReduxEditor from '@/Containers/Editor';
import EditorWithBackend from '@/Containers/EditorWithBackend';

import ReduxEditorModule from '@/Redux/Editor';


import RangeFilterFeature from '@/Features/Filters/RangeFilter'
import SexFilterFeature from '@/Features/Filters/SexFilter'
import FieldFilterFeature from '@/Features/Filters/FieldFilter'

import {Page as ListManagerPage,Component as ListManagerFeature} from '@/Features/ListManager';


export {
    BIARouter,
    useLocation,
    DatabaseSyncFeature,
    DatabaseExportFeature,
    ViewProvider,
    TranslationProvider,
    CustomListProvider,
    BackendProvider,
    RangeFilterFeature,
    SexFilterFeature,
    FieldFilterFeature,
    useTranslation,
    useCustomList,
    useViewProvider,
    useBackend,

    ConfirmProvider, useConfirm , ConfirmDialog,

    Modal,
    Button,


    ErrorMessage,
    Loading,

    WelcomeScreen,


    searchWithBackend,
    searchWithReduxModule,
    searchReduxModule,
    SearchReduxContainer,
    SearchFeature,
    SearchPage,

    CreateSubjectFeature,

    Field,
    Input,


    EditorFeature,
    DatabaseImportFeature,
    PatientHeaderFeature,
    MesureEditorFeature,
    ListMesureFeature,

    ReduxEditor,
    ReduxEditorModule,
    EditorWithBackend,

    ListManagerProvider,useListManager,
    ListManagerPage,
    ListManagerFeature

    ,AboutFeature

}