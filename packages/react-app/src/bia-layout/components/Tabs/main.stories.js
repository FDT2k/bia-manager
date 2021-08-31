
import React, { useEffect, useMemo, useState, useRef } from 'react';
import { makeThemeSelect, Containers, Annotate } from 'stories/storybook-utils'
import makeData from 'seeders/makeData';
import Tabs, { TabList, Tab,TabPanel } from './index'
import Container from '@/bia-layout/containers/Container'

import '@/bia-layout/sass/theme/default/main.scss'
export default Annotate({
    Concept: '',
    Default: ''
}, Containers('Navigation/Tabs'));



export const Simple = () => {
    return (
        <Tabs tabIndexOffset={10}>
            <TabList>
                <Tab>Super tartine</Tab>
                <Tab>HyperConcombre</Tab>
                <Tab>A</Tab>
                <Tab>A</Tab>
                <Tab>A</Tab>
            </TabList>
            <TabPanel> Tartine tombe toujours du mauvais coté  </TabPanel>
            <TabPanel> Concombre est le plus grand des héros  </TabPanel>
            <TabPanel> tab content  </TabPanel>
            <TabPanel> tab content  </TabPanel>
            <TabPanel> tab content  </TabPanel>
        </Tabs>
    )
}