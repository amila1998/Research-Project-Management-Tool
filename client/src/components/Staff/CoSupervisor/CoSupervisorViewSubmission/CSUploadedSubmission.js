import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CSUploadedOne } from './CSUploadedOne';



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
    <div>CSUploadedSubmission

{allMyGroups.map((i)=>
        <div key={i._id}>
        
         {i.map((s)=>
         
        <div key={s._id}>
          {/* {s.groupID} */}
          <CSUploadedOne subId={s._id}/>
        </div> 
         
         )}
          

        </div>)}


    </div>
  )
}
