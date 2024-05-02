import React, { useEffect, useState } from 'react'
import './Login.css';
import video from '../../loginAssets/loginvideo.mp4';
import logo from '../../loginAssets/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import Axios from 'axios'
const Login = () => {
  const [userName,setUserName] = useState('');
  const [password,setPassword] = useState('');

  //message
  const [loginStatus,setLoginStatus] = useState('');
  const [statusHolder,setStatusHolder] = useState('message');
  const navigate = useNavigate();

  const Login = (e) =>{
    e.preventDefault();
    Axios.post('http://localhost:3002/login',{
        LoginUserName:userName,
        LoginPassword:password,
    }).then((response)=>{
      // if credential don't match
        if(response.data.message || userName == '' || password == ''){
          navigate('/');
          setLoginStatus('Credentials don\'t Exist!');
        }
        //if credential match
        else{
          navigate('/dashboard')
        }
    })
}
useEffect(()=>{
  if(loginStatus !== ''){
    setStatusHolder('showMsg')//show message
  }
  setTimeout(()=>{
    setStatusHolder('message')//hide after 4 seconds
  },4000)
},[loginStatus])

  const onSubmit = ()=>{
    setUserName(e.target.value);
    setPassword(e.target.value);
  }
   return (
    <div className='loginPage flex'>
      <div className='container flex'>
        <div className="videoDiv">
          <video src={video} autoPlay muted loop></video>
        <div className="textDiv">
          <h2 className='title'>Create and Sell Extraordinary Products</h2>
          <p>Adopt the peace of nature!</p>
        </div>
        <div className="footerDiv flex">
          <span className="text">Don't have an account?</span>
          <Link to={'/register'}>
            <button className='btn'>Sign Up</button>
          </Link>
        </div>
        </div>
        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="logo image"/>
            <h3>Welcome Back!</h3>
          </div>
          <form action="" className='form grid' onSubmit={onSubmit}>
            <span className={statusHolder}>{loginStatus}</span>
            <div className="inputDiv">
              <label htmlFor="username">Username</label>
              <div className="input flex">
                <FaUserShield className='icon'/>
                <input type="text" id='username' placeholder='Enter Username' onChange={(e) =>setUserName(e.target.value)} />
              </div>
            </div>
            <div className="inputDiv">
              <label htmlFor="password">Password</label>
              <div className="input flex">
              <BsFillShieldLockFill className='icon'/>
                <input type="password" id='password' placeholder='Enter Password' onChange={(e)=>setPassword(e.target.value)} />
              </div>
            </div>
            <button type='submit' className='btn flex' onClick={Login}>
              <span>Login</span>
              <AiOutlineSwapRight className='icon'/>
            </button>
            <div className="forgotPassword">
              <span>Forgot your Password? <Link to={'/'}>Click Here</Link> </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login