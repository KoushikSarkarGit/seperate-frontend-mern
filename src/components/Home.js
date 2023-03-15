import React from 'react'
import Notes from './Notes'
import Notescontext from '../context/Notescontext'
import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {

  const cont = useContext(Notescontext);
  const { addnote, getallnotes  } = cont;
  const navigate = useNavigate()

  const [newnote, setnewnote] = useState({ Title: "", Description: "", Tag: "" });
  const changed = (e) => {
    setnewnote({ ...newnote, [e.target.name]: e.target.value })
  }

  const clicked = () => {
    addnote(newnote);
    setnewnote({ Title: "", Description: "", Tag: "" })
    // showAlert('login successful', 'primary')
  }

  useEffect(() => {

    if (localStorage.getItem('token')) {
      getallnotes();
      document.title = 'MyNotebook APP - Home'
    }
    else {
      
      document.title = 'MyNotebook APP - Login'
      navigate('/login')
      
    }

  }, [])

  return (
    <div>
      
      <div className="mx-1 my-1 mt-3 pt-3">
        <h2 style={{color: 'red' }} >Add Your Note Here</h2>
        <div className="mb-3">
          <label htmlFor="Title" className="form-label " style={{color: 'blueviolet' }} > <b> Note Title</b></label>
          <input type="text" className="form-control" name='Title' id="Title" placeholder="Title" value={newnote.Title} onChange={changed} minLength={3} required />
        </div>

        <div className="mb-3">
          <label htmlFor="Description" className="form-label" style={{color: 'blueviolet' }} ><b> Description</b></label>
          <textarea className="form-control" name='Description' placeholder="Add details here" id="Description" rows="2" onChange={changed} value={newnote.Description} minLength={10} required ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="Tag" className="form-label" style={{color: 'blueviolet' }} ><b> Tag</b></label>
          <textarea className="form-control" placeholder="Add details here" name='Tag' id="Tag" rows="1" onChange={changed} value={newnote.Tag} maxLength={30} ></textarea>
        </div>
        <button disabled={newnote.Title.length < 3 || newnote.Description.length < 10 || newnote.Tag.length < 1} type="submit" className="btn btn-primary mb-1" onClick={clicked}  >Add Note</button>
      </div>
      <h4 style={{color: 'blueviolet' }} >Here are your notes <hr /> </h4>
      <Notes />
    </div>
  )
}
