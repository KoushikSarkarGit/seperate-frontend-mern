import React from 'react'
import Notescontext from '../context/Notescontext'
import {  useContext } from 'react'

export default function Noteitem(props) {
    const curnote = props.curnote
    const {editnote} = props
    const cont = useContext(Notescontext);
    const { deletenote,  } = cont;
    const del = () => {
        deletenote(curnote._id);
    }

    const upd = () => {
        editnote(curnote);
    }

    return (
        <div className="card mx-2 my-2 " style={{ width: curnote.Description.length < 100 ? "18rem": "40rem",  backgroundImage : 'linear-gradient(to bottom right, #ff0202a6, #ffff00f0)' }}>
            {/* <img src="..." className="card-img-top" alt="..." /> */}


            <div className="card-body ">

            <span className="badge text-bg-dark " style={{ position: 'absolute', left: '-4px', top: '-6px' }}>{curnote.Tag}</span>

                <h5 className="card-title my-1 "> {curnote.Title} </h5>
                <div className="d-flex flex-row-reverse position-absolute top-0 end-0">
                    <i className="fa-solid fa-trash-can mx-2 my-1" style={{ cursor: 'pointer' }} onClick={del} ></i>
                    <i className="fa-solid fa-pen-to-square me-2 my-1" style={{ cursor: 'pointer' }}  onClick={upd} ></i>



                </div>


                <p className="card-text">{curnote.Description }</p>

            </div>
        </div>
    )
}
