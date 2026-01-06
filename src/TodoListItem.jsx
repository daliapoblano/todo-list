//function that takes in a todo props 
function TodoListItem({todo, onCompleteTodo})
{
     //todo title
     return (
     <li>
          <form>
               <input
                    type = "checkbox"
                    checked = {todo.isCompleted}
                    onChange = {() => onCompleteTodo(todo.id)}
               />
            {todo.title}
          </form>
     </li>
     );
 }

//default export statement
export default TodoListItem;