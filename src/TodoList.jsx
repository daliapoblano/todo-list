//importing TodoListItem
import TodoListItem from "./TodoListItem";

//{/*extract from TodoList.jsx*/}
function TodoList({todoList, onCompleteTodo}){

    //filtering out completed todos 
    const filteredTodoList = todoList.filter(
        (todo) => !todo.isCompleted 
    );

    return (
        //ternary statement that will compare the todoList's length to 0 
        filteredTodoList.length === 0 ? (<p>Add todo above to get started</p>) : (
        <ul>
        {filteredTodoList.map(todo => (
           <TodoListItem key={todo.id} todo={todo} onCompleteTodo={onCompleteTodo} />))}
       </ul>
    ))}

export default TodoList;