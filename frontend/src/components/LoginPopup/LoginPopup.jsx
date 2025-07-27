/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

function LoginPopup({ setShowLogin }) {

  const {url, setToken, loadUserProfile} = useContext(StoreContext)

  const [cursorState, setCursorState] = useState("Login"); // Initialize state to "Login"
  const [data,setData]= useState({
    name:"",
    email:"",
    password:""
  })

  const onChangeHandler =(event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async(event)=>{
    event.preventDefault()
    let newUrl = url;
    if (cursorState==="Login"){
      newUrl += "/api/user/login"
    }
    else{
      newUrl +="/api/user/register"
    }
    const response = await axios.post(newUrl,data);

    if (response.data.success){
      setToken(response.data.token);
      localStorage.setItem("token",response.data.token);
      await loadUserProfile(response.data.token);
      setShowLogin(false)
    }
    else{
      alert(response.data.message)
    }
  }



  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{cursorState}</h2>
          <img 
            onClick={() => setShowLogin(false)} 
            src={assets.cross_icon} 
            alt="Close" 
          />
        </div>


        
        <div className="login-popup-inputs">
          {cursorState === "Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />}
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
          <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
        </div>



        <button type='submit'>{cursorState === "Sign Up" ? "Create account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
          <div>
            {cursorState === "Login"
              ? <p>Don't have an account? <span onClick={() => setCursorState("Sign Up")}>Click here</span></p>
              : <p>Already have an account? <span onClick={() => setCursorState("Login")}>Login here</span></p>
            }
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginPopup;