import React from 'react'
import './Login.css'
import { useNavigate } from 'react-router'
import {useDispatch} from 'react-redux';
import { toast } from 'react-toastify';
import { loginValidate } from '../../helpers/formValidation';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

import { set_authentication } from '../../redux/authentication/AuthenticationSlice';


const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const BASE_URL = import.meta.env.VITE_API_BASE_URL


  const login = async (e) => {
    e.preventDefault();
    if (loginValidate(e)){
     const formData = new FormData();
     formData.append('email', e.target.email.value);
     formData.append('password', e.target.password.value);
    
      try{
        const res = await axios.post(BASE_URL+'/account/login/', formData)
        if (res.status === 200){
          localStorage.setItem('access', res.data.access)
          localStorage.setItem('refresh', res.data.refresh)
          console.log(res.data)
         
          // add data to the redux store here 
          dispatch(
            set_authentication({
              username:jwtDecode(res.data.access).username,
              is_authenticated:true,
            })
          )
          
          navigate(
            '/',
            {state:res.data.Message}
          )
          toast.success("Login Success")
        }

      }catch(error){
        console.log(error)

        if (error.response.status && error.response.status === 401){
          console.log("error")
          console.log(error.response.data)
          toast.error(error.response.data.detail);
        }
        else{
          console.log(error)
        }
      }

    }
  }

  return (
    <>
    <div className="container">
      <div className="form_area">
        <p className="title">LOGIN</p>
        <form onSubmit={login}>
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
            <button className="btn" type="submit">LOG IN</button>
            <p>Have an Account? <a onClick={()=>navigate('/register')}>Sign Up Here!</a></p>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default Login
