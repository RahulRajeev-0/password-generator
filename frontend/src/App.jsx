import { useEffect } from 'react'
import './App.css'
// redux
import {useDispatch, useSelector} from 'react-redux'
// imports
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// pages
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import Passwords from './pages/Passwords/Passwords';

import isAuthUser from './api/auth';
import { set_authentication } from './redux/authentication/AuthenticationSlice';

// toast 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state=>state.authentication);
  
  useEffect(()=>{checkAuth()})
  const checkAuth = async ()=>{
    const isAuthenticated = await isAuthUser();
    dispatch(
        set_authentication({
            username:isAuthenticated.username,
            is_authenticated:isAuthenticated.is_authenticated,
        })
    );
};
  return (
    <>
      <Router>

     
      
            <Routes>
              <Route exact path='/' element={<Home/>} />
              <Route  path='/login' element={<Login/>} />
              <Route  path='/register' element={<Register/>} />
              <Route  path='/passwords' element={<Passwords/>} />
            </Routes>
       
      </Router>
<div>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition: Flip
        />
        </div>
    </>
  )
}

export default App
