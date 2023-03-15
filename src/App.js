import Navbar from "./components/Navbar";
import {  Routes, Route } from "react-router-dom";
import Notestate from "./context/Notestate";
// import Notes from "./components/Notes";
import Home from "./components/Home";
import Alert from "./components/Alert";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Notescontext from './context/Notescontext'
import { useContext } from 'react'
import About from "./components/About";
// import  dotenv from 'dotenv'
// dotenv.config()

function App() {

  const cont = useContext(Notescontext);
  const { curalert} = cont;
  return (
    <div style={{ backgroundImage: 'linear-gradient(#00ffff61, white)', height: 'auto' }}>
      
    <Notestate>

    
      <Navbar/>
      
      <Alert alert={curalert}/>
      
      
      <div className="container px-3" >
     
      
      <Routes>
        <Route path="/" element={<Home/>}/> 
        <Route  path="/about" element={ <About/> } />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
      </Routes>

      </div>
    

    </Notestate>
    </div>
  );
}

export default App;
