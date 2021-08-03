import { render } from '@testing-library/react'
import React, { Children, cloneElement } from 'react'
import { bem, compose, kebabize,filterPropPresentIn, baseElement, applyModifiers, withVariables, withModifiers, wrapComponent, asideElement, divElement, withBaseClass, cEx,withBEMElement,withBEM,makeBEM } from 'bia-layout/utils'
import LayoutFlex from 'bia-layout/layouts/Flex';

import './style.scss'

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


const [main_class,element,modifier] = bem('tabs');

export const TabListWrapper = withBaseClass(element('wrapper'))(divElement);
export const TabListContainer = withBaseClass(element('container'))(LayoutFlex);
export const TabListBackground = withBaseClass(element('background'))(divElement);

export const TabList =  withBaseClass(element('list'))(props => {
    const {children, ...rest} = props;
    return (
        <TabListWrapper>
            <TabListBackground/>
            <TabListContainer>{children}</TabListContainer>
        </TabListWrapper>
    )
})
TabList.tabsRole= 'TabList';



export const Tab =  withBaseClass(element('tab'))(props => {
    const {children, ...rest} = props;
    return (
        <div {...rest}>{children}</div>
    )
})
Tab.tabsRole= 'Tab';



export const TabPanel  =  withBaseClass(element('panel'))(props => {
    const {children, ...rest} = props;
    return (
        <div {...rest}>{children}</div>
    )
})
TabPanel.tabsRole= 'TabPanel';



export const Tabs=  props => {

    const {children: _children , ...rest} = props;
    
    const nodes = [];

    const callback = child=> {
        if(isTabList(child)){

            const {children: childChildren, ...childProps} = child.props
            return  cloneElement(child,{
                ...childProps,
                children: deepMap(childChildren, node=> {
                    if(isTab(node)){
                        return cloneElement(node,{
                            onClick: _=> alert('hey')
                        })
                    }

                    return cloneElement(node,node.props)
                }) 

            });

        }else {

            return  cloneElement(child,{...child.props});

        }
    }

    const children = deepMap(_children,callback);
   
    return (<div {...rest}>{children}</div>)
}



export default withBaseClass(main_class)(Tabs);