//importing useState
import { useState } from "react";
import TextInputWithLabel from "../shared/TextInputWithLabel";
import styled from "styled-components";

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
        <StyledForm onSubmit={handleAddTodo}>
            <TextInputWithLabel 
               elementId="todoTitle" 
               labelText="Todo" 
               value={workingTodoTitle} 
               onChange={(event) => setWorkingTodoTitle(event.target.value)}
            />
            <StyledButton id="addTodoBtn" disabled={workingTodoTitle.trim() === ''}>{isSaving ? 'Saving...' : 'Add Todo'}</StyledButton>
        </StyledForm>
    );
}

export default TodoForm;

const StyledForm = styled.form`
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
    `;
const StyledButton = styled.button`
    padding: 6px 12px;
    &: disabled{
        font-style: italic;
    }`;