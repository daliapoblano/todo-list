//importing useRef
import { useRef } from "react"

//importing useState
import { useState } from "react";

function TodoForm( {onAddTodo} ){
    //declaring useRef
    const todoTitleInput = useRef("")

    //created local state
    const [workingTodoTitle, setWorkingTodoTitle] = useState("");

    function handleAddTodo(event)
    {
        //this line prevents the page from refreshing when a user clicks the "Add Todo" button
        event.preventDefault()

        onAddTodo(workingTodoTitle);

        //reset input using state 
        setWorkingTodoTitle("");
    }
    return(
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Todo</label>
            <input 
               id="todoTitle" 
               type="text" 
               name="title" 
               value={workingTodoTitle} 
               onChange={(event) => setWorkingTodoTitle(event.target.value)}
            />
            <button disabled={workingTodoTitle === ""}>Add Todo</button>
        </form>
    );
}

export default TodoForm;