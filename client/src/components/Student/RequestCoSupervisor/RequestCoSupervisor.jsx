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


const RequestCoSupervisor = ({topic,group}) => {
  const [coSupervisors,setCoSupervisors]=useState([]);
  const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);    
    }


    useEffect(() => {
      const getSupervisor = async()=>{
        try {
          const res = await axios.get(`/api/cosupervisor/getcosupervisortoreq/${topic._id}/${group._id}`)
          console.log("🚀 ~ file: RequestCoSupervisor.jsx ~ line 40 ~ getSupervisor ~ res", res)
    
          setCoSupervisors(res.data)
        } catch (error) {
        console.log("🚀 ~ file: RequestCoSupervisor.jsx ~ line 44 ~ getSupervisor ~ error", error)

          
        }
      }
      getSupervisor();
    }, [topic,group])


    const requestHandler=async(cosupervisor)=>{
      try {
        const res = await axios.post(`/api/cosupervisor/sendRequest/${group._id}`,{coSupervisor:cosupervisor});
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
      console.log("🚀 ~ file: RequestCoSupervisor.jsx ~ line 66 ~ requestHandler ~ error", error)

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
    <div className="Dash">     <h1>REQUEST CO SUPERVISOR</h1></div>
  
    <div className='cardBody'>
      {coSupervisors.map(item=>
        <div key={item._id}>
      <div key={item._id} className="card cardw" >
        <img src={item.logo} className="card-img-top" alt={item.name}/>
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text">{item.staff?.description}</p>
          <div className='row'>
          <div className='col'>
            <button key={item._id} className='btn btn-outline-warning' onClick={handleOpen}>VIEW</button>
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

export default RequestCoSupervisor

