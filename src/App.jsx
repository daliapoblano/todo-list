import './App.css'
import styles from './App.module.css';
//Importing TodoList 
import TodoList from './features/TodoList/TodoList'
//Importing TodoForm
import TodoForm from "./features/TodoForm";
//Importing TodosViewForm 
import TodosViewForm from "./features/TodosViewForm";
//Importing useState hook
import { useState, useEffect, useCallback } from "react";
import reducer, { initialState, actions } from "./reducers/todos.reducer";
import { useReducer } from "react";


const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`; 

function App() {
  //State value that will hold a new todo
  const [sortField, setSortField] = useState("createdTime");
  const [sortDirection, setSortDirection] = useState("desc");
  const [queryString, setQueryString] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const encodeUrl = useCallback(() => {
    let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
    return encodeURI(`${url}?${sortQuery}`);
  }, [sortDirection,sortField]);

  //fetching requests
  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  useEffect(() => {
    const fetchTodos = async () => {
      dispatch({type:actions.fetchTodos});

      const options= {
        method:"GET",
        headers: {
          Authorization: token,
        },
    };

    try{
      const encodedUrl = encodeUrl();
      const resp = await fetch(encodedUrl, options);

      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      const data = await resp.json();

      dispatch({
        type: actions.loadTodos,
        records: data.records,
      });

    } catch (error) {
      dispatch({
        type: actions.setLoadError,
        error: error,
      });
    } 
  };
      fetchTodos();
    }, [sortField,sortDirection]);

  //addTodo handler function 
  const addTodo = async (newTodo) => {
    dispatch({ type: actions.startRequest });

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
      const resp = await fetch(url,options);

      if(!resp.ok){
        throw new Error(resp.statusText);
      }

      const data = await resp.json();

      dispatch({
        type: actions.addTodo,
        record: data.records[0],
      });
    } catch (error){
      dispatch({
        type: actions.setLoadError,
        error: error,
      });
    }  
  };

  //helper function completeTodo
  const completeTodo = (id) => {
    const todoToComplete = state.todoList.find((todo) => todo.id === id);

    if(!todoToComplete) return;

    updateTodo({
      ...todoToComplete,
      isCompleted: true,
    });
  };

  //function loops through todos and matches edited versions to their original todo via id
  const updateTodo = async (editedTodo) =>{
    const originalTodo = state.todoList.find(
      (todo) => todo.id === editedTodo.id
    );

    //updating UI
    const updatedTodos = state.todoList.map((todo) => 
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
    <div className={styles.appContainer}>
      <h1>My Todos</h1>
      {/* Adding instance of the TodoForm */}
      <TodoForm 
      onAddTodo = {addTodo}
      isSaving ={state.isSaving} 
      />
      {/* Adding instance of the TodoList  + passing the helper function */}
      <TodoList 
      todoList={state.todoList}
      onCompleteTodo={completeTodo}
      onUpdateTodo={updateTodo}
      isLoading={state.isLoading}
      isSaving={state.isSaving}
      />
      <TodosViewForm queryString={queryString}/>
      {/* Error message display */}
      {state.errorMessage && (
      <div className={styles.errorBox}>
        <hr />
        <p>{state.errorMessage}</p>
        <button onClick={() => dispatch({ type: actions.clearError })}>
          Dismiss
        </button>
      </div>
    )}
    </div>
  )
}

export default App;
