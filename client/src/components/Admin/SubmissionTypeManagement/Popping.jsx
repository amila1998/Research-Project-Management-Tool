import { Modal, Button } from "react-bootstrap";
import React, { useState } from "react";
import "./style/model.scss"
import { connect } from "react-redux";
import {Link} from "react-router-dom"
import { deleteEventApi, ShowEventsApi, closeEvent } from "./Redux/actions";
import { useNavigate } from "react-router-dom";
import UpdateEvent from './UpdateEvent'

const Popping = ({open, handleClose, event, deleteEventApi, renderStatus, rerender})=> {
  const navigate = useNavigate();
  const {id, describe, title, type, start, end} = event;
  console.log("🚀 ~ file: Popping.jsx ~ line 13 ~ Popping ~ event", event)
  const [update,setUpdate]=useState(false);

   const updateHandler =()=>{
    setUpdate(true);
   }

   const handleDelete =async () => {
     await deleteEventApi(event.id);
     rerender(!renderStatus)
   }

   

   const modal = ()=>{
     return (
      <Modal show={open} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title className="text-capitalize">{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {update?<><UpdateEvent setUpdate={setUpdate}/></>:<>{describe? <p className="lead">{describe}</p>: "No Dsecriptions Yet"}
            <div className="row justify-content-between">
              <p className="col small text-muted text-center pb-0 mb-0">Submission Type: {type}</p>
              <p className="col small text-muted text-center pb-0 mb-0">from: {start}</p>
              <p className="col small text-muted text-center pb-0 mb-0">to: {end}</p>
            </div></>}
          </Modal.Body>
          <Modal.Footer>
     
            <button className="btn btn-outline-warning" onClick={()=>{handleClose()
             rerender(!renderStatus)}}>Close</button>
            {!update&&<> <button onClick={updateHandler} className="btn btn-outline-success" >Update</button>
            </>}
            <button className="btn btn-outline-danger" onClick={handleDelete}>Delete</button>
        </Modal.Footer>
      </Modal>
     )
   }

   if(id){
     return modal()
   }else{
     <p>there is no modal to preview</p>
   }
   
  }

  function mapStateToProps({event}){
     return {
       event,
      //  modalStatus
     }
  }
  
  export default connect(mapStateToProps, {deleteEventApi, closeEvent})(Popping)