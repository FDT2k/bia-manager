import BIARouter from "@/BIARouter"
import { Provider as ViewProvider, useViewProvider } from "@/Context/BIAViews"
import { Provider as TranslationProvider, useTranslation } from "@/Context/Translation"
import { Provider as CustomListProvider, useCustomList } from "@/Context/CustomList"
import { Provider as BackendProvider, useBackend } from "@/Context/Backend"

import {useLocation} from 'wouter';

import Modal from '@/Components/Modal'
import Button from '@/Components/Form/Button'
import ErrorMessage from '@/Components/ErrorMessage'
import Loading from '@/Components/Loading'


import {Component as SearchFeature, Page as SearchPage} from '@/Features/Search'

import {
    withBackend as searchWithBackend,
    withReduxModule as searchWithReduxModule,
    SearchReduxContainer
} from '@/Containers/Search'


import WelcomeScreen from '@/Features/WelcomeScreen'

export {
    BIARouter,
    useLocation,

    ViewProvider,
    TranslationProvider,
    CustomListProvider,
    BackendProvider,

    useTranslation,
    useCustomList,
    useViewProvider,
    useBackend,

    Modal,
    Button,


    ErrorMessage,
    Loading,

    WelcomeScreen,


    searchWithBackend,
    searchWithReduxModule,
    SearchReduxContainer,
    SearchFeature,
    SearchPage


}