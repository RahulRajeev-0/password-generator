
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL
import { validate } from '../helpers/formValidation';
import { toast } from 'react-toastify';



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