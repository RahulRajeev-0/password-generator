import React, { useState } from 'react';
import './Home.css';
import Checkbox from '../../components/CheckBox';

import Navbar from '../../components/Navbar';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Typography from '@mui/material/Typography';  
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';


const Home = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
const BASE_URL = import.meta.env.VITE_API_BASE_URL

  const navigate = useNavigate();
  const handleClose = () =>{
    setShow(false)
    setPassword({
      account: '',
      password: '',
    })
  } ;
  const handleShow = () => setShow(true);

  const [password, setPassword] = useState({
    account: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPassword(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const user = useSelector((state) => state.authentication)
  const [passwordGen, setPasswordGen] = useState({
    length: 5,
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false,
  });

  const [handleText, setHandleText] = useState('');
  const [copied, setCopied] = useState(false);

  const handleChangeUppercase = () => {
    setPasswordGen({
      ...passwordGen,
      uppercase: !passwordGen.uppercase,
    });
  };

  const handleChangeLowercase = () => {
    setPasswordGen({
      ...passwordGen,
      lowercase: !passwordGen.lowercase,
    });
  };

  const handleChangeNumbers = () => {
    setPasswordGen({
      ...passwordGen,
      numbers: !passwordGen.numbers,
    });
  };

  const handleChangeSymbols = () => {
    setPasswordGen({
      ...passwordGen,
      symbols: !passwordGen.symbols,
    });
  };

  const setPasswordLength = (val) => {
    setPasswordGen({
      ...passwordGen,
      length: val,
    });
  };


  function generatePassword() {
    const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const symbolsArray = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'];

    const characterCodes = Array.from(Array(26)).map((_e, i) => i + 97);
    const lowerCaseLetters = characterCodes.map((code) =>
      String.fromCharCode(code)
    );
    const upperCaseLetters = lowerCaseLetters.map((letter) =>
      letter.toUpperCase()
    );

    const { length, uppercase, lowercase, numbers, symbols } = passwordGen;

    const generateTheWord = (
      length,
      uppercase,
      lowercase,
      numbers,
      symbols
    ) => {
      const availableCharacters = [
        ...(lowercase ? lowerCaseLetters : []),
        ...(uppercase ? upperCaseLetters : []),
        ...(numbers ? numbersArray : []),
        ...(symbols ? symbolsArray : []),
      ];
      const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
      const characters = shuffleArray(availableCharacters).slice(0, length);
      setHandleText(characters.join(''));
      return characters;
    };

    generateTheWord(length, uppercase, lowercase, numbers, symbols);
  }
  const handleSubmit = async () => {
    if (password.account.trim() === '' || password.password.trim() === '') {
      toast.warning("Please Fill all the required fields");
      return;}
      const token = localStorage.getItem('access')
      const headers = {
        'Authorization': `Bearer ${token}`, // Add space after 'Bearer'
        'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data for FormData
      };
      try{
        
        
        const response = await axios.post(BASE_URL+`/account/my-password/`,
        password,{ headers }
         )

         if (response.status === 201){
          toast.success("Password Added Successfully")
         }

         handleClose()


      }catch(error){
        console.log(error)
      }
    }
  return (
    <>
<Navbar/>
    <div className="container">
      <div className="form_area">
        <p className="title">GENERATE</p>
        
        
          
          <div className="form_group">
            <label className="sub_title" htmlFor="email">Password</label>
            <input   className="form_style" value={handleText}
            placeholder="Generated password"
            autoComplete="off"
            onChange={(e) => setHandleText(e.target.value)} />

              
          </div>
          <button
            className="copy-button"
            onClick={() => {
              if (handleText.length > 0) {
                navigator.clipboard.writeText(handleText);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }
            }}
            >
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <div className="word-crieteria__box">
          <div>
            <label>Password length</label>
          </div>
          <div>
            <input
              type="number"
              min="4"
              max="20"
              value={passwordGen.length}
              onChange={(e) => setPasswordLength(e.target.value)}
            />
          </div>
        </div>
          <div className="word-criteria__box">
          <label className="sub_title"style={{color:'grey'}}>Include uppercase letters</label>
          <Checkbox
            checked={passwordGen.uppercase}
            onChange={handleChangeUppercase}
            />
        </div>
        <div className="word-criteria__box">
          <label className="sub_title" style={{color:'grey'}}>Include lowercase letters</label>
          <Checkbox
            checked={passwordGen.lowercase}
            onChange={handleChangeLowercase}
          />
        </div>
        <div className="word-criteria__box">
          <label className="sub_title" style={{color:'grey'}}>Include numbers</label>
          <Checkbox
            checked={passwordGen.numbers}
            onChange={handleChangeNumbers}
            />
        </div>
        <div className="word-criteria__box">
          <label className="sub_title" style={{color:'grey'}}>Include symbols</label>
          <Checkbox
            checked={passwordGen.symbols}
            onChange={handleChangeSymbols}
            />
        </div>
         
          <div>
            <button className="btn" onClick={generatePassword}>Generate Password</button>
            
          </div>
          {user.isAuthenticated &&(

          <div style={{paddingBottom:'10px'}}>
            <button style={{background:'green'}} onClick={handleShow} >Save Password</button>
            
          </div>
          )}
          {/* <div style={{paddingBottom:'10px' }}>
            <button  >View Passwords</button>
            
          </div> */}
         
      
      </div>
    </div>

    <Dialog open={show} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: 'flex', alignItems: 'center',color:'white', bgcolor: '#17141a'}}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Create New Channel
        </Typography>
        <Button autoFocus onClick={handleClose} color="inherit" size="small">
          x
        </Button>
      </DialogTitle>
      <DialogContent sx={{ bgcolor: '#17141a', color: 'white' }}>
      <TextField
          autoFocus
          margin="dense"
          id="account"
          label="Account"
          type="text"
          fullWidth
          variant="standard"
          required
          maxLength={50}
          name="account"
          value={password.account}
          onChange={handleInputChange}
          InputLabelProps={{ style: { color: 'white' } }} // Set label color to white
          InputProps={{ style: { color: 'white' } }} // Set input color to white
        />
        <TextField
          id="password"
          label="Password"
          multiline
          rows={3}
          fullWidth
          variant="standard"
          required
          maxLength={250}
          name="password"
          value={password.password}
          onChange={handleInputChange}
          InputLabelProps={{ style: { color: 'white' } }} // Set label color to white
          InputProps={{ style: { color: 'white' } }} // Set input color to white
        />
      </DialogContent>
      <DialogActions sx={{bgcolor:"#17141a"}}>
        <Button onClick={handleClose} variant="contained" color="secondary">
          Close
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
            </>
  );
};

export default Home;
