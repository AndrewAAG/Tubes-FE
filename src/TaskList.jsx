import Navbar from "./components/Navbar"
import SearchBar from "./components/SearchBar"
import Task from "./components/Task"
import './TaskList.css'
function TaskList(){
    return <>
        <Navbar />
        
        <div class="tasklist-container">
            <div class="tasklist-header">
                <h1>Hello, Dummy!</h1>
                <button>+ Add New Task</button>
            </div>
            <SearchBar />
            <div class="tasklist-content">
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
            </div>
            <div class="pagination-container">
                <button>← Prev</button>
                <button>1</button>
                <button>2</button>
                <button>Next →</button>
            </div>
        </div>
    </>
}

export default TaskList