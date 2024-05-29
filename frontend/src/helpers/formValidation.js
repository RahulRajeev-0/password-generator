import { toast } from 'react-toastify';

export const  validate = (e)=>{
    console.log('working');
    let username = e.target.username.value;
   let email = e.target.email.value
   let password = e.target.password.value
//    let confirmpassword = e.target.confirmpassword.value
  
   if (username.length <= 3){
    toast.warning('Username should have atleast 4 character')
    return false;
   }

   if (username.includes(' ')){
    toast.warning("Username cannot contain blankspace")
    return false;
   }

   const regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]*[a-zA-Z][a-zA-Z\d]*$/;
   if (!regex.test(username)){
    toast.warning("Invalid Username Format")
    toast.warning("Username Should Have letters and numbers")
    return false;
   }

   if (!email.includes('@') || !email.includes('.com') || email.includes(' ')){
    toast.warning('Invalid Email Format')
    return false;
   }

   if (password.includes(' ')){
    toast.warning('Password should not include blank space')
    return false;
   }
   if (password.length < 8 ){
    toast.warning('Password Should Contain Atleast 8 Characters')
    return false;
   }

//    if (password !== confirmpassword){
//     toast.warning('Passwords do not match')
//     return false;
//    }

   return true;
  }
