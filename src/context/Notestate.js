import React from 'react'
import Notescontext from './Notescontext'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'



export default function Notestate(props) {
  // const BASE_URL = process.env.REACT_BACKEND_PORT
  // ? `https://${process.env.REACT_BACKEND_PORT}/api`
  // : 'http://localhost:27017/api';

  const BASE_URL = `https://seperate-backend-mern.vercel.app/api`

  const exnotes = []
  const navigate = useNavigate()
  const [note, setnote] = useState(exnotes);
  const [currentuser, setcurrentuser] = useState('user');
  const [curalert, setcuralert] = useState(null);
//the alert system
  const showAlert = (message, type)=>{
    // console.log('inside showalert')
    setcuralert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setcuralert(null);
    }, 2000);
  }

  // function to signup
  const signupuser = async (user) => {
    // console.log(newnote)
    try {
      const data = {
        "username": user.username,
        "email": user.email,
        "password": user.password
      }
      const response = await fetch(`${BASE_URL}/auth`, {
        method: "POST",
  
        headers: {
          "Content-Type": "application/json",
          
        },
  
        body: JSON.stringify(data)
      }).then();
      const servres = await response.json();
      
      if(servres.success){
        // console.log('inside if block', servres.jsontoken)
        // localStorage.setItem('token', servres.jsontoken)
        navigate("/login")
        showAlert('Successfully created account', 'success')
      }
      else{
        console.log(servres.error)
        showAlert('Account Creation Failed', 'success')
      }


      
    } catch (error) {
      console.log(error);
    }

    
  }


  // function to log in
  const loginuser = async (user) => {
    // console.log(newnote)
    try {
      const data = {
        "username": user.username,
        "email": user.email,
        "password": user.password
      }
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
  
        headers: {
          "Content-Type": "application/json",
          
        },
  
        body: JSON.stringify(data)
      }).then();
      const servres = await response.json();
      
      if(servres.success){
        // console.log('inside if block', servres.jsontoken)
        localStorage.setItem('token', servres.jsontoken)
        navigate("/")
        showAlert('Logged in Successfully', 'success')
        setcurrentuser(servres.user)
        // console.log(servres.user)
      }
      else{
        console.log(servres.error)
        showAlert('Login failed', 'danger')
      }


      
    } catch (error) {
      showAlert('Login failed, Some Internal Error Happened', 'danger')
    }

    
  }
  
  //function to add a note

  const addnote = async (newnote) => {
    // console.log(newnote)

    const data = {
      "Title": newnote.Title,
      "Description": newnote.Description,
      "Tag": newnote.Tag
    }
    const response = await fetch(`${BASE_URL}/createnote`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "token": localStorage.getItem('token')
      },

      body: JSON.stringify(data)
    }).then();
    const actualnewnote = await response.json();
    // console.log(actualnewnote)
    await setnote(note.concat(actualnewnote));
    showAlert('Note added Successfully', 'success')
  }

  // function to get all notes
  const getallnotes = async () => {

    const response = await fetch(`${BASE_URL}/getallnotes`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "token": localStorage.getItem('token')
      },


    });
    const allnotejson = await response.json();
    // console.log(allnotejson);
    setnote(allnotejson);
  }


  // function to update notes
  const updatenote = async (beforedit) => {
  
    try {
      

let data = {
  "Title": beforedit.uTitle,
  "Description": beforedit.uDescription,
  "Tag" : beforedit.uTag
}
    await fetch(`${BASE_URL}/updatenote/${beforedit._id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "token": localStorage.getItem('token')
      },

      body: JSON.stringify(data)
    });
    // const allnotejson = await response.json();
    await setnote(note.filter((item) => { 
      if(item._id=== beforedit._id){
        item.Title = beforedit.uTitle;
        item.Description = beforedit.uDescription
        item.Tag = beforedit.uTag
      }
      return item }));

      showAlert('Note updated Successfully', 'success')
    } catch (error) {
      showAlert('Updation failed, Some Internal Error Happened', 'warning')
    }
  }



  // function to delete a node
  const deletenote = async (id) => {
    
    try {
      
    

     await fetch(`${BASE_URL}/deletenote/${id}`, {
      method: "Delete",

      headers: {
        "Content-Type": "application/json",
        "token": localStorage.getItem('token')
      }

    });
    // const deljson = response.json();
    await setnote(note.filter((item) => { return item._id !== id }));

    showAlert('Note Deleted Successfully', 'warning')
  } catch (error) {
    showAlert('Deletion failed, Some Internal Error Happened', 'warning')
  }
  }


  return (
    <Notescontext.Provider value={{ note, setnote, addnote, getallnotes, deletenote, updatenote, signupuser, loginuser, curalert, showAlert, currentuser, setcurrentuser}} >
      {props.children}
    </Notescontext.Provider>

  )
}


