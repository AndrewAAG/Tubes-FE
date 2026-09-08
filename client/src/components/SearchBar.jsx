import '../css/SearchBar.css'
import { 
    searchQuery, setSearchQuery, 
    statusFilter, setStatusFilter, 
    tagFilter, setTagFilter, 
    priorityFilter, setPriorityFilter , uniqueTags
} from "../tasksStore.js"

function SearchBar(){
    return <>
        <div class="searchbar-container">
            <input type="text" placeholder="Search by title or description..." value={searchQuery()} onInput={(e)=>setSearchQuery(e.target.value)}/>

            <div class="dropdown-container">
            
                <label for="status-select" class="dropdown-label">Status:</label>
            
                <select id="status-select" class="dropdown-select" value={statusFilter()} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="all" selected>All</option>
                    <option value="not started">Not Started</option>
                    <option value="on going">On Going</option>
                    <option value="done">Done</option>
                </select>
                
            </div>

            <div class="dropdown-container">
            
                <label for="tag-select" class="dropdown-label">Tag:</label>
            
                <select id="tag-select" class="dropdown-select" value={tagFilter()} onChange={(e) => setTagFilter(e.target.value)}>
                    <option value="all" selected>All</option>
                    <For each={uniqueTags()}>
                        {(tag) => (
                            <option value={tag}>
                                {tag.charAt(0).toUpperCase() + tag.slice(1)}
                            </option>
                        )}
                    </For>
                </select>
                
            </div>

            <div class="dropdown-container">
            
                <label for="priority-select" class="dropdown-label">Priority:</label>
            
                <select id="priority-select" class="dropdown-select" value={priorityFilter()} onChange={(e) => setPriorityFilter(e.target.value)}>
                    <option value="all" selected>All</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                
            </div>
            
        </div>
    </>
}

export default SearchBar