//{/*extract from TodoList.jsx*/}
function TodoList(){
    const todos = [
        {id: 1, title: "Complete hw assingments on BlackBoard"},
        {id: 2, title: "Workout at Home"},
        {id: 3, title: "Review React Course Material"},
    ]

    return (<ul>
    {todos.map(todo => <li key={todo.id}>{todo.title}</li>)}
  </ul>);
}

export default TodoList