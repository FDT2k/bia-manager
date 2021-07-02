import React from 'react';

import { spreadObjectPresentIn, spreadObjectBeginWith, forwardPropsRemovingHeader } from '@geekagency/composite-js/ReactUtils'
import { curry, enlist,  compose } from '@geekagency/composite-js'
import {key} from '@geekagency/composite-js/ObjectUtils'
import { cEx } from '@geekagency/gen-classes'


const e = React.createElement;

const bem = main => {
    return (
        [
            main,
            block => `${main}__${block}`,
            modifier => `${main}--${modifier}`

        ])
}




export const makeBem = current => {
    return {
        current,
        make: {
            block: block => makeBem(`${current}-${block}`),
            element: element=> makeBem(`${current}__${element}`),
            modifier:modifier => makeBem(`${current}--${modifier}`)
        },
        block :block => `${current}-${block}`,
        modifier: modifier => `${current}--${modifier}`
    }
}

export const wrapComponent = Wrap => Component=> ({children,...rest}) => <Wrap {...rest}><Component>{children}</Component></Wrap>

export const divElement = ({ children, ...rest }) => <div {...rest}>{children}</div>
export const sectionElement = ({ children, ...rest }) => <section {...rest}>{children}</section>
export const asideElement = ({ children, ...rest }) => <aside {...rest}>{children}</aside>

export const baseElement = curry((_e,  {children,...rest}) => e(_e,rest,children) )

export const modifiersToCeX = (keyEnhancer, list, modifiers) => {
    return list.reduce((acc, item) => {
        const _type = typeof modifiers[item]
        acc[keyEnhancer(item,modifiers[item])] = _ => _type !== 'undefined' && modifiers[item]!==false ;
        return acc
    }, {})
}



export const withBaseClass = BaseClass => Component => props => {
    const { className, ...rest } = props;
    const classes = cEx([
        BaseClass,
        className
    ])
    return <Component {...rest} className={classes} />
}


export const withBem = bem => Component => props=>{
    const { className, ...rest } = props;
    const classes = cEx([
        bem.current,
        className
    ]);
    rest.parentBEM = bem;
 //   return <Component {...rest} parentBEM={bem} className={classes} />
    return <Component {...rest}  className={classes} />

}



export const withModifiers = (namer, modifiers) => Component => props => {
    const { className, ...rest } = props; //ensure to preserve classNames
    const [presentModifiers, _props] = spreadObjectPresentIn(modifiers, rest)
    const classes = cEx([
        className,
        modifiersToCeX(namer, modifiers, presentModifiers)
    ]);
    return <Component className={classes} {..._props}/>
}



export const reduceVariables = (keyEnhancer,valEnhancer, list, variables) => {
    return list.reduce((acc, item) => {
        if(typeof variables[item] !== 'undefined'){
            acc[keyEnhancer(item,variables[item])] = valEnhancer(variables[item]);
        }
        return acc
    }, {})
}



export const withVariables = (keyEnhancer,valEnhancer, variables) => Component => props => {
    const { style, ...rest } = props; //ensure to preserve styles
    const _style = style || {}

    const [presentVars, _props] = spreadObjectPresentIn(variables, rest)

    const styles = {
        ..._style,
        ...reduceVariables(keyEnhancer,valEnhancer, variables, presentVars)
    };


    return <Component style={styles} {..._props}/>
}



export const propsToCeX = (keyEnhancer, list, modifiers) => {
    return list.reduce((acc, item) => {
        if(modifiers[item]){
           acc.push( _=> keyEnhancer(modifiers[item]))
        }
        return acc
    }, [])
}

export const withTransformedProps = (namer, modifiers) => Component => props => {
    const { className, ...rest } = props; //ensure to preserve classNames
    const [presentModifiers, _props] = spreadObjectPresentIn(modifiers, rest)
   // console.error( enlist(presentModifiers),modifiers)
   //console.log(propsToCeX(namer,modifiers, presentModifiers))
    const classes = cEx([
        className,
        ...propsToCeX(namer, modifiers, presentModifiers)
    ]);

    return <Component className={classes} {..._props}/>
}

// apply modifiers if none of unless is present in props
export const applyModifiers = (modifiers,unless) => Component => props => {

    let _m ;

    if(unless && unless.length>0){
        let __m = {};
        let found = false;

        for(let prop of Object.keys(props)){
            if(unless.indexOf(prop) !==-1){
                found = true
            }
        }
        if(!found){
            _m = modifiers
        }
    }else{
        _m = modifiers
    }
    return <Component {..._m} {...props} />
}

const  makePropsFilter= (prefix)=> ([
    spreadObjectBeginWith(prefix),
    forwardPropsRemovingHeader(prefix)
])


export const kebabize = (str) => str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? "-" : "") + $.toLowerCase())
export const snakize = (str) => str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? "_" : "") + $.toLowerCase())
export const camelize = (text) => text.replace(/^([A-Z])|[\s-_]+(\w)/g, (_, p1, p2, __) =>  p2 ?  p2.toUpperCase() :  p1.toLowerCase());

export {
    spreadObjectBeginWith as filterPropStartingWith,
    spreadObjectPresentIn as filterPropPresentIn,
    forwardPropsRemovingHeader as forwardProps,
    bem,
    cEx,
    cEx as classNames,
    makePropsFilter
}


export { compose }
