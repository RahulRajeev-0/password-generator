import { useState } from 'react'
import './App.css'

// imports
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// pages
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/login' element={<Login/>} />
          <Route exact path='/register' element={<Register/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
