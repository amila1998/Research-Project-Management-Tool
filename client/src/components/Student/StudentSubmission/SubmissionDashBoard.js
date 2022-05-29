import React, { useEffect,useState} from 'react'
import { event } from "../../Admin/SubmissionTypeManagement/Redux/Axios/event"
import axios from "axios";
import { SubmitInformation } from './SubmitInformation';
import { Hidden } from '@mui/material';
axios.defaults.withCredentials = true;
const SubmissionDashBoard =  () => {
    // const result = await event.get(`/`);
    // console.log('result')
    const[events,setevents]=useState([]);
    
useEffect(()=>{
    const getEvent= async()=>{

        const result = await event.get(`/got`).then((res)=>{
            setevents(res.data);
        }).catch((err)=>{
            console.log("🚀 ~ file: SubmissionDashBoard.js ~ line 14 ~ result ~ err", err)
           
        })
    }
    getEvent()
},[])
  return (
    <div>
    {events.map((evt)=>(
        // <a href="#"><h3>{evt.title}</h3></a>
        <>
        <SubmitInformation evt={evt}/>
        
        </>
    ))}
  
    </div>
  )
}

export default SubmissionDashBoard