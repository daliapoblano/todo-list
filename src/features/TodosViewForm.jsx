import { useState } from "react";

function TodosViewForm({queryString}){
    const [localQueryString, setLocalQueryString] = useState(queryString);
    return (
        <form>
            <div>
                <label>
                    Search
                    <input
                        type="text"
                        value={localQueryString}
                        onChange={(e) => setLocalQueryString(e.target.value)}
                    />
                </label>

                <button
                        type="button"
                        onClick={() => setLocalQueryString(" ")}
                        >
                      Clear
                </button>

                <label>
                    Sort by
                    <select>
                        <option value="title">Title</option>
                        <option value="createdTime">Time added</option>
                    </select>
                </label>

                <label>
                    Direction
                    <select>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </label>
            </div>
        </form>
    );
}

export default TodosViewForm;