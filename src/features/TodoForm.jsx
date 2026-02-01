//importing useState
import { useState } from "react";

import TextInputWithLabel from "../shared/TextInputWithLabel";


function TodoForm( {onAddTodo, isSaving} ){
    //created local state
    const [workingTodoTitle, setWorkingTodoTitle] = useState("");

    function handleAddTodo(event)
    {
        //this line prevents the page from refreshing when a user clicks the "Add Todo" button
        event.preventDefault();

        onAddTodo({ title: workingTodoTitle.trim(), isCompleted: false });

        //reset input using state 
        setWorkingTodoTitle("");
    }
    return(
        <form onSubmit={handleAddTodo}>
            <TextInputWithLabel 
               elementId="todoTitle" 
               labelText="Todo" 
               value={workingTodoTitle} 
               onChange={(event) => setWorkingTodoTitle(event.target.value)}
            />
            <button disabled={workingTodoTitle.trim() === ''}>{isSaving ? 'Saving...' : 'Add Todo'}</button>
        </form>
    );
}

export default TodoForm;