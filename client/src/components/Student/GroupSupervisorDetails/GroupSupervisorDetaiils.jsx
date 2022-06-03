import React, { useEffect, useState } from 'react'
import approved from '../../../assets/img/approved.gif'
import rejected from '../../../assets/img/rejected.gif'
import axios from "axios";
axios.defaults.withCredentials = true;
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ViewSupervisorsDetails from '../../utils/ViewSupervisersDetails/ViewSupervisorsDetails'
import RequestSupervisor from '../RequestSupervisor/RequestSupervisor'

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

const GroupSupervisorDetaiils = ({topic,group}) => {
    const [callback,setCallBack]=useState(true);
    const [acceptedSupervisor,setAcceptedSupervisor]=useState();
    const [prevSupervisor,setPrevSupervisor]=useState();
    console.log("🚀 ~ file: GroupSupervisorDetaiils.jsx ~ line 28 ~ GroupSupervisorDetaiils ~ prevSupervisor", prevSupervisor)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);    
    }
    useEffect(() => {
     const getAcceptedSupervisor=async()=>{
         if (callback) {
            try {
                const res = await axios.get(`/api/users/getuserDetails/${group.supervisor.user_id}`);
                setAcceptedSupervisor(res.data);
              
            } catch (error) {
            console.log("🚀 ~ file: GroupSupervisorDetaiils.jsx ~ line 37 ~ getAcceptedSupervisor ~ error", error)
            }
         }
     }
     getAcceptedSupervisor();
    }, [group])

    useEffect(() => {
      const getPrevSupervisors =async()=>{
          if(callback){
              try {
                  const res = await axios.get(`/api/prevSupervisors/getAll/${group._id}`)
                  setPrevSupervisor(res.data)
                  console.log("🚀 ~ file: GroupSupervisorDetaiils.jsx ~ line 54 ~ getPrevSupervisors ~ res.data", res.data)
              } catch (error) {
              console.log("🚀 ~ file: GroupSupervisorDetaiils.jsx ~ line 53 ~ getPrevSupervisors ~ error", error)
                  
              }
          }
      }
      getPrevSupervisors();
    }, [group])
    

    if (group.level===-2) {
      return(
        <>
       <div className='backStep'>Please Try another Topic</div>
        </>
      )
      
    }else{

      return (
        <div>
          <div className="Dash"> <h1>SUPERVISOR DETAILS</h1></div>
          {group.supervisor.isAccept?<><button className='btn btn-outline-success statusbtn' onClick={handleOpen}><img src={approved} className='statusimg'/> {group.supervisor.name} </button></>:
          <>{group.level===2?<><div className='warnStep'>Wait for the Supervisor Response.</div></>:<><RequestSupervisor topic={topic} group={group}/></>}</>}
          
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  {acceptedSupervisor?.name}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <>
                  <div className='row'>
                    <div className='col fw-bold'>Email :</div> {acceptedSupervisor?.email}
                  </div>
                  <br/>
                  <div className='row'>
                  <div className='col fw-bold'>Role :</div> {acceptedSupervisor?.role}
                  </div>
                  <br/>
                  <div className='row'>
                    <br/>
                    <div className='col fw-bold'>Interested Topics :</div> {acceptedSupervisor?.staff?.interestedTopics.map(i=>
                      <>
                      <div className='row'>{i}</div>
                      
                      </>
                      )}
                  </div>
                
                </>
                </Typography>
              </Box>
            </Modal>
            <br/><br/>
            {prevSupervisor&&
            <>
            <div className='rejtxt'>
            You Have {prevSupervisor.supervisor?.length} Rejected Supervisors.</div>
            <br/>
            {prevSupervisor.supervisor?.map(item=>
              <div key={item._id} className='rej'>
                 <img src={rejected} className='statusimg2'/>
                <ViewSupervisorsDetails userid={item.user_id}/>
               
              </div>
              
              )}
            
            </>
            }
          
        </div>
      ) 
    }



}

export default GroupSupervisorDetaiils