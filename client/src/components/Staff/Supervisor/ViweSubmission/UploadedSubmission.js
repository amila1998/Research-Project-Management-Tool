import axios from 'axios'
import React, { useEffect, useState } from 'react'
import UploadedOne from './UploadedOne';

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


const UploadedSubmission = () => {
const[allMyGroups,setallMyGroups]=useState([]);
console.log("🚀 ~ file: UploadedSubmission.js ~ line 6 ~ UploadedSubmission ~ allMyGroups", allMyGroups)
// const [eventType,seteventType]=useState('document');
// console.log("🚀 ~ file: UploadedSubmission.js ~ line 7 ~ UploadedSubmission ~ eventType", eventType)
console.log(allMyGroups);

  useEffect(() => {
    
    const getSubmitted = async () => {
       
          await axios.get(`/api/submssion/getSupervisorsSub/`).then((res) => {
              setallMyGroups(res.data);
          }).catch((err) => {
              console.log("🚀 ~ file: UploadedSubmission.js ~ line 15 ~ awaitaxios.get ~ err", err)

          })
      }
      getSubmitted();
   
  }, [])
  


  return (

    <div>
      

      {/* {allMyGroups?.map(i=>
            <div key={i._id}><div className='downloadTemp' >{i.groupID}</div></div>
            )} */}

        {allMyGroups.map((i)=>
        <div key={i._id}>
        
         {i.map((s)=>
         
        <div key={s._id}>
          {/* {s.groupID} */}
             <Card sx={bull}>
               <CardActions>
                 <UploadedOne subId={s._id} />

               </CardActions>
             </Card>
        </div> 
         
         )}
          

        </div>)}


       


    </div>
  )
}

export default UploadedSubmission