import React, { useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import {Link} from "react-router-dom"

const Login = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const {login,loading,error} = useLogin();

    const handleSubmit =async (e)=>{    // 'e' is the event object from the submit event
        e.preventDefault();

        await login(email,password);
    }

  return (
    <>
      <h1 style={{'text-align': 'center'}}>Welcome</h1>
      <form className='login' onSubmit={handleSubmit}>
          <h3>Login</h3>     
          <label>Email:</label>
          <input type="email" onChange={(e)=>{setEmail(e.target.value)}} value={email} />

          <label>Password:</label>
          <input type="password" onChange={(e)=>{setPassword(e.target.value)}} value={password} />

          <button disabled={loading}>Login</button>
          {error && <div className='error'>{error}</div> }
      </form>
      <h3 style={{'text-align': 'center'}}>Do not have an account?<Link to='/signup'> signup</Link></h3>

    </>
    
  )
}

export default Login
