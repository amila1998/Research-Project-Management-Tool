import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { PMUploadedOne } from './PMUploadedOne';

export const PMUploadedSubmission = () => {
    const[allMyGroups,setallMyGroups]=useState([]);
    console.log("🚀 ~ file: PMUploadedSubmission.js ~ line 6 ~ PMUploadedSubmission ~ allMyGroups", allMyGroups)
    
 
    useEffect(() => {
    
        const getSubmitted = async () => {
           
              await axios.get(`/api/submssion/getPanalMemberSub/`).then((res) => {
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
          <PMUploadedOne subId={s._id}/>
        </div> 
         
         )}
          

        </div>)}


    </div>
  )
}
