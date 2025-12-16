//importing useRef
import { useRef } from "react"

function TodoForm( {onAddTodo} ){
    //invoking useRef
    const todoTitleInput = useRef("")

    function handleAddTodo(event)
    {
        //this line prevents the page from refreshing when a user clicks the "Add Todo" button
        event.preventDefault()
        const title = event.target.title.value
        //invoking onAddTodo
        onAddTodo(title)
        //clearing the input field after user typed in it 
        event.target.title.value = ""

        todoTitleInput.current.focus()
    }
    return(
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Todo</label>
            <input id="todoTitle" type="text" name="title" ref={todoTitleInput}/>
            <button>Add Todo</button>
        </form>
    );
}

export default TodoForm;