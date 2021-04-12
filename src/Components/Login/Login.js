import React from 'react'
import Header from '../Header/Header'
import login from '../../assets/login.svg'
import './Login.css'

const Login = () => {
  return (
    <div style={{ height: '100vh' }}>
      <Header />
      <div className='login'>
        <div className='login-body'>
          <div className='login-content'>
            <h1>LOGIN</h1>
            <h4>Do not have an account? <a href='/register'>Create one</a></h4>
          </div>
          <div className='form'>
            <input type='text' className='text-input' placeholder='Username or Email' />
            <input type='password' className='text-input' placeholder='Password' />
            <div>
              <input type='radio' className='radio-input' id='password' name='password' />
              <label className='showPassword' htmlFor='password'>Show Password</label>
            </div>
            <button type='submit'>LOG IN</button>
          </div>
        </div>
        <img src={login} className='login-background' />
      </div>
    </div>
  )
}

export default Login
