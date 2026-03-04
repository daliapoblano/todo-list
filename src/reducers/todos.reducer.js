export const actions ={
    fetchTodos: 'fetchTodos',
    loadTodos: 'loadTodos',

    setLoadError:'setLoadError',

    startRequest: 'startRequest',
    addTodo: 'addTodo',
    endRequest: 'endRequest',

    updateTodo: 'updateTodo',
    completeTodo: 'completeTodo',

    revertTodo: 'revertTodo',

    clearError: 'clearError',

    setSortField: 'setSortField',
    setSortDirection: 'setSortDirection',
    setQueryString: 'setQueryString',
};

function reducer (state = initialState, action){
    switch(action.type){
        case actions.fetchTodos:
            return {
                ...state,
                isLoading: true
            };
        case actions.loadTodos:
            return{
                ...state,
                todoList: action.records.map((record)=> {
                    const todo ={
                        id: record.id,
                        ...record.fields,
                    };
                    if (!todo.isCompleted){
                        todo.isCompleted = false;
                    }
                    return todo;
                }),
                isLoading: false,
            };
        case actions.setLoadError:
            return{
                ...state,
                errorMessage: action.error.message,
                isLoading: false,
                isSaving: false,
            };
        case actions.startRequest:
            return{
                ...state,
                isSaving: true,
            };
        case actions.addTodo:
            const savedTodo ={
                id: action.record.id,
                ...action.record.fields,
            };
            if(!savedTodo.isCompleted){
                savedTodo.isCompleted = false;
            }
            return {
                ...state,
                todoList: [...state.todoList, savedTodo],
                isSaving: false,
            };
        case actions.revertTodo:
        case actions.updateTodo: {
            const updatedTodos = state.todoList.map((todo) => 
                todo.id === action.editedTodo.id
                   ? action.editedTodo
                   : todo 
            );
            const updatedState = {
                ...state,
                todoList: updatedTodos,
            };
            if(action.error){
                updatedState.errorMessage = action.error.message;
            }
            return updatedState;
        }
        case actions.completeTodo: {
            const updatedTodos = state.todoList.map((todo) =>
                todo.id === action.id
                ? {...todo, isCompleted: true }
                : todo
            );
            return {
                ...state,
                todoList: updatedTodos,
            };
        }
        case actions.endRequest:
            return{
                ...state,
                isLoading: false,
                isSaving: false,
            };
        case actions.clearError:
            return{
                ...state,
                errorMessage: "",
            };
        case actions.setSortField:
            return{
                ...state,
                sortField: action.value,
            };
        case actions.setSortDirection:
            return{
                ...state,
                sortDirection: action.value,
            };
        case actions.setQueryString:
            return{
                ...state,
                queryString: action.value,
            };
        default:
            return state;
    }
}

export const initialState = {
    todoList: [],
    isLoading: false,
    isSaving: false,
    errorMessage:"",
    sortField: "createdTime",
    sortDirection:"desc",
    queryString: "",
};

export default reducer;
