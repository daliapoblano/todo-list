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
};

function reducer (state = initialState, action){
    switch(action.type){
        case actions.fetchTodos:
            return {
                ...state,
            };
        case actions.loadTodos:
            return{
                ...state,
            };
    }
}

export const initialState = {
    todoList: [],
    isLoading: false,
    isSaving: false,
    errorMessage:""
};
