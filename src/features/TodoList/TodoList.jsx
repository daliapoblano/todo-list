//importing TodoListItem
import TodoListItem from "./TodoListItem";
import styles from "./TodoList.module.css";

//{/*extract from TodoList.jsx*/}
function TodoList({
    todoList, 
    onCompleteTodo, 
    onUpdateTodo, 
    isLoading, 
    isSaving,
    currentPage,
    totalPages,
    indexOfFirstTodo,
    itemsPerPage,
    handlePreviousPage,
    handleNextPage})
    {

    //evaluating for isLoading
    if (isLoading) {
        return <p>Todo list Loading...</p>;
      }

    //filtering out completed todos 
    const filteredTodoList = todoList.filter(
        (todo) => todo.isCompleted === false 
    );

    return (
        //ternary statement that will compare the todoList's length to 0 
        filteredTodoList.length === 0 ? (<p>Add todo above to get started</p>) : (
        <>
          <ul className={styles.list}>
           {filteredTodoList
            .slice(indexOfFirstTodo, indexOfFirstTodo + itemsPerPage)
            .map(todo => (
           <TodoListItem key={todo.id} todo={todo} onCompleteTodo={onCompleteTodo} onUpdateTodo={onUpdateTodo}/>))}
          </ul> 

       <div className={styles.paginationControls}>
          <button 
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          >Previous</button>
 
          <span>
            Page {currentPage} of {totalPages}
          </span>
 
          <button 
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          >Next</button>
      </div>
   </>
    )
  );
 }

export default TodoList;