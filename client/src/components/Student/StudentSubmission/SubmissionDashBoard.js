import React, { useEffect,useState} from 'react'
import { event } from "../../Admin/SubmissionTypeManagement/Redux/Axios/event"
import axios from "axios";
import { SubmitInformation } from './SubmitInformation';
import { Hidden } from '@mui/material';
axios.defaults.withCredentials = true;


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';

const bull = { 
    // position: 'absolute',
    // top: '50%',
    // left: '50%',
    // transform: 'translate(-50%, -50%)',
    width: "75%",
    height: "auto",
    bgcolor: 'background.paper',
    border: '1px solid #000',
    // overflow: 'scroll',
    boxShadow: 24,
    p: 4,}
  ;


const SubmissionDashBoard =  ({myGroup}) => {
    // const result = await event.get(`/`);
    // console.log('result')
    const[events,setevents]=useState([]);
    console.log("🚀 ~ file: SubmissionDashBoard.js ~ line 11 ~ SubmissionDashBoard ~ events", events)
    
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
        
        <center>
            <Card sx={bull}>
                <center>
                <CardActions>

                <SubmitInformation evt={evt} group={myGroup}/>
                
                </CardActions>
                </center>
            </Card>
        </center>
            <br/>
        </>
    ))}
  
    </div>
  )
}

export default SubmissionDashBoard