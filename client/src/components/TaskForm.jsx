import { createSignal } from 'solid-js'
import '../css/AddEditForm.css'
import { setTasks } from '../tasksStore';
import { produce } from 'solid-js/store';

function TaskForm(props){
    const [title, setTitle] = createSignal("");
    const [description, setDescription] = createSignal("");
    const [dueDate, setDueDate] = createSignal("");
    const [tag, setTag] = createSignal("");
    const [priority, setPriority] = createSignal("low");
    const [status, setStatus] = createSignal("not started");

    // Mode edit
    if (props.task) {
        setTitle(props.task.title);
        setDescription(props.task.description);
        // Format date ke YYYY-MM-DD agar bisa dibaca <input type="date">
        setDueDate(props.task.date);
        setTag(props.task.tag);
        setPriority(props.task.priority);
        setStatus(props.task.status);
    // Mode add
    } else {
        setTitle("");
        setDescription("");
        setDueDate("");
        setTag("");
        setPriority("low");
        setStatus("not started");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const taskData = {
            title: title(),
            description: description(),
            dueDate: dueDate(),
            tag: tag(),
            priority: priority(),
            status: status()
        };

        try {
            // Edit
            if (props.task) {
                const response = await fetch(`http://localhost:8080/edittask/${props.task.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify(taskData)
                });

                const data = await response.json();

                if (data.success) {
                    setTasks(produce((currentTask)=>{
                        const taskToUpdate = currentTask.find((t) => t.id === props.task.id);
        
                        if (taskToUpdate) {
                            taskToUpdate.title = taskData.title;
                            taskToUpdate.description = taskData.description;
                            taskToUpdate.date = taskData.dueDate;
                            taskToUpdate.tag = taskData.tag;
                            taskToUpdate.priority = taskData.priority;
                            taskToUpdate.status = taskData.status;
                        }
                    }));
                    props.close();
                }
            // Post
            } else {
                const response = await fetch(`http://localhost:8080/addtask`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify(taskData)
                });

                const data = await response.json();

                if (data.success) {
                    setTasks(produce((current) => {
                        current.push(data.task);
                    }));
                    props.close();
                }
            }
        } catch (e) {
            console.error(e);
        }
    };

    return <>
        <div class="form">
            <h2>{props.task ? "Edit Task" : "Add New Task"}</h2>

            <label htmlFor="task-title">Title</label>
            <input type="text" id="task-title" value={title()} onInput={(e) => setTitle(e.target.value)}/>

            <label htmlFor="task-desc">Description</label>
            <textarea id="task-desc" rows="3" value={description()} onInput={(e) => setDescription(e.target.value)} ></textarea>

            <label htmlFor="task-date">Due Date</label>
            <input type="date" id="task-date" value={dueDate()} onInput={(e) => setDueDate(e.target.value)}/>

            <label htmlFor="task-tag">Tag</label>
            <input type="text" id="task-tag" value={tag()} onInput={(e) => setTag(e.target.value)} />

            <label htmlFor="task-priority">Priority</label>
            <select id="task-priority" value={priority()} onChange={(e) => setPriority(e.target.value)}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>

            <label htmlFor="task-status">Status</label>
            <select id="task-status" value={status()} onChange={(e) => setStatus(e.target.value)}>
                <option value="not started">Not Started</option>
                <option value="on going">On Going</option>
                <option value="done">Done</option>
            </select>

            <div class="modal-button">
                <button onClick={props.close}>Cancel</button>
                <button onClick={handleSubmit}>{props.task ? "Save Changes" : "Add"}</button>
            </div>
        </div>
    </>
}

export default TaskForm