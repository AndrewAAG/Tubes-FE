import './Task.css'

function Task(){
    return <>
        <div class="task-container">
            <div class="status">On Going</div>
            <div class="task-content">
                <p>Title</p>
                <p>Description</p>
            </div>
            <div class="tag"> Kuliah </div>
            <p class="date">Tanggal</p>
            <div class="priority">Priority</div>
        </div>
    </>
}

export default Task