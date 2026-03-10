import TodoForm from "../features/TodoForm";
import TodoList from "../features/TodoList/TodoList";
import TodosViewForm from "../features/TodosViewForm";
import { useSearchParams } from "react-router-dom";
import styles from "../App.module.css";

function TodosPage({todoState, addTodo, completeTodo, updateTodo, dispatch}){

    const {todoList,isSaving,isLoading,queryString,sortField,sortDirection} = todoState;
    const [searchParams, setSearchParams] = useSearchParams();
    const itemsPerPage = 15;
    const currentPage = parseInt(searchParams.get("page") || "1", 10);
    const indexOfFirstTodo = (currentPage - 1) * itemsPerPage;
    const totalPages = Math.ceil(filteredTodoList.length / itemsPerPage);

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