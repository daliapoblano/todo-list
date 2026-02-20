import { useState, useEffect } from "react";
import styled from "styled-components";

function TodosViewForm({queryString, setQueryString, sortField, setSortField, sortDirection, setSortDirection}){
    const [localQueryString, setLocalQueryString] = useState(queryString);
    
    useEffect(() => {
        const debounce = setTimeout(() => {
            setQueryString(localQueryString);
        }, 500);

        return () => {
            clearTimeout(debounce);
        };
    }, [localQueryString, setQueryString]);

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
                    onChange={(e) => setSortField(e.target.value)}
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
                    onChange={(e) => setSortDirection(e.target.value)}
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