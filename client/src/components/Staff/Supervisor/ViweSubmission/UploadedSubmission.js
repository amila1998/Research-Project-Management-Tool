import axios from 'axios'
import React, { useEffect, useState } from 'react'
import UploadedOne from './UploadedOne';

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
          <UploadedOne  subId={s._id}/>
        </div> 
         
         )}
          

        </div>)}


       


    </div>
  )
}

export default UploadedSubmission