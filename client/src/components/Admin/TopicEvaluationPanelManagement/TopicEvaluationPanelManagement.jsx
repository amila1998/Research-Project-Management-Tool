import React, { useEffect, useState } from 'react'
import axios from "axios";
axios.defaults.withCredentials = true;
import './topicEvaPanalMemManagement.scss'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Select from "react-select";
import InputLabel from "@mui/material/InputLabel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from '../../Loading/Loading';
import UserDetails from '../../utils/ViewUser/UserDetails';



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

const TopicEvaluationPanelManagement = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setPanalMemeber_id('');        
    }
    const [evaPanalMembers,setEvaPanalMembers]=useState([]);
    const [callback,setCallback]=useState(true);
    //console.log("🚀 ~ file: TopicEvaluationPanelManagement.jsx ~ line 38 ~ TopicEvaluationPanelManagement ~ callback", callback)
    const [panalMembers,setPanalMemebers]=useState([]);
    const [loading,setLoading]=useState(false);
    const [panalMember_id,setPanalMemeber_id]=useState();
   
    

    useEffect(() => {
      if(callback){
      const getEvaPanalMembers = async()=>{
      
            try {
                setLoading(true)
                const res = await axios.get('/api/topicEvPanlMem/getAll');
                setEvaPanalMembers(res.data);
                setCallback(false)
                setLoading(false)
            } catch (error) {
                console.log(error);
                setLoading(false)
            }
        }
        getEvaPanalMembers()
      }
    
    }, [callback])

    useEffect(() => {
      if(callback){
        const getPanalMembers = async()=>{
         
              try {
                setLoading(true)
                  const res = await axios.get('/api/topicEvPanlMem/getAllPanaleMem');
                  setPanalMemebers(res.data);
                  setCallback(false)
                  setLoading(false)
              } catch (error) {
              console.log("🚀 ~ file: TopicEvaluationPanelManagement.jsx ~ line 71 ~ getPanalMembers ~ error", error)
              setLoading(false)
              }
          }
          getPanalMembers()
        }
        
      }, [callback])

      const handlePanalMember =(e)=>{
        setPanalMemeber_id(e.value)
      }

      const options = [];
        panalMembers.map((item) =>
            options.push({
                value:item._id,
                label: item.email,
            })
        );

        const handleSubmit=async()=>{
            try {
                setLoading(true)
                const res = await axios.post('/api/topicEvPanlMem/add',{user_id:panalMember_id})
                toast.success(res.data.msg, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                  
                  handleClose()
                  setLoading(false)
            } catch (error) {
                console.log("🚀 ~ file: TopicEvaluationPanelManagement.jsx ~ line 103 ~ handleSubmit ~ error", error)
                toast.error(error.response.data.msg, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                  setLoading(false)
            }
            setCallback(true);

        }
        const handleDelete=async(id)=>{
            try {
                const res = await axios.delete(`/api/topicEvPanlMem/delete/${id}`);
                toast.success(res.data.msg, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                  
                  setLoading(false)
                
            } catch (error) {
            console.log("🚀 ~ file: TopicEvaluationPanelManagement.jsx ~ line 129 ~ handleDelete ~ error", error)
                 toast.error(error.response.data.msg, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                  setLoading(false)
            }
            setCallback(true);
        }
    
  return (
    <div>
        <ToastContainer/>
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
          ADD NEW PANAL MEMBER
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           <>
            <InputLabel id="demo-multiple-chip-label">Select a Panal Member</InputLabel>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      isSearchable
                      name="panalMember_id"
                      options={options}
                      onChange={handlePanalMember}
                    />

                    <br></br>
                  <div className='row'>
                  <button className='btn btn-outline-success' onClick={handleSubmit}>ADD</button>
                  </div>
           
           </>
          </Typography>
        </Box>
      </Modal>
    </div>
    <>
    <br/>
    <div>
    <h4 className="u_manage">You have {evaPanalMembers.length} Panal Members</h4>

<table>
    <thead>
        <tr>
            <th>User ID</th>
            <th>Details</th>
            <th></th>
        </tr>
    </thead>
    {loading?<Loading/>:<>
    <tbody>
        {
            evaPanalMembers.map(items => (
                <tr key={items._id}>
                    <td>{items._id}</td>
                    <td>  
                        <UserDetails member={items}/>
                       
                    </td>
                    <td><button onClick={()=>handleDelete(items._id)} className='btn btn-outline-danger'>Delete</button></td>
                </tr>
            ))
        }
    </tbody>
    
    </>}
    
</table>
    </div>
    </>

    </div>
  )
}

export default TopicEvaluationPanelManagement