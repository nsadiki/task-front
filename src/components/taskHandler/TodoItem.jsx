import React from "react";
import './TodoItem.css';
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";


function TodoItem({task, deleteTask,editTask}){


    return(
        <div className="task-container">
            <div className="task-card">
            <h2>{task.title}</h2>
            <div >
                <p>
                    {task.description}
                </p>
                <p>
                    {task.dueDate}
                </p>
                <p className="status">{task.status}</p>
                <div className="task-actions">
                    <button onClick={()=> deleteTask(task.id)}><MdDelete /></button>
                    <button onClick={()=> editTask(task)}><FaPen /></button>
                </div>  
            </div>
            </div>  
        </div>)
};
export default TodoItem;