import TodoForm from "../features/TodoForm";
import TodoList from "../features/TodoList/TodoList";
import TodosViewForm from "../features/TodosViewForm";
import styles from "../App.module.css";

function TodosPage({todoState, addTodo, completeTodo, updateTodo, dispatch}){

    const {todoList,isSaving,isLoading,queryString,sortField,sortDirection} = todoState;

    return (
        <div className={styles.appContainer}>
            <TodoForm
                onAddTodo={addTodo}
                isSaving={todoState.isSaving}
            />
            <TodoList
               todoList={todoState.todoList}
               onCompleteTodo={completeTodo}
               onUpdateTodo={updateTodo}
               isLoading={todoState.isLoading}
               isSaving={todoState.isSaving}
            />
            <TodosViewForm
                queryString={todoState.queryString}
                sortField={todoState.sortField}
                sortDirection={todoState.sortDirection}
                dispatch={dispatch}
            />
        </div>
    );
}

export default TodosPage;