import React from 'react'
import { useContext,   useState } from 'react'
import Notescontext from '../context/Notescontext';




export default function SignUp() {

  const cont = useContext(Notescontext)
  const { signupuser } = cont;
  const [user, setuser] = useState({ username: "", email: "", password: "", cpassword: "" });


  const changed = (e)=>{
    setuser({ ...user, [e.target.name]: e.target.value  })
  }

  const submitlogin = (e)=>{
    signupuser(user);
    e.preventDefault()
    
  }

  return (
    <div className='container mt-5 pt-5  px-5 ' style={{ maxWidth: '45rem' }} >
      <h1 className='mb-4 text-center 'style={{ color: '#ff6507' }} >Please SignUp to use this app</h1>
      <form onSubmit={submitlogin} >
      <div className="mb-3">
          <label htmlFor="username" className="form-label"> <h5> Username</h5></label>
          <input type="text" className="form-control" name='username' id="username" onChange={changed} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label"><h5>Email address</h5></label>
          <input type="email" className="form-control" name='email' id="email" onChange={changed} aria-describedby="emailHelp" required />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label"><h5>Password</h5></label>
          <input type="password" className="form-control" name='password' onChange={changed} id="password" required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label"><h5>Confirm Password</h5></label>
          <input type="password" className="form-control" onChange={changed} name='cpassword' minLength={6} id="cpassword" />
        </div>
        <div className="text-center">
        <button disabled={user.cpassword!== user.password || user.password.length<6 || user.username.length<1 || user.email.length < 2} type="submit" className="btn btn-primary ">Submit</button>
        </div>
      </form>
    </div>
  )
}
