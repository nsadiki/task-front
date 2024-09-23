import axios from "axios";
import { useState } from "react";
import './RegisterForm.css';
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavComponent/NavBar";

function RegisterForm() {


    const[user, setUser]= useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError]=useState("");
    const navigate = useNavigate(); 


    const handleSubmit = async (event) =>{
        event.preventDefault();
        setError("");
        console.log("Test de la valeur du user : " , user.username);


        try{
            const response = await axios.post('http://localhost:8080/auth/register',user);
            console.log("Inscription réussie : ", response.data);
           
            navigate('/');
             
        }catch(error){
            console.error("Erreur lors de l'inscription", error);
            setError("Impossible de vous inscrire. Veuillez réessayer ultérieurement.")
            //setTimeout(()=> window.location.reload(),2000)
           
        }

    }

    const handleChange=(event)=>{
        const {name, value} = event.target;
        setUser(prevUser =>({
            ...prevUser,
            [name]: value
        }));
            
    };


    return(
        <div>
            <NavBar/>
        <div className="wrapper">
            
            <form onSubmit={handleSubmit} value={user}>
                <h1>Sign in</h1>

                {error && <div className="error-message">{error}</div>}

                <div className="input-box">
                    <FaUser className="icon" />
                    <input type="text" placeholder="Username" name="username" value={user.username} onChange={handleChange}  required />
                </div>
                <div className="input-box">
                    <FaEnvelope className="icon" />
                    <input type="email" placeholder="Email" name="email" value={user.email} onChange={handleChange} required  />
                </div>
                <div className="input-box">
                    <FaLock className="icon" />
                    <input type="password" placeholder="Password" name="password" value={user.password} onChange={handleChange} required />
                </div>
                <div>
                    <button type="submit">Sign In</button>
                </div>
            </form>
        </div>
        </div>
    );
}

export default RegisterForm;