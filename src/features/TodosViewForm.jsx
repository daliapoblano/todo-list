import { useState, useEffect } from "react";
import styled from "styled-components";
import { actions as todosActions } from "../reducers/todos.reducer";

function TodosViewForm({queryString, sortField, sortDirection, dispatch}){
    const [localQueryString, setLocalQueryString] = useState(queryString);
    
    useEffect(() => {
        setLocalQueryString(queryString);
      }, [queryString]);
    
    useEffect(() => {
        const debounce = setTimeout(() => {
            dispatch({
                type: todosActions.setQueryString,
                value: localQueryString,
            });
        }, 500);

        return () => {
            clearTimeout(debounce);
        };
    }, [localQueryString, dispatch]);

   function handleSubmit(e){
    e.preventDefault();
   }

    return (
        <StyledForm onSubmit={handleSubmit}>
            <div>
                <label className="labels">
                    Search
                    <input
                        type="text"
                        value={localQueryString}
                        onChange={(e) => setLocalQueryString(e.target.value)}
                    />
                </label>

                <button
                        id="clearBtn"
                        type="button"
                        onClick={() => setLocalQueryString("")}
                        >
                      Clear
                </button>

                <label className="labels">
                    Sort by
                    <select 
                    id="sortSelect"
                    value={sortField}
                    onChange={(e) => 
                        dispatch({
                            type: todosActions.setSortField,
                            value: e.target.value,
                        })
                    }
                    >
                        <option value="title">Title</option>
                        <option value="createdTime">Time added</option>
                    </select>
                </label>

                <label className="labels">
                    Direction
                    <select 
                    id="directionSelect"
                    value={sortDirection}
                    onChange={(e) => 
                        dispatch({
                            type: todosActions.setSortDirection,
                            value: e.target.value,
                        })
                    }
                    >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </label>
            </div>
        </StyledForm>
    );
}

export default TodosViewForm;

const StyledForm = styled.form`
    display: flex;
    gap: 8px;
    margin-top:10px;
    `;