import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TiThMenu } from "react-icons/ti";
import './NavBar.css';

function NavBar() {

    const[isMenuOpen, setIsMenuOpen]= useState(false);
    const navigate = useNavigate();



    const handleLogout =()=>{

        sessionStorage.clear();
        navigate('/login');

    };

    const toggleMenu= ()=>{

        setIsMenuOpen(!isMenuOpen);
    }
    return (
        <div>
            <nav>
                <div className="icon-menu" onClick={toggleMenu}>
                <TiThMenu />
                </div> 
                {isMenuOpen &&(
                    <div className="menu">
                        <button onClick={handleLogout}>Déconnexion</button>
                        <button onClick={()=> navigate('/admin')}>Administration</button>
                        <button onClick={()=> navigate('/todoList')}>Mes tâches</button>
                    </div> 
                )}
            </nav>
        </div>
    );  
}
export default NavBar;