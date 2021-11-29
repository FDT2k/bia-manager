import React, { createContext, useState, useContext, useEffect } from 'react';

import { compose, curry, identity, is_nil } from '@karsegard/composite-js';

import { oneDecimal, oneDecimalPct, twoDecimal, twoDecimalPct, dateSysToHuman, dateHumanToSys } from '@/references/format'

import { useStore, Modules, useSelector, useDispatch } from '@karsegard/react-redux'

import { useBackend } from '@'

export const Context = createContext({})

export const module_lists = Modules.FilterableCollection(state => state.lists, `lists`, { default_key: '_id' })
export const module = Modules.FilterableCollection(state => state.list, `list`, { default_key: '_id' })



export const withReduxModule = Component => ({ children, ...rest }) => {
    const store = useStore();
    store.manager.addModule(module);
    store.manager.addModule(module_lists);

    return <Component {...rest} module={module} module_lists={module_lists}>{children}</Component>

}

export const makeProvider = (Context) => withReduxModule((props) => {
    const { children, handlers: _handlers, module, module_lists } = props;
    const { fetch_lists, fetch_list } = useBackend();
    const [editedList, setEditedList] = useState(null);


    const dispatch = useDispatch();

    useEffect(() => {
        fetch_lists().then(res => {
            dispatch(module_lists.actions.fetch({ items: res }))
        })
    }, [])

    useEffect(() => {
        fetch_list(editedList).then(res => {
            dispatch(module.actions.fetch({ items: res }))
        })
    }, [editedList])

    const editList = (list) => {
        setEditedList(list.key)
    }

    const cancelEdit = _ => {
        setEditedList(null)
    }
    
    const sortList = list => {
        dispatch(module.actions.fetch({ items: list }))
    }
    const saveList = () => {
        debugger;
    }

    const saveListItem = (item, values) => {
        debugger;

        if (item.id) {
            dispatch(module.actions.edit({ ...item, ...values }))
        }else{
            dispatch(module.actions.add({ ...item, ...values }))
        }
    }
    const deleteListItem = (item) => {
        dispatch(module.actions.del({id:item._id}))
        debugger;
    }
    const defaultHandlers = {
        saveList: _ => console.warn('save_list'),
        editList,
        cancelEdit,
        sortList,
        saveList,
        saveListItem,
        deleteListItem
    };


    const lists = useSelector(module_lists.selectors.list)
    const list = useSelector(module.selectors.list)


    let handlers = Object.assign({}, defaultHandlers, _handlers)


    let value = {
        handlers: defaultHandlers,
        lists,
        list,
        editedList,
    }
    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
})


export const makeUse = Context => _ => {
    const context = useContext(Context);
    if (is_nil(context)) {
        throw new Error('useListManager must be used within a provider');
    }
    return context;
}


export const Provider = makeProvider(Context);

export const useListManager = makeUse(Context);





