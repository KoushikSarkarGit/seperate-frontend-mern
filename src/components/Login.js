import React from 'react'
import { useContext,   useState } from 'react'
import Notescontext from '../context/Notescontext';



export default function Login() {

  const cont = useContext(Notescontext)
  const { loginuser } = cont;
  const [loguser, setloguser] = useState({ username: "", email: "", password: "" });


  const changed = (e)=>{
    setloguser({ ...loguser, [e.target.name]: e.target.value  })
  }



  const submitlogin = (e)=>{
    loginuser(loguser);
    e.preventDefault()
    
  }




  return (
    <div className='container mt-5 pt-5  px-5 ' style={{ maxWidth: '45rem' }} >
    <h1 className='mb-4 text-center 'style={{ color: '#ff6507' }} >Please Login to continue</h1>
    <form onSubmit={submitlogin} >
    
      <div className="mb-3">
        <label htmlFor="email" className="form-label"><h5>Email address</h5></label>
        <input type="email" className="form-control" name='email' id="email" onChange={changed} aria-describedby="emailHelp" required />
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label"><h5>Password</h5></label>
        <input type="password" className="form-control" name='password' onChange={changed} id="password" required />
      </div>
      
      <div className="text-center">
      <button disabled={ loguser.password.length<6 || loguser.email.length < 2} type="submit" className="btn btn-primary ">Submit</button>
      </div>

      <div className="text-center my-5"> <p> If you don't have an account, please create one using the signUp option </p> </div>
    </form>
  </div>
  )
}
