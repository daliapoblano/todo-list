import { useState, useEffect } from "react";
import TextInputWithLabel from "../../shared/TextInputWithLabel";
import styles from "./TodoListItem.module.css";

//function that takes in a todo props
function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState("");

  // Keep local state in sync with todo from Airtable
  useEffect(() => {
    if (todo) setWorkingTitle(todo.title);
  }, [todo]);

  function handleUpdate(event) {
    event.preventDefault();

    onUpdateTodo({
      ...todo,
      title: workingTitle,
    });

    setIsEditing(false);
  }

  return (
    <li className={styles.listItem}>
      <form onSubmit={handleUpdate}>
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => onCompleteTodo(todo.id)}
        />

        {isEditing ? (
          <>
            <TextInputWithLabel
              value={workingTitle}
              onChange={(e) => setWorkingTitle(e.target.value)}
            />

            <button type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>

            <button type="submit">Update</button>
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







