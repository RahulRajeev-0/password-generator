
import axios from 'axios';
import { validate, loginValidate } from '../helpers/formValidation';
import { toast } from 'react-toastify';
import { jwtDecode } from "jwt-decode";
import {useDispatch} from 'react-redux';

const BASE_URL = import.meta.env.VITE_API_BASE_URL


// user sign up function 
export const register = async (e)=>{
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
         
          if (error.response.status===406){
            console.log("error")
            console.log(error.response.data)
           
            toast.error(error.response.data.message);

          } else{
            console.log(error)
          }
        }
      }    
  }



  // for checking if the user is already logged in or not 

  const updateUserToken = async () =>{
    const refreshToken = localStorage.getItem('refresh');
   
    try {
        const res = await axios.post(BASE_URL+'/account/api/token/refresh/',
        {
            "refresh":refreshToken
        })
        if (res.status === 200){
            localStorage.setItem('access', res.data.access)
            localStorage.setItem('refresh', res.data.refresh)
            let decoded = jwtDecode(res.data.access);
            return {
                'username':decoded.username,
                is_authenticated:true
            }

        }else{
            return{
                'username':null,
                is_authenticated:false
            }
        }
    }
    catch(error){
        return {"username":null, is_authenticated:false}
    }
}

const isAuthUser = async ()=> {
  const accessToken = localStorage.getItem("access")

  if (!accessToken){
      return {'username':null, is_authenticated:false}

  }
  const currentTime = Date.now()/1000;
  
  let decoded = jwtDecode(accessToken)
  
  if (decoded.exp > currentTime){
      return {'username':decoded.username, is_authenticated:true}

  } else{
      const updateSuccess = await updateUserToken();
      return updateSuccess;
  }
}
export default isAuthUser;

