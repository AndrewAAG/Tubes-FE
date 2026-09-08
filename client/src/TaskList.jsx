import Navbar from "./components/Navbar"
import SearchBar from "./components/SearchBar"
import Task from "./components/Task"
import TaskForm from "./components/TaskForm.jsx"
import './css/TaskList.css'
import { tasks, setTasks, searchQuery, statusFilter, tagFilter, priorityFilter, resetFilters , filteredTasks } from "./tasksStore.js"
import { user } from "./auth.js"
import { onMount , createSignal , createMemo , createEffect } from "solid-js"
import { unwrap } from "solid-js/store"

function TaskList(){
    const [currentPage, setCurrentPage] = createSignal(1);
    const [addForm, setAddForm] = createSignal(false);
    const [taskToEdit, setTaskToEdit] = createSignal(null);
    const pagePerHalaman = 5;

    onMount(() => {
        // Reset filter supaya kalo dari halaman calendar nge-filter terus pindah ke halaman ini, filternya ke reset
        resetFilters();
    });

    const filteredTasks = createMemo(() => {
        return tasks.filter((task) => {
            // Filter title / description
            const matchesSearch = 
                task.title?.toLowerCase().includes(searchQuery().toLowerCase()) || 
                task.description?.toLowerCase().includes(searchQuery().toLowerCase());

            // Filter status
            const matchesStatus = statusFilter() === "all" || task.status === statusFilter();

            // Filter tag
            const matchesTag = tagFilter() === "all" || task.tag === tagFilter();

            // Filter priority
            const matchesPriority = priorityFilter() === "all" || task.priority === priorityFilter();

            return matchesSearch && matchesStatus && matchesTag && matchesPriority;
        });
    });

    const paginatedTasks = createMemo(() => {
        const startIndex = (currentPage() - 1) * pagePerHalaman;
        const endIndex = startIndex + pagePerHalaman;
    
        return filteredTasks().slice(startIndex, endIndex);
    });

    const totalPages = createMemo(() => {
        return Math.ceil(filteredTasks().length / pagePerHalaman);
    });

    // Deteksi perubahan filter, kalau terjadi perubahan balikkan ke halaman 1. Supaya kalau user lagi di halaman 3 misalnya, terus filter, otomatis
    // dibalikkan ke halaman 1
    createEffect(() => {
        searchQuery(); statusFilter(); tagFilter(); priorityFilter(); 
        setCurrentPage(1); 
    });

    createEffect(() => {
        if (currentPage() > totalPages() && totalPages() > 0) {
            console.log(currentPage());
            console.log(totalPages());
            setCurrentPage(totalPages()); 
        }
    });

    const nextPage = () => {
        if (currentPage() < totalPages()) {
            setCurrentPage(currentPage() + 1);
        }
    };

    const prevPage = () => {
        if (currentPage() > 1) {
            setCurrentPage(currentPage() - 1);
        }
    };


    return <>
        <Navbar />
        
        <div class="tasklist-container">
            <div class="tasklist-header">
                <h1>Hello, {user()?.fullname}!</h1>
                <button onClick={() => setAddForm(true)}>+ Add New Task</button>
            </div>
            <SearchBar />
            <div class="tasklist-content">
                <For each={paginatedTasks()}>
                    {(task) => {
                        return (<Task task={task} editFunc={()=>setTaskToEdit(task)}/>);
                    }}
                </For>
            </div>
            <div class="pagination-container">
                <button onClick={prevPage} disabled={currentPage() === 1} >← Prev</button>
                <button>{currentPage()} / {totalPages() || 1}</button>
                <button onClick={nextPage} disabled={currentPage() === totalPages() || totalPages() === 0}>Next →</button>
            </div>
        </div>

        <Show when={addForm()}>
            <div class="modal-overlay" >
                <TaskForm close={() => setAddForm(false)} task={null}/>
            </div>
        </Show>
        <Show when={taskToEdit()}>
            <div class="modal-overlay">
                <TaskForm close={() => setTaskToEdit(null)} task={taskToEdit()} />
            </div>
        </Show>
    </>
}

export default TaskList