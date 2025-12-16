//importing TodoListItem
import TodoListItem from "./TodoListItem";

//{/*extract from TodoList.jsx*/}
function TodoList(){
    const todos = [
        {id: 1, title: "Complete hw assingments on BlackBoard"},
        {id: 2, title: "Workout at Home"},
        {id: 3, title: "Review React Course Material"},
    ]

    return (
        <ul>
        {todos.map(todo => (
           <TodoListItem key={todo.id} todo={todo} />))}
       </ul>
    )}

export default TodoList;