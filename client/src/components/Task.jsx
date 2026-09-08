import '../css/Task.css'
import { setTasks } from '../tasksStore';
import { produce } from 'solid-js/store';

function Task(props){
    const statusClass = () => props.task.status.toLowerCase().replaceAll(" ", "-");

    const priorityClass = () => props.task.priority.toLowerCase();

    async function handleDelete(){
        try {
            const response = await fetch(`http://localhost:8080/delete/${props.task.id}`, {
                method: "DELETE",
                credentials: 'include'
            });

            const data = await response.json();

            if(data.success){
                setTasks(produce((current)=>{
                    const index = current.findIndex(task => task.id === props.task.id);
                    current.splice(index, 1); 
                }));
            }

        } catch (e) {
            console.error(e);
        }
    }

    return <>
        <div class="task-container">
            <div class={`status ${statusClass()}`}>{props.task.status}</div>
            <div class="task-content">
                <p>{props.task.title}</p>
                <p>{props.task.description}</p>
            </div>
            <div class="tag"> {props.task.tag} </div>
            <p class="date">{props.task.date}</p>
            <div class={`priority ${priorityClass()}`}>{props.task.priority}</div>
            <div class="task-actions">
                <button class="btn-edit" onClick={props.editFunc}>✎</button>
                <button class="btn-delete" onClick={handleDelete}>✕</button>
            </div>
        </div>
    </>
}

export default Task