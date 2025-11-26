import './App.css'

function App() {
  const todos = [
    {id: 1, title: "Complete hw assingments on BlackBoard"},
    {id: 2, title: "Workout at Home"},
    {id: 3, title: "Review React Course Material"},
]
  return (
    <div>
      <h1>My Todos</h1>

      {/* Un-ordered list thaat maps the todo array to html that will render a list item per todo */}
      <ul>
        {todos.map(todo => <li key={todo.id}>{todo.title}</li>)}
      </ul>
    </div>
  )
}

export default App
