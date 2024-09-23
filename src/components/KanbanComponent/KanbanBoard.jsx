import React from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TodoItem from "../taskHandler/TodoItem.jsx";
import './KanbanBoard.css';




function KanbanBoard({tasks, setTasks, editTask, deleteTask}) {
    

    const kanbanColumns = {
        'Backlog': tasks?.filter(task => task.status === 'Backlog'),
        'In Progress': tasks?.filter(task => task.status === 'In Progress'),
        'Done': tasks?.filter(task => task.status === 'Done')
    };
    
    const token = sessionStorage.getItem('jwtToken');

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };
    
    const onDragEnd = async (result) => {        
       const { source, destination } = result;
       console.log("result", result);


        if (!destination){
            return;
        } 

        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            console.log("l'autre");

            return;
        }

        const movedTask = tasks[source.index];
        const newTasks = [...tasks];
        newTasks.splice(source.index, 1);
        movedTask.status = destination.droppableId;
        newTasks.splice(destination.index, 0, movedTask);

        console.log("tache qui change", newTasks);

        setTasks(newTasks);

        console.log("tasks maj : ", tasks);
       
        try {
            await axios.put(`http://localhost:8080/task/update/${movedTask.id}`, movedTask,config);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la tâche', error);
        }
    };

    
    return (
        <div className="kanban-container">
        <DragDropContext onDragEnd={onDragEnd}>
            <div style={{ display: 'flex' }}>
                {Object.keys(kanbanColumns)?.map((columnId) => {
                    return(
                        <Droppable key={columnId} type="group" droppableId={columnId}>
                            {(provided) => (
                            <div
                                ref={provided?.innerRef}
                                {...provided?.droppableProps}
                                className="kanban-column"
                            >
                                <h2>{columnId}</h2>
                                {kanbanColumns[columnId]?.map((task, index) => (

                                    <Draggable key={task?.id} draggableId={task.id?.toString()} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided?.innerRef}
                                                {...provided?.draggableProps}
                                                {...provided?.dragHandleProps}
                                                className="task-card"
                                            >
                                                <TodoItem
                                                    task={task}
                                                    deleteTask={deleteTask}
                                                    editTask={editTask}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}

                                {provided?.placeholder}
                            </div>
                        )}

                        </Droppable>
                    )
                })}
            </div>
        </DragDropContext>
        </div>
    );
}

export default KanbanBoard;
