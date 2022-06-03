import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CSUploadedOne } from './CSUploadedOne';

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


export const CSUploadedSubmission = () => {
    const[allMyGroups,setallMyGroups]=useState([]);
    console.log(allMyGroups);
  

  useEffect(() => {
    
    const getSubmitted = async () => {
       
          await axios.get(`/api/submssion/getCoSupervisorsSub/`).then((res) => {
              setallMyGroups(res.data);
          }).catch((err) => {
              console.log("🚀 ~ file: UploadedSubmission.js ~ line 15 ~ awaitaxios.get ~ err", err)

          })
      }
      getSubmitted();
   
  }, [])

  return (
    <div>

{allMyGroups.map((i)=>
        <div key={i._id}>
        
         {i.map((s)=>
         
        <div key={s._id}>
          {/* {s.groupID} */}
             <Card sx={bull}>
               <CardActions>
                  <CSUploadedOne subId={s._id} />
               </CardActions>
             </Card>
        </div> 
         
         )}
          

        </div>)}


    </div>
  )
}
