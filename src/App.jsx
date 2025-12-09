import './App.css'
//Importing TodoList 
import TodoList from './TodoList'
//Importing TodoForm
import TodoForm from "./TodoForm";
//Importing useState hook
import { useState } from "react";

function App() {
  //State value that will hold a new todo
  const [newTodo, setNewTodo] = useState("initialValue");
  return (
    <div>
      <h1>My Todos</h1>
      {/* Adding instance of the TodoForm */}
      <TodoForm />
      {/*paragraph */}
      <p>{newTodo}</p>
      {/* Adding instance of the TodoList */}
      <TodoList />
    </div>
  )
}

export default App
