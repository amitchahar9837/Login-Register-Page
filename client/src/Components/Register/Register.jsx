import React, { useState } from 'react'
import './Register.css';
import video from '../../loginAssets/loginvideo.mp4';
import logo from '../../loginAssets/logo.png'
import { Link } from 'react-router-dom';
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import { MdMarkEmailRead } from "react-icons/md";
import Axios from 'axios'
const Register = () => {
  const [email,setEmail] = useState('')
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')

  const createUser = (e) =>{
    e.preventDefault();
    Axios.post('http://localhost:3002/register',{
        Email: email,
        UserName: username,
        Password: password
    }).then(()=>{
        console.log('user has been created');
    })
}
  return (
    <div className='registerPage flex'>
      <div className='container flex'>
        <div className="videoDiv">
          <video src={video} autoPlay muted loop></video>
        <div className="textDiv">
          <h2 className='title'>Create and Sell Extraordinary Products</h2>
          <p>Adopt the peace of nature!</p>
        </div>
        <div className="footerDiv flex">
          <span className="text">Already have an account?</span>
          <Link to={'/'}>
            <button className='btn'>Login</button>
          </Link>
        </div>
        </div>
        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="logo image"/>
            <h3>Let Us Know You!</h3>
          </div>
          <form action="" className='form grid'>
          <div className="inputDiv">
              <label htmlFor="email">Email</label>
              <div className="input flex">
              <MdMarkEmailRead className='icon'/>
                <input type="email" id='email' placeholder='Enter Email' onChange={(e)=>setEmail(e.target.value)} />
              </div>
            </div>
            <div className="inputDiv">
              <label htmlFor="username">Username</label>
              <div className="input flex">
                <FaUserShield className='icon'/>
                <input type="text" id='username' placeholder='Enter Username' onChange={(e)=>setUsername(e.target.value)} />
              </div>
            </div>
            <div className="inputDiv">
              <label htmlFor="password">Username</label>
              <div className="input flex">
              <BsFillShieldLockFill className='icon'/>
                <input type="password" id='password' placeholder='Enter Password' onChange={(e)=>setPassword(e.target.value)} />
              </div>
            </div>
            
            <button type='submit' className='btn flex' onClick={createUser}>
              <span>Register</span>
              <AiOutlineSwapRight className='icon'/>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register