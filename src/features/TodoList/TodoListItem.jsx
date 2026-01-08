import { useState } from "react";
import TextInputWithLabel from "../../shared/TextInputWithLabel";

//function that takes in a todo props 
function TodoListItem({todo, onCompleteTodo, onUpdateTodo})
{
     const [isEditing, setIsEditing] = useState(false);
     const [workingTitle, setWorkingTitle] = useState(todo.title);

     function handleUpdate(event) {
          if (!isEditing) return;
      
          event.preventDefault();
      
          onUpdateTodo({
            ...todo,
            title: workingTitle,
          });
      
          setIsEditing(false);
        }
      
     //todo title
     return (
     <li>
          <form onSubmit={handleUpdate}>
               <input
                    type = "checkbox"
                    checked = {todo.isCompleted}
                    onChange = {() => onCompleteTodo(todo.id)}
               />
            {isEditing ? (
               <>
               <TextInputWithLabel 
                    value={workingTitle} 
                    onChange={(event)=>
                    setWorkingTitle(event.target.value)
                  }
               />
               <button
                    type="button"
                    onClick={() => setIsEditing(false)}
               >
                 Cancel
               </button>

               <button
                    type="button"
                    onClick={handleUpdate}
               >
                 Update
               </button>
               </>
                   ) : (
                         <span onClick={() => setIsEditing(true)}>
                               {todo.title}
                         </span>
                 )}
          </form>
     </li>
     );
 }

//default export statement
export default TodoListItem;