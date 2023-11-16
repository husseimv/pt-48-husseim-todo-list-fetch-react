import React, { useState, useEffect } from "react";
import './Sign.css';

const Sign = () => {

    const [userInput,setUserInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [credentials, setCredentials] = useState({userInput: '', passwordInput: ''});

    useEffect(()=>{
        setCredentials({userInput, passwordInput});
    }, [userInput,passwordInput])

    const Click = () => {
        console.log(credentials);
    }

    return(<>
    
        <div className="sign__container">
            
            <input type="text" placeholder="User" 
                onChange={(e) => setUserInput(e.target.value)}
                value={userInput}   
            />
       
            <input type="password" placeholder="Password" 
                onChange={(e) => setPasswordInput(e.target.value)}
                value={passwordInput}  
            />

            <button className="sign__button" onClick={()=> Click()}>Sign in</button>
        </div>
    
    </>)
}

export default Sign;