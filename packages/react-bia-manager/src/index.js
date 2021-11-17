import BIARouter from "@/BIARouter"
import {Provider as ViewProvider, useViewProvider} from "@/Context/BIAViews"
import {Provider as TranslationProvider, useTranslation} from "@/Context/Translation"

import '@karsegard/react-core-layout/dist/style.css'
import '@karsegard/bia-manager-theme/dist/style.css'

export {
    BIARouter,
    ViewProvider,
    useViewProvider,
    TranslationProvider,
    useTranslation
}