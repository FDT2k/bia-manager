import { applyModifiers, bem, cEx, compose, divElement, withBaseClass } from '@karsegard/react-compose';
import { useFocus } from '@karsegard/react-hooks';
import { LayoutFlex } from '@karsegard/react-core-layout'

import React, { Children, cloneElement, useRef, useState } from 'react';


function makeTypeChecker(tabsRole) {
    return (element) => !!element.type && element.type.tabsRole === tabsRole;
}

export const isTab = makeTypeChecker('Tab');
export const isTabList = makeTypeChecker('TabList');
export const isTabPanel = makeTypeChecker('TabPanel');

function isTabChild(child) {
    return isTab(child) || isTabList(child) || isTabPanel(child);
}

export function deepMap(children, callback) {
    return Children.map(children, (child) => {

        if (child === null) return null;
        if (isTabChild(child)) {
            return callback(child);
        }
        if (
            child.props &&
            child.props.children &&
            typeof child.props.children === 'object'
        ) {
            // Clone the child that has children and map them too
            return cloneElement(child, {
                ...child.props,
                children: deepMap(child.props.children, callback),
            });
        }

        return child;
    });
}


const [main_class, element, modifier] = bem('tabs');

export const TabListWrapper = withBaseClass(element('wrapper'))(divElement);
export const TabListContainer = compose(
    withBaseClass(element('container')),
    applyModifiers({ alignCenter: true })
)(LayoutFlex);



export const TabListBackground = withBaseClass(element('background'))(props => {
    const { children, ...rest } = props;
    return (
        <div {...rest}><div className="bg" />{children}</div>
    )
});

export const TabList = withBaseClass(element('list'))(props => {
    const { children, selectedTab, ...rest } = props;
    return (
        <TabListWrapper>
            <TabListBackground />
            <TabListContainer>{children}</TabListContainer>
        </TabListWrapper>
    )
})
TabList.tabsRole = 'TabList';



export const Tab = withBaseClass(element('tab'))(props => {
    const { children, selected, className, selectedTab, handleFocus, BEM, ...rest } = props;
    const ref = useRef();
    const { hasFocus } = useFocus({ ref, handleOnFocus: handleFocus });
    const classe = cEx([
        className,
        _ => selected ? 'selected' : ''
    ])
    return (
        <div className={classe} {...rest} ref={ref}><div className="tab-content">{children}</div></div>
    )
})
Tab.tabsRole = 'Tab';



export const TabPanel = withBaseClass(element('panel'))(props => {
    const { children, idx, renderDisabledPanels, selectedTab, className, ...rest } = props;

    const classes = cEx([
        className,
        _ => selectedTab === idx ? 'active' : ''
    ])
    let display = ((selectedTab === idx) && !renderDisabledPanels) || (renderDisabledPanels);
    return (
        <>
            {display && <div className={classes} {...rest}>{children}</div>}
        </>
    )
})
TabPanel.tabsRole = 'TabPanel';

TabPanel.defaultProps = {
    renderDisabledPanels: true
}

export const Tabs = props => {

    const { children: _children, defaultTab, tabIndexOffset, renderDisabledPanels, style: existingStyle, ...rest } = props;


    const [hoverTab, setHoverTab] = useState(0);
    const [selectedTab, setSelectedTab] = useState(defaultTab);


    const style = {
        ...existingStyle,
        '--active-tab': `${selectedTab}`
    };

    const nodes = [];

    const handleMouseOver = idx => e => {
    }
    const handleMouseOut = idx => e => {
    }

    const handleFocus = idx => e => {

        setSelectedTab(idx);
    }

    const handleClick = idx => e => {
        setSelectedTab(idx)
    }

    let panelCount = 0;
    const callback = child => {

        if (isTabList(child)) {

            const { children: childChildren, ...childProps } = child.props
            let tabCount = 0;
            let clonedChild = cloneElement(child, {
                ...childProps,
                children: deepMap(childChildren, node => {
                    if (isTab(node)) {

                        let el = cloneElement(node, {
                            //    onClick:  handleClick(tabCount),
                            onMouseOver: handleMouseOver(tabCount),
                            onMouseOut: handleMouseOut(tabCount),
                            handleFocus: handleFocus(tabCount),
                            tabIndex: tabIndexOffset + tabCount,
                            selected: selectedTab == tabCount
                        });

                        tabCount++;
                        return el;
                    }

                    return cloneElement(node, node.props)
                })

            });

            return clonedChild

        } else if (isTabPanel(child)) {

            let el = cloneElement(child, {
                ...child.props,
                idx: panelCount,
                selectedTab,
                renderDisabledPanels
            });

            panelCount++;
            return el;

        } else {
            return child;
        }
    }

    const children = deepMap(_children, callback);

    return (<div style={style} {...rest}>{children}</div>)
}


Tabs.defaultProps = {
    tabIndexOffset: 0,
    renderDisabledPanels: false,
    defaultTab: 0
}

export default withBaseClass(main_class)(Tabs);
