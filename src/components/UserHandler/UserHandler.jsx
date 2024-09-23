import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../NavComponent/NavBar';
import { ToastContainer, toast } from 'react-toastify';
import './UserHandler.css';
import 'react-toastify/dist/ReactToastify.css';


function UserHandler() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
    const userRole = sessionStorage.getItem('role');

  const token = sessionStorage.getItem('jwtToken');

  const config = {
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
};

  useEffect( () => {
    if (userRole === 'admin') {
       axios.get('http://localhost:8080/user/getAllUser',config)
        .then(response => {
          setUsers(response.data);
        })
        .catch(error => {
          setError('Erreur lors de la récupération des utilisateurs.');
          console.error(error);
        });
    } else {
      setError("Vous n'avez pas les droits pour accéder à cette page.");
    }
  }, [userRole]);

  const deleteUser =  (userId) => {
     axios.delete(`http://localhost:8080/user/delete/${userId}`,config)
      .then(() => {
        setUsers(users.filter(user => user.id !== userId));
      })
      .catch(error => {
        console.error('Erreur lors de la suppression de l\'utilisateur', error);
      });
  };

  const createReport = async (userId) => {

    const pendingToast = toast.info("Génération du rapport en cours...", {
        autoClose: false, 
    });

    try{
        await axios.get(`http://localhost:8080/reports/generate/${userId}`, config);
        toast.update(pendingToast, { render: "Le rapport a été généré avec succès !", type: "success", isLoading: false, autoClose: 5000 });
        console.log(`Rapport créé pour l'utilisateur avec l'ID ${userId}`)
    }catch(error){
        console.error('Le rapport n\'as pu être généré');
        toast.update(pendingToast, { render: "Le rapport n\'a pu être généré.", type: "error", isLoading: false, autoClose: 5000 });
    }
    
  };

  if (error) {
  }

  return (
    <div className="container">
    <NavBar />
    <ToastContainer />

    <h1>Liste des utilisateurs</h1>
    <ul className="user-list">
      {users.map(user => (
        <div key={user.id} className="user-card">
          <h2>{user.username}</h2>
          <p>Email: {user.email}</p>
          <button className="report-button" onClick={() =>{ createReport(user.id)}}>Créer un rapport des tâches</button>

          <button className="delete-button" onClick={() => deleteUser(user.id)}>Supprimer l'utilisateur</button>

        </div>
      ))}
    </ul>
  </div>
    
  );
}

export default UserHandler;
