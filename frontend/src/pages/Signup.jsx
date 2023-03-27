import React, { useState } from 'react'
import {useSignup} from '../hooks/useSignup'
import {Link} from "react-router-dom"
const Signup = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const {signup,loading,error} = useSignup()


    const handleSubmit =async (e)=>{    // 'e' is the event object from the submit event
        e.preventDefault();
        await signup(email,password)
    }

  return (
    <>
      <h1 style={{'text-align': 'center'}}>Welcome</h1>
      <form className='signup' onSubmit={handleSubmit}>
          <h3>Signup</h3>     
          <label>Email:</label>
          <input type="email" onChange={(e)=>{setEmail(e.target.value)}} value={email} />

          <label>Password:</label>
          <input type="password" onChange={(e)=>{setPassword(e.target.value)}} value={password} />

          {/* button is disabled when the request is going on (i.e. loading is true) so that another request can't be send */}
          <button disabled={loading}>Signup</button>  
          {error && <div className='error'>{error}</div> }
      </form>
      <h3 style={{'text-align': 'center'}}>Already have an account?<Link to='/login'> login</Link></h3>
    </>
  )
}

export default Signup
