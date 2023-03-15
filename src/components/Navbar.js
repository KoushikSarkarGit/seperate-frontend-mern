import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom';
import Notescontext from '../context/Notescontext'
import { useLocation, useNavigate } from 'react-router-dom'


export default function Navbar() {

  const cont = useContext(Notescontext);
  const {setnote,  currentuser} = cont;


let location = useLocation()
const navigate = useNavigate()

const logclicked= ()=>{
  document.title = 'MyNotebook APP - Login'
}

const sigclicked= ()=>{
  document.title = 'MyNotebook APP - Create Account'
}

const abclicked= ()=>{
  document.title = 'MyNotebook APP - About'
}

const logout = async ()=>{
  // await showAlert('Logged out Successfully', 'warning')
 await localStorage.removeItem('token');
  // console.log('logout')
 await setnote({})
 await navigate('/login')
 await window.location.reload()
 document.title = 'MyNotebook APP - Login'

}
  return (
    <div>

      <nav className="navbar fixed-top navbar-expand-lg bg-dark" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand mr-2" href="/"><b> MyNotebook </b></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className= {`nav-link ${location.pathname==="/" ? "active" : ""}`}  aria-current="page" >Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className= {`nav-link ${location.pathname==="/about" ? "active" : ""}`} onClick={abclicked} >About</Link>
              </li>
              
              
            </ul>
            {/* <form className="d-flex mx-3" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button> 
            </form> */}
            {localStorage.getItem('token')? <div className='d-flex' ><button className="btn btn-primary" onClick={logout} >Logout</button>
              
              <div style={{color: 'white' }} className='mx-3 text-center' > <b> <h5 className=' pt-2'> Hello {currentuser} </h5></b> </div>
              
              </div>  :
              <div>
              <Link className="btn btn-primary mx-1" to="/login" onClick={logclicked} role="button">login</Link>
              <Link className="btn btn-primary mx-1" to="/signup" onClick={sigclicked} role="button">SignUp</Link>
              </div>}
          </div>
        </div>
      </nav>

    </div>
  )
}
