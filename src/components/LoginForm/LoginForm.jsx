import React, { useState } from "react";
import './LoginForm.css';
import axios from "axios";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import TokenHandler from "../TokenHandler/tokenHandler";

 function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
     e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/auth/login', {
            email: email,
            password: password
        });
        sessionStorage.setItem('jwtToken', response.data.token);
        sessionStorage.setItem('role',"admin");
        console.log("je test : ",sessionStorage.getItem("jwtToken"))
        console.log("Réponse de l'API :", response.data);
        navigate("/todoList");
        } catch (error) {
        console.error("Erreur lors de l'appel à l'API :", error);
        }
    };

    const handleEmailChange = (event) =>{
        setEmail(event.target.value);
    };

    const handlePasswordChange=(event)=>{
        setPassword(event.target.value);
    };


    return(
        <div className='wrapper'>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className="input-box">
                    <input type="email" placeholder="email" value={email} onChange={handleEmailChange} required/>
                    <FaUser className="icon"/>
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} required />
                    <FaLock className="icon" />
                </div>
                <div className="remember-forgot">
                    <label> <input type="checkbox" />Remember</label>
                    <a href="#">Forgot Password?</a>
                </div>
                <button type="submit">Login</button>

                <div className="register-link">
                    <p> Don't have an account? <a href="/register">Register</a></p>
                </div>
            </form>
        </div>
        
    );
 };

 export default LoginForm;