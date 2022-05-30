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
import  "./rqSupervisor.scss";

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


const RequestSupervisor = ({topic,group}) => {
  const [supervisors,setSupervisors]=useState([]);
  const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);    
    }


    useEffect(() => {
      const getSupervisor = async()=>{
        try {
          const res = await axios.get(`/api/supervisor/getsupervisortoreq/${topic._id}/${group._id}`)
          setSupervisors(res.data)
        } catch (error) {
          console.log("🚀 ~ file: RequestSupervisor.jsx ~ line 42 ~ getSupervisor ~ error", error)
          
        }
      }
      getSupervisor();
    }, [topic,group])


    const requestHandler=async(supervisor)=>{
      try {
        const res = await axios.post(`/api/supervisor/sendRequest/${group._id}`,{supervisor:supervisor});
        toast.success(res.data.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        window.location.href=('/')
      } catch (error) {
      console.log("🚀 ~ file: RequestSupervisor.jsx ~ line 54 ~ requestHandler ~ error", error)
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
     
      }
    }
    
  return (
    <div> <ToastContainer/>
    <h1>REQUEST SUPERVISOR</h1>
    <div className='cardBody'>
      {supervisors.map(item=>
        <div key={item._id}>
      <div key={item._id} className="card cardw" >
        <img src={item.logo} className="card-img-top" alt={item.name}/>
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text">{item.staff?.description}</p>
          <div className='row'>
          <div className='col'>
            <button className='btn btn-outline-warning' onClick={handleOpen}>VIEW</button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  {item.name}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <>
                  <div className='row'>
                    <div className='col fw-bold'>Email :</div> {item.email}
                  </div>
                  <br/>
                  <div className='row'>
                  <div className='col fw-bold'>Role :</div> {item.role}
                  </div>
                  <br/>
                  <div className='row'>
                    <br/>
                    <div className='col fw-bold'>Interested Topics :</div> {item.staff?.interestedTopics.map(i=>
                      <>
                      <div className='row'>{i}</div>
                      
                      </>
                      )}
                  </div>
                
                </>
                </Typography>
              </Box>
            </Modal>
          </div>
          <div className='col'><button onClick={()=>requestHandler(item)} className='btn btn-outline-success'>REQUEST</button></div>
          </div>
        </div>

    </div>
       </div>
      )}
    </div>
    </div>
  )
}

export default RequestSupervisor

