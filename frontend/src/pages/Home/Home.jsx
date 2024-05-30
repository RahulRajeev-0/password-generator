import React, { useState } from 'react';
import './Home.css';
import Checkbox from '../../components/CheckBox';

import Navbar from '../../components/Navbar';

import { useSelector } from 'react-redux';

const Home = () => {
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
            <button style={{background:'green'}} >Save Password</button>
            
          </div>
          )}
          {/* <div style={{paddingBottom:'10px' }}>
            <button  >View Passwords</button>
            
          </div> */}
         
      
      </div>
    </div>
            </>
  );
};

export default Home;
