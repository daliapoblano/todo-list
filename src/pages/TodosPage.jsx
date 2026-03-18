import TodoForm from "../features/TodoForm";
import TodoList from "../features/TodoList/TodoList";
import TodosViewForm from "../features/TodosViewForm";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styles from "../App.module.css";

function TodosPage({todoState, addTodo, completeTodo, updateTodo, dispatch}){

    const {todoList,isSaving,isLoading,queryString,sortField,sortDirection} = todoState;
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const itemsPerPage = 15;
    const currentPage = parseInt(searchParams.get("page") || "1", 10);
    const indexOfFirstTodo = (currentPage - 1) * itemsPerPage;
    const filteredTodoList = todoList.filter((todo) => todo.isCompleted === false);
    const totalPages = Math.ceil(filteredTodoList.length / itemsPerPage);

    useEffect(() => {
        if (totalPages > 0) {
          if (
            isNaN(currentPage) ||
            currentPage < 1 ||
            currentPage > totalPages
          ) {
            navigate("/");
          }
        }
      }, [currentPage, totalPages, navigate]);
      
    function handlePreviousPage() {
        if (currentPage > 1) {
          setSearchParams({ page: currentPage - 1 });
        }
      }
      
      function handleNextPage() {
        if (currentPage < totalPages) {
          setSearchParams({ page: currentPage + 1 });
        }
      }
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
               currentPage={currentPage}
               totalPages={totalPages}
               indexOfFirstTodo={indexOfFirstTodo}
               itemsPerPage={itemsPerPage}
               handlePreviousPage={handlePreviousPage}
               handleNextPage={handleNextPage}
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