import './App.css'
//Importing TodoList 
import TodoList from './TodoList'
//Importing TodoForm
import TodoForm from "./TodoForm";
//Importing useState hook
import { useState } from "react";

function App() {
  //State value that will hold a new todo
  const [todoList, setTodoList] = useState([]);

  //addTodo handler function
  function addTodo(title)
  {
    const newTodo = {
      title: title,
      id: Date.now()
    }
    setTodoList([...todoList, newTodo])
  }
  return (
    <div>
      <h1>My Todos</h1>
      {/* Adding instance of the TodoForm */}
      <TodoForm onAddTodo = {addTodo} />
      {/* Adding instance of the TodoList */}
      <TodoList todoList={todoList}/>
    </div>
  )
}

export default App
