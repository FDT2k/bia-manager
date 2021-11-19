import React, { useEffect, useState, isValidElement, Fragment, cloneElement } from 'react';
import { useFileProvider } from '@/Context/File';
import { is_empty, is_nil } from '@karsegard/composite-js';


export const SQLite = props => { return <h1>sqlite</h1> }
export const Dexie = props => { return <h1>sqlite</h1> }
export const DefaultRoute = props => { return <h1>sqlite</h1> }


const flattenChildren = (children) => {
    return Array.isArray(children)
        ? [].concat(
            ...children.map((c) =>
                c && c.type === Fragment
                    ? flattenChildren(c.props.children)
                    : flattenChildren(c)
            )
        )
        : [children];
};


export const Component = ({ children }) => {
    const { selectors: { type } } = useFileProvider();
    console.log(type, flattenChildren(children))
    for (const element of flattenChildren(children)) {
        let match = 0;
        if (
            isValidElement(element)) {

            match = element.props.type
                ? [element.props.type === type, {}]
                : [true, {}];

            if (match[0]) {
                return cloneElement(element, { match });
            }
        }

    }

    return null;
}


export const FileTypeRoute = ({ match, children }) => {
    const [matches, params] = match

    console.log(matches)
    if (!matches) return null;

    return typeof children === "function" ? children(params) : children;
}


export default Component