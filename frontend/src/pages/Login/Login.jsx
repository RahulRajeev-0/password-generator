import React from 'react'
import './Login.css'
import { useNavigate } from 'react-router'


const Login = () => {
  const navigate = useNavigate()
  return (
    <>
    <div className="container">
      <div className="form_area">
        <p className="title">LOGIN</p>
        <form action="">
          {/* <div className="form_group">
            <label className="sub_title" htmlFor="name">User Name</label>
            <input placeholder="Enter your full name" className="form_style" type="text" id="name" />
          </div> */}
          <div className="form_group">
            <label className="sub_title" htmlFor="email">Email</label>
            <input placeholder="Enter your email" id="email" className="form_style" type="email" />
          </div>
          <div className="form_group">
            <label className="sub_title" htmlFor="password">Password</label>
            <input placeholder="Enter your password" id="password" className="form_style" type="password" />
          </div>
          <div>
            <button className="btn" type="submit">SIGN UP</button>
            <p>Have an Account? <a onClick={()=>navigate('/register')}>Sign Up Here!</a></p>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default Login
