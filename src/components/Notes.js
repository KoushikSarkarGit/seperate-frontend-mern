import React from 'react'
import { useContext,  useRef, useState } from 'react'

import Notescontext from '../context/Notescontext'
import Noteitem from './Noteitem';

export default function Notes() {

  const cont = useContext(Notescontext)

  const { note, updatenote } = cont;
  const eref = useRef(null);
 
  // const [newunote, setnewunote] = useState({uTitle: "" , uDescription: "", uTag: ""});
  let [beforedit, setbeforedit] = useState({uTitle: "" , uDescription: "", uTag: "", User: "", _id: "", Date: "", _v: 0});
  
  const editnote = async (curnote) => {
    await setbeforedit( {uTitle: curnote.Title , uDescription: curnote.Description, uTag: curnote.Tag, User: curnote.User, _id: curnote._id, Date: curnote.Date, _v: curnote._v});
   await eref.current.click();
    // console.log('editing', curnote)
    
    // console.log(beforedit)
    
  }
  
  
  
  
  const changed = (e)=>{
    setbeforedit({ ...beforedit, [e.target.name]: e.target.value  })
    
  }









  let i = 1
  return (
    <>


      <button type="button " ref={eref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Launch static backdrop modal
      </button>


      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">



              <div className="mb-3">
                <label htmlFor="uTitle" className="form-label">Note Title</label>
                <input type="text" className="form-control" name='uTitle' id="uTitle"  value={beforedit.uTitle} onChange={changed} />
              </div>
              <div className="mb-3">
                <label htmlFor="uDescription" className="form-label">Description</label>
                <textarea className="form-control" name='uDescription' id="uDescription" rows="3" onChange={changed}                 value={beforedit.uDescription} ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="uTag" className="form-label">Tag</label>
                <textarea className="form-control" name='uTag' id="uTag" rows="1" onChange={changed} value={beforedit.uTag} ></textarea>
              </div>

              {/* onChange={changed} */}


            </div>
            <div className="modal-footer">
              <button  disabled={beforedit.uTitle.length<3 || beforedit.uDescription.length<10 }  type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => { updatenote(beforedit); console.log('it ran') }} >save changes</button>
              {/* <button type="button" className="btn btn-primary" onClick={()=>{console.log('it ran')}} >Understood</button> */}
            </div>
          </div>
        </div>
      </div>



  <div className="d-flex flex-wrap">
    <div className="container">
      <h4>{note.length===0 && 'No notes to Display'}</h4>
    
    </div>
    
        {note.map((element) => {
          return <Noteitem curnote={element} key={i++} editnote={editnote} />
        })}
      </div>

      
    </>

  )
}
