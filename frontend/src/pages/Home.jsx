import React, { useState } from 'react';
import './Home.css';
import Checkbox from '../components/CheckBox';

import Navbar from '../components/Navbar';



const Home = () => {
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
            <button className="btn" >Generate Password</button>
            
          </div>
          <div style={{paddingBottom:'10px'}}>
            <button style={{background:'green'}} >Save Password</button>
            
          </div>
          {/* <div style={{paddingBottom:'10px' }}>
            <button  >View Passwords</button>
            
          </div> */}
         
      
      </div>
    </div>
            </>
  );
};

export default Home;
