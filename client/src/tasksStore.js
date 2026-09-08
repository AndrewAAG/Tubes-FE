import { createSignal , createMemo, createEffect } from 'solid-js';
import { createStore } from 'solid-js/store';
import { user } from './auth';

const [tasks, setTasks] = createStore([]);
const [searchQuery, setSearchQuery] = createSignal("");
const [statusFilter, setStatusFilter] = createSignal("all");
const [tagFilter, setTagFilter] = createSignal("all");
const [priorityFilter, setPriorityFilter] = createSignal("all");

async function fetchTasks() {
    if(!user()){
        setTasks([]);
        return;
    }

    const res = await fetch("http://localhost:8080/taskdata", {
        credentials: 'include'
    });

    const data = await res.json();
    setTasks(data.tasks);
}

createEffect(()=>{
    fetchTasks();
});

function resetFilters() {
    setSearchQuery("");
    setStatusFilter("all");
    setTagFilter("all");
    setPriorityFilter("all");
}

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

const uniqueTags = createMemo(() => {
    const tagsSet = new Set();
    
    tasks.forEach(task => {
        tagsSet.add(task.tag);
    });
    
    return Array.from(tagsSet);
});

export {tasks, setTasks, searchQuery, setSearchQuery, statusFilter, setStatusFilter, tagFilter, setTagFilter, priorityFilter, setPriorityFilter, resetFilters, filteredTasks, uniqueTags};
