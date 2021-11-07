
export const createSubModules = getModule => {
    const { baseSelector, prefix } = getModule();

    const module = {}
    
   // module.myTodoList=TestModule(compose(state => state.todoList, baseSelector), `${prefix}_TODO_LIST`)
    
    return module
}


export default createSubModules;


