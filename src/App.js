import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm';
import RegisterForm from './components/RegisterForm/RegisterForm';
import TaskList from './components/taskHandler/TaskList';
import UserHandler from './components/UserHandler/UserHandler';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm/>}/>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/register" element={<RegisterForm/>}/>
        <Route path="/todoList" element={<TaskList/>}/>
        <Route path="/admin" element ={<UserHandler/>}/>
      </Routes>

    </Router>
  
  );
}

export default App;