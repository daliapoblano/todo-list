import './App.css'
//Importing TodoList 
import TodoList from './TodoList'
//Importing TodoForm
import TodoForm from "./TodoForm";

function App() {
  return (
    <div>
      <h1>My Todos</h1>
      {/* Adding instance of the TodoForm */}
      <TodoForm />
      {/* Adding instance of the TodoList */}
      <TodoList />
    </div>
  )
}

export default App
