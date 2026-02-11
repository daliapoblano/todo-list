import { useState, useEffect } from "react";
import styled from "styled-components";

const StyledForm = styled.form`
    display: flex;
    gap: 8px;
    margin-top:10px;
    `;
function TodosViewForm({queryString, setQueryString}){
    const [localQueryString, setLocalQueryString] = useState(queryString);
    
    useEffect(() => {
        const debounce = setTimeout(() => {
            setQueryString(localQueryString);
        }, 500);

        return () => {
            clearTimeout(debounce);
        };
    }, [localQueryString, setQueryString]);
    
    return (
        <StyledForm>
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
                    <select id="sortSelect">
                        <option value="title">Title</option>
                        <option value="createdTime">Time added</option>
                    </select>
                </label>

                <label className="labels">
                    Direction
                    <select id="directionSelect">
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </label>
            </div>
        </StyledForm>
    );
}

export default TodosViewForm;