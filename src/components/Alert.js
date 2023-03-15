import React from 'react'
import Notescontext from '../context/Notescontext'
import {  useContext } from 'react'


export default function Alert(props) {

  const cont = useContext(Notescontext);
  const { curalert} = cont;
 
    const capitalize = (word)=>{
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
  


  return (
    <div className='mt-5' style={{height: '25px' }}>
    {curalert && <div className={`alert alert-${curalert.type} alert-dismissible fade show`} role="alert">
       <strong>{capitalize(curalert.type)}</strong>: {curalert.msg} 
    </div>}
    </div>
  )
}
