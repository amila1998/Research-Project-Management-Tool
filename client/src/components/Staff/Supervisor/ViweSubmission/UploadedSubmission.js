import axios from 'axios'
import React, { useEffect, useState } from 'react'

const UploadedSubmission = () => {
const[allMyGroups,setallMyGroups]=useState([]);
console.log(allMyGroups)

  useEffect(() => {
    
    const getSubmitted = async () => {
       
          await axios.get(`/api/submssion/getSupervisorsSub`).then((res) => {
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
            {i.eventId}

        </div>)}
    </div>
  )
}

export default UploadedSubmission