import Modal from 'react-modal';
import './Modal.css'
import { React,useState } from 'react';

function ModalItem({isModalOpen,taskData,setTaskData,addTasks,closeModal,taskToEdit,updateTask}){

    Modal.setAppElement('#root');

    const [taskToAdd, setTaskToAdd]= useState('');

    const handleSubmit = (event) =>{

        event.preventDefault();
        if(taskToEdit!==null){

            const updatedTask = {
                id: taskData.id,
                title: taskData.title,
                description: taskData.description,
                dueDate: taskData.dueDate,
                status: taskData.status
            };

            updateTask(taskToEdit.id, updatedTask);
            
        }else{

            const id = new Date().getTime();
            const taskToAdd = {
                id, 
                title : taskData.title, 
                description: taskData.description,
                dueDate: taskData.dueDate,
                status: taskData.status
            };

            addTasks(taskToAdd, 1);
            setTaskData({ title: '', description: '', dueDate: '', status: ''});

        }

            };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData(prevData => ({ ...prevData, [name]: value }));
    };

return (
    <div>
           <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Formulaire"
                className="modal"
                overlayClassName="overlay"
                shouldCloseOnOverlayClick={false}
            >   
                <form onSubmit={handleSubmit} value={taskToAdd}>
                    <div className="input-box">
                        <label htmlFor="title">Titre : </label>
                        <input 
                            type="text" 
                            id="title" 
                            name="title" 
                            value={taskData.title} 
                            onChange={handleChange}
                            tabIndex="1"
                        />
                    </div>    
                    <div>
                        <label htmlFor="description">Description : </label>
                        <textarea 
                            id="description" 
                            name="description" 
                            value={taskData.description}
                            onChange={handleChange}
                            tabIndex="2"
                            required
                        >
                        </textarea>                    
                    </div>
                    <div>
                        <label htmlFor="status">Statut : </label>
                        <select 
                            id="status" 
                            name="status"
                            value={taskData.status}
                            onChange={handleChange}
                            tabIndex="3"
                            required
                        >
                            <option value="">--Sélectionner une option--</option>
                            <option value="Backlog">Backlog</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>      
                    </div>
                    <div>
                        <label htmlFor="dueDate">Date d'échéance :</label>
                        <input
                            name="dueDate"
                            type="date"
                            value={taskData.dueDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" tabIndex="4" >{taskToEdit ? "Mettre à jour" : "Créer"}</button>  
                    <button name="annuler" onClick={closeModal} tabIndex="5">Annuler</button>                 
                </form>    
            </Modal> 
    </div>
)
};

export default ModalItem;