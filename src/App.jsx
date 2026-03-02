import './App.css'
import styles from './App.module.css';
import TodoList from './features/TodoList/TodoList'
import TodoForm from "./features/TodoForm";
import TodosViewForm from "./features/TodosViewForm";
import { useState, useEffect, useCallback } from "react";
import { useReducer } from "react";
import todosReducer, {
  actions as todosActions,
  initialState as initialTodosState,
} from "./reducers/todos.reducer";


const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`; 

function App() {
  //State value that will hold a new todo
  const [sortField, setSortField] = useState("createdTime");
  const [sortDirection, setSortDirection] = useState("desc");
  const [queryString, setQueryString] = useState("");
  const [todoState, dispatch] = useReducer(todosReducer, initialTodosState);
  
  const encodeUrl = useCallback(() => {
    let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
    let searchQuery ="";

    if (queryString) {
      const encodedSearch = encodeURIComponent(queryString);
      searchQuery = `&filterByFormula=SEARCH("${encodedSearch}", {title})`;
    }
    return encodeURI(`${url}?${sortQuery}${searchQuery}`);
  }, [sortDirection,sortField,queryString]);

  //fetching requests
  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  useEffect(() => {
    const fetchTodos = async () => {
      dispatch({type:todosActions.fetchTodos});

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
        type: todosActions.loadTodos,
        records: data.records,
      });

    } catch (error) {
      dispatch({
        type: todosActions.setLoadError,
        error: error,
      });
    } 
  };
      fetchTodos();
    }, [sortField,sortDirection,queryString]);

  //addTodo handler function 
  const addTodo = async (newTodo) => {
    dispatch({ type: todosActions.startRequest });

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
        type: todosActions.addTodo,
        record: data.records[0],
      });
    } catch (error){
      dispatch({
        type: todosActions.setLoadError,
        error: error,
      });
    }  
  };

  //helper function completeTodo
  const completeTodo = (id) => {
    dispatch({
      type: todosActions.completeTodo,
      id: id,
    });
  };

  //function loops through todos and matches edited versions to their original todo via id
  const updateTodo = async (editedTodo) =>{
    const originalTodo = todoState.todoList.find(
      (todo) => todo.id === editedTodo.id
    );

    //updating UI
    dispatch({
      type: todosActions.updateTodo,
      editedTodo: editedTodo,
    });

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
      dispatch({ type: todosActions.startRequest });

      const resp = await fetch(url, options);
  
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
    } catch (error) {
      dispatch({
        type: todosActions.revertTodo,
        editedTodo: originalTodo,
        error: error,
      });
      } finally {
        dispatch({ type: todosActions.endRequest });
      }
  };
  
  return (
    <div className={styles.appContainer}>
      <h1>My Todos</h1>
      {/* Adding instance of the TodoForm */}
      <TodoForm 
      onAddTodo = {addTodo}
      isSaving ={todoState.isSaving} 
      />
      {/* Adding instance of the TodoList  + passing the helper function */}
      <TodoList 
      todoList={todoState.todoList}
      onCompleteTodo={completeTodo}
      onUpdateTodo={updateTodo}
      isLoading={todoState.isLoading}
      isSaving={todoState.isSaving}
      />
      <TodosViewForm 
      queryString={queryString}
      setQueryString={setQueryString}
      sortField={sortField}
      setSortField={setSortField}
      sortDirection={sortDirection}
      setSortDirection={setSortDirection}
      />
      {/* Error message display */}
      {todoState.errorMessage && (
      <div className={styles.errorBox}>
        <hr />
        <p>{todoState.errorMessage}</p>
        <button onClick={() => dispatch({ type: todosActions.clearError })}>
          Dismiss
        </button>
      </div>
    )}
    </div>
  )
}

export default App;
