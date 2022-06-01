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
import RequestCoSupervisor from '../RequestCoSupervisor/RequestCoSupervisor';

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

const GroupCoSupervisorDetaiils = ({topic,group}) => {
    const [callback,setCallBack]=useState(true);
    const [acceptedCoSupervisor,setAcceptedCoSupervisor]=useState();
    const [prevCoSupervisor,setPrevCoSupervisor]=useState();
    console.log("🚀 ~ file: GroupCoSupervisorDetaiils.jsx ~ line 30 ~ GroupCoSupervisorDetaiils ~ prevCoSupervisor", prevCoSupervisor)
    
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);    
    }
    useEffect(() => {
     const getAcceptedCoSupervisor=async()=>{
         if (callback) {
            try {
                const res = await axios.get(`/api/users/getuserDetails/${group.coSupervisor.user_id}`);
                setAcceptedCoSupervisor(res.data);
              
            } catch (error) {
            console.log("🚀 ~ file: GroupCoSupervisorDetaiils.jsx ~ line 45 ~ getAcceptedCoSupervisor ~ error", error)
            
            }
         }
     }
     getAcceptedCoSupervisor();
    }, [group])

    useEffect(() => {
      const getPrevCoSupervisors =async()=>{
          if(callback){
              try {
                  const res = await axios.get(`/api/prevCoSupervisors/getAll/${group._id}`)
                  setPrevCoSupervisor(res.data)
                  console.log("🚀 ~ file: GroupCoSupervisorDetaiils.jsx ~ line 59 ~ getPrevCoSupervisors ~ res.data", res.data)
                  
              } catch (error) {
              console.log("🚀 ~ file: GroupCoSupervisorDetaiils.jsx ~ line 62 ~ getPrevCoSupervisors ~ error", error)
              
                  
              }
          }
      }
      getPrevCoSupervisors();
    }, [group])
    

    if (group.level===-2) {
      return(
        <>
       <div className='backStep'>Please Try another Topic</div>
        </>
      )
      
    }else if(group.level===3){
      return(<div className='warnStep'>Wait for the Topic Acception a from Topic Evaluvation Panal Member</div>)
        
    }else if(group.level===-2){
      return(<div className='backStep'>Please Try another Topic</div>)
          
    }else{

      return (
        <div>
          {group.coSupervisor.isAccept?<><button className='btn btn-outline-success statusbtn' onClick={handleOpen}><img src={approved} className='statusimg'/> {group.coSupervisor.name} </button></>:
          <>{group.level===5?<><div className='warnStep'>Wait for the Co Supervisor Response.</div></>:<><RequestCoSupervisor topic={topic} group={group}/></>}</>}
          
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  {acceptedCoSupervisor?.name}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <>
                  <div className='row'>
                    <div className='col fw-bold'>Email :</div> {acceptedCoSupervisor?.email}
                  </div>
                  <br/>
                  <div className='row'>
                  <div className='col fw-bold'>Role :</div> {acceptedCoSupervisor?.role}
                  </div>
                  <br/>
                  <div className='row'>
                    <br/>
                    <div className='col fw-bold'>Interested Topics :</div> {acceptedCoSupervisor?.staff?.interestedTopics.map(i=>
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
            {prevCoSupervisor&&
            <>
            <div className='rejtxt'>
            You Have {prevCoSupervisor.cosupervisor?.length} Rejected Supervisors.</div>
            <br/>
            {prevCoSupervisor.cosupervisor?.map(item=>
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

export default GroupCoSupervisorDetaiils