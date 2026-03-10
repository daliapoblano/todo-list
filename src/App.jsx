import './App.css'
import styles from './App.module.css';
import { useState, useEffect, useCallback } from "react";
import { useReducer } from "react";
import TodosPage from "./pages/TodosPage";
import Header from "./shared/Header";
import { useLocation } from "react-router-dom";
import todosReducer, {
  actions as todosActions,
  initialState as initialTodosState,
} from "./reducers/todos.reducer";


const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`; 

function App() {
  //State value that will hold a new todo
  const [todoState, dispatch] = useReducer(todosReducer, initialTodosState);
  const location = useLocation();
  const [title, setTitle] = useState("Todo List");

  //changing route
  useEffect(() => {
    if (location.pathname === "/") {
      setTitle("Todo List");
    } else if (location.pathname === "/about") {
      setTitle("About");
    } else {
      setTitle("Not Found");
    }
  }, [location]);
  
  const encodeUrl = useCallback(() => {
    let sortQuery = `sort[0][field]=${todoState.sortField}&sort[0][direction]=${todoState.sortDirection}`;
    let searchQuery ="";

    if (todoState.queryString) {
      const encodedSearch = encodeURIComponent(todoState.queryString);
      searchQuery = `&filterByFormula=SEARCH("${encodedSearch}", {title})`;
    }
    return encodeURI(`${url}?${sortQuery}${searchQuery}`);
  }, [todoState.sortDirection,todoState.sortField,todoState.queryString]);

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
        throw new Error(`Request failed with status ${resp.status}`);
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
    }, [encodeUrl]);

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
        throw new Error(`Request failed with status ${resp.status}`);
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
        throw new Error(`Request failed with status ${resp.status}`);
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
      <Header title= {title} />
      <TodosPage
        todoState={todoState}
        addTodo={addTodo}
        completeTodo={completeTodo}
        updateTodo={updateTodo}
        dispatch={dispatch}
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
