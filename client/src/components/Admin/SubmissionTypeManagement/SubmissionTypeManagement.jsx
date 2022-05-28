import React,{useState} from 'react'
import { Route, Routes, Link} from "react-router-dom"
import MyCalendar from "./Calendar";
import "./style/global.scss"
import AddEvents from "./AddEvents";
import UpdateEvent from "./UpdateEvent";

const SubmissionTypeManagement = () => {
  const [addSubmission,setAddSubmission]=useState(false);


  const addnewHandler=()=>{
    setAddSubmission(!addSubmission)
  }
  return (
    <div><>
    <nav className="navbar navbar-light bg-light">
     
     <div className="container-fluid align-items-center">
       <Link className="navbar-brand ms-2" to="/">
         <h3 className="Agenda">Agenda</h3>
       </Link>
       <span className="navbar-brand mb-0 h2 "><button onClick={addnewHandler} className='btn btn-outline-success'>{addSubmission?"View Calender":"Add New Submission"}</button></span>
     </div>

   </nav>
  { addSubmission?<AddEvents setAddSubmission={setAddSubmission}/>:<MyCalendar/>}
    

    <br/>
    
    <br/>
   
    
    </></div>
  )
}

export default SubmissionTypeManagement