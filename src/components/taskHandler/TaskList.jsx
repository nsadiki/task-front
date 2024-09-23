import { React, useEffect, useState } from "react";
import './TodoItem.jsx';
import axios from "axios";
import TodoItem from "./TodoItem.jsx";
import '../ModalComponent/ModalItem.jsx';
import ModalItem from "../ModalComponent/ModalItem.jsx";
import TokenHandler from "../TokenHandler/tokenHandler.jsx";
import NavBar from "../NavComponent/NavBar.jsx";
import KanbanBoard from "../KanbanComponent/KanbanBoard.jsx";

function TaskList(){


    const [taskData,setTaskData]=useState(
        {
            title: '',
            description: '',
            dueDate: '',
            status: ''
        }
    );

    const token = sessionStorage.getItem('jwtToken');
    const testuser = sessionStorage.getItem('userId');

    console.log ("test du user id :", testuser);
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };




    const [tasks, setTasks]= useState([]);
    const [error, setError]= useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);
    

    const openmodal = () => setIsModalOpen(true);
    const closeModal = () => {
        setTaskData({
            title: '',
            description: '',
            dueDate: '',
            status: '',
            userId: '',
        });
        setTaskToEdit(null);
        setIsModalOpen(false);
    };



    const getTasks = async(identifiant)=>{
        console.log("ENTEEEEEEEEEER HEEEEEEEEEEEEEEERE");
          try{
            const response = await axios.get(`http://localhost:8080/task/${identifiant}`,config);
            console.log("Tasks retrieved:", response);
            setTasks(response.data);
        }catch (error){
            console.log("erreur lors de le transmission : ", error);
            setError("Impossible de récupérer les tâches");
        }  

    };


    const deleteTask= async (identifiant)=>{

        try{
            await axios.delete(`http://localhost:8080/task/deleteTask/${identifiant}`, config);
            setTasks(tasks.filter(task=>task.id!==identifiant));
            console.log("Suppression de tâche : ",deleteTask.data);
        }catch(error){
            console.log("delete error : ", error);
        }
    };

    const addTasks= async (taskToAdd, identifiant) => {
    
        const newTask={
            title: taskToAdd.title,
            description: taskToAdd.description,
            dueDate: taskToAdd.dueDate,
            status: taskToAdd.status,
            userId: identifiant
        };

        try{
            const response = await axios.post(`http://localhost:8080/task/create`,newTask,config);
            setTasks([...tasks,response.data]);

        }catch(error){
            console.log("Erreur lors de la création de la tâche : " , error);

        }

        closeModal();

    };

    const updateTask = async (taskId, updatedTask) => {       
        try{

            const response =  await axios.put(`http://localhost:8080/task/update/${taskId}`,updatedTask,config);
            setTasks(tasks.map(
                task =>
                    task.id === taskId ? {...task,...response.data} : task
                )
            ); 
            console.log("Tâche mise à jour avec succès");
          }catch(error){
            console.log("Erreur lors de la mise à jours: ",error);
          }
        
        closeModal(); 
    };

    const editTask= (task)=>{

        setTaskToEdit(task);
        setTaskData({
            title: task.title,
            description: task.description,
            dueDate: task.dueDate,
            status: task.status
        })
        setIsModalOpen(true);
       
    };
       

    useEffect(()=>{     
            getTasks(sessionStorage.getItem('userId'));
    },[sessionStorage.getItem('userId')]);


    return(
       <div>
            <TokenHandler/>
            <NavBar/>
            <ModalItem
                taskToEdit={taskToEdit}
                updateTask={updateTask}
                addTasks={addTasks}
                isModalOpen={isModalOpen}
                tasks={tasks}
                taskData={taskData}
                closeModal={closeModal}
                setTaskData={setTaskData}
        
            />        
            <h1>My Tasks</h1>
            <button className="add-Button" onClick={openmodal}>
                Add
            </button>
            <KanbanBoard tasks={tasks} setTasks={setTasks} deleteTask={deleteTask} editTask={editTask}/>

       </div>
    )

}
export default TaskList;