import React, { useEffect, useState } from 'react'
import axios from "axios";
axios.defaults.withCredentials = true;
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Select from "react-select";
import InputLabel from "@mui/material/InputLabel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from '../../Loading/Loading';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const RequestSupervisor = () => {
  const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);    
    }
  return (
    <div> <ToastContainer/>
    <div>
  <button className='btn btn-outline-success' onClick={handleOpen}>ADD NEW PANAL MEMBER</button>
  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        SEND A REQUEST TO THE SUPERVISOR
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
       <>
        hi
       
       </>
      </Typography>
    </Box>
  </Modal>
</div></div>
  )
}

export default RequestSupervisor