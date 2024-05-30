import React from 'react'
import './Register.css'
import axios from 'axios';
// import { validate } from '../../helpers/formValidation';
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify';
import { validate } from '../../helpers/formValidation';


const Register = () => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL
  const navigate = useNavigate()
 const register = async (e)=>{
    e.preventDefault();
    console.log("working");
    
    const formData = new FormData();
    formData.append('username', e.target.username.value);
    formData.append('email', e.target.email.value);
    formData.append('password', e.target.password.value);
    

      if (validate(e)){

        try{
          const res = await axios.post(BASE_URL+'/account/register/',formData)
          if (res.status === 201){
            
            navigate('/login')
              toast.success(res.data.Message)
              return res
          }
        }catch (error){
          if (error.response && error.response.data && error.response.data.message) {
            // Show error messages using Toastify
            error.response.data.message.forEach(errorMessage => {
              toast.error(errorMessage);
            });
          } else {
            // Show a generic error message if there are no specific error messages from the backend
            toast.error('An error occurred. Please try again later.');
          }
         
          
            console.log(error)
          
        }
      }    
  }

  return (
    <>
   
     <div className="container">
      <div className="form_area">
        <p className="title">SIGN UP</p>

        <form  onSubmit={register}>


          <div className="form_group">
            <label className="sub_title" htmlFor="name">User Name</label>
            <input placeholder="Enter your full name" className="form_style" type="text" id="username" name='username' required/>
          </div>
          <div className="form_group">
            <label className="sub_title" htmlFor="email">Email</label>
            <input placeholder="Enter your email" id="email" className="form_style" type="email" name='email' required/>
          </div>
          <div className="form_group">
            <label className="sub_title" htmlFor="password">Password</label>
            <input placeholder="Enter your password" id="password" className="form_style" name='password' type="password" required/>
          </div>
          <div>
            <button className="btn" type="submit">SIGN UP</button>
            <p>Have an Account? <a onClick={()=>navigate('/login')} >Login Here!</a></p>
          </div>
        </form>
      </div>
    </div>
  
    </>
  )
}

export default Register
