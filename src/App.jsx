import './App.css'
//Importing TodoList 
import TodoList from './features/TodoList/TodoList'
//Importing TodoForm
import TodoForm from "./features/TodoForm";
//Importing useState hook
import { useState } from "react";
import { useEffect } from "react";

function App() {
  //State value that will hold a new todo
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage,setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  //fetching requests
  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);

      const options= {
        method:"GET",
        headers: {
          Authorization: token,
        },
    };

    try{
      const resp = await fetch(url, options);

      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      const data = await resp.json();
      
      const fetchedTodos = data.records.map((record) => {
        const todo = {
          id: record.id,
          ...record.fields,
        };

        if (!todo.isCompleted) {
          todo.isCompleted = false;
        }
  
        return todo;
      });
      setTodoList(fetchedTodos);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
    }
    fetchTodos();
    }, []);

  //addTodo handler function 
  const addTodo = async (newTodo) => {
    const payload = {
      records:[
        {
          fields:{
            title: newTodo.title,
            isCompleted: newTodo.isCompleted,
          },
        },
      ],
    };

    const options = {
      method: 'POST',
      headers:{
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    try{

      setIsSaving(true);
      const resp = await fetch(url, options);
      if (!resp.ok){
        throw new Error(resp.statusText);
      }
      const { records } = await resp.json();

      const savedTodo = {
        id:records[0].id,
        ...records[0].fields,
      };

      if (!records[0].fields.isCompleted) {
        savedTodo.isCompleted = false;
      }
      setTodoList([...todoList, savedTodo]);

    } catch (error){
      console.error(error);
      setErrorMessage(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  //helper function completeTodo
  const completeTodo = (id) => {
    const todoToComplete = todoList.find((todo) => todo.id === id);

    if(!todoToComplete) return;

    updateTodo({
      ...todoToComplete,
      isCompleted: true,
    });
  };

  //function loops through todos and matches edited versions to their original todo via id
  const updateTodo = async (editedTodo) =>{
    const originalTodo = todoList.find(
      (todo) => todo.id === editedTodo.id
    );

    //updating UI
    const updatedTodos = todoList.map((todo) => 
    todo.id === editedTodo.id ? editedTodo : todo);
    setTodoList(updatedTodos);

    const payload = {
      records: [
        {
          id: editedTodo.id,
          fields:{
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted,
          },
        },
      ],
    };

    const options ={
      method:"PATCH",
      headers:{
        Authorization:token,
        "Content-Type":"application/json",
      },
      body: JSON.stringify(payload),
    };

    try {
      setIsSaving(true);

      const resp = await fetch(url, options);
  
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(`${error.message}. Reverting todo...`);

      const revertedTodos = updatedTodos.map((todo)=> 
        todo.id === originalTodo.id ? originalTodo : todo);

      setTodoList([...revertedTodos]);
      } finally {
        setIsSaving(false);
      }
  };
  
  return (
    <div>
      <h1>My Todos</h1>
      {/* Adding instance of the TodoForm */}
      <TodoForm 
      onAddTodo = {addTodo}
      isSaving ={isSaving} 
      />
      {/* Adding instance of the TodoList  + passing the helper function */}
      <TodoList 
      todoList={todoList}
      onCompleteTodo={completeTodo}
      onUpdateTodo={updateTodo}
      isLoading={isLoading}
      isSaving={isSaving}
      />
      {/* Error message display */}
      {errorMessage && (
      <div>
        <hr />
        <p>{errorMessage}</p>
        <button onClick={() => setErrorMessage("")}>
          Dismiss
        </button>
      </div>
    )}
    </div>
  )
}

export default App;
