import { useState } from 'react'
import './App.css'
// redux
import Store from './redux/Store';
import {Provider} from 'react-redux'
// imports
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// pages
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import Passwords from './pages/Passwords/Passwords';


// toast 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>

      <Provider store={Store} >
      
            <Routes>
              <Route exact path='/' element={<Home/>} />
              <Route  path='/login' element={<Login/>} />
              <Route  path='/register' element={<Register/>} />
              <Route  path='/passwords' element={<Passwords/>} />
            </Routes>
        </Provider>     
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
