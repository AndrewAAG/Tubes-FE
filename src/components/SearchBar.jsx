import './SearchBar.css'

function SearchBar(){
    return <>
        <div class="searchbar-container">
            <input type="text" placeholder="Search by title or description..."/>

            <div class="dropdown-container">
            
                <label for="status-select" class="dropdown-label">Status:</label>
            
                <select id="status-select" class="dropdown-select">
                    <option value="all" selected>All</option>
                    <option value="not started">Not Started</option>
                    <option value="on going">On Going</option>
                    <option value="done">Done</option>
                </select>
                
            </div>

            <div class="dropdown-container">
            
                <label for="tag-select" class="dropdown-label">Tag:</label>
            
                <select id="tag-select" class="dropdown-select">
                    <option value="all" selected>All</option>
                    <option value="kuliah">Kuliah</option>
                    <option value="kerja">Kerja</option>
                    <option value="projecr">Project</option>
                </select>
                
            </div>

            <div class="dropdown-container">
            
                <label for="priority-select" class="dropdown-label">Priority:</label>
            
                <select id="priority-select" class="dropdown-select">
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