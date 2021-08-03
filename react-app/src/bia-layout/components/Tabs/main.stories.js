
import React, { useEffect, useMemo, useState, useRef } from 'react';
import { makeThemeSelect, Containers, Annotate } from 'stories/storybook-utils'
import makeData from 'seeders/makeData';
import Tabs, { TabList, Tab,TabPanel } from './index'
import Container from 'bia-layout/containers/Container'
export default Annotate({
    Concept: '',
    Default: ''
}, Containers('Navigation/Tabs'));



export const Simple = () => {
    return (
        <Tabs >
            <TabList>
                <Tab>A</Tab>
                <Tab>A</Tab>
                <Tab>A</Tab>
                <Tab>A</Tab>
                <Tab>A</Tab>
            </TabList>
            <TabPanel>
                tab content
            </TabPanel>
        </Tabs>
    )
}