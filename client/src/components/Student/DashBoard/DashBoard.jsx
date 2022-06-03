import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SubmissionDashBoard from '../StudentSubmission/SubmissionDashBoard';


const DashBoard = ({group}) => {
// console.log("🚀 ~ file: DashBoard.jsx ~ line 7 ~ DashBoard ~ group", group?.level)

  
  return (
    <div><div className="Dash">Welcome To Student DashBoard</div>
            {group?.level===0&&<><div  className='nextStep'>Next Step:  Register Your Topic under the Topic Registraion</div></>}
            {group?.level===1&&<><div className='nextStep'>Next Step: Request a Supervisor</div></>}
            {group?.level===2&&<><div className='warnStep'>Wait for the Supervisor Response.</div></>}
            {group?.level===-1&&<><div className='backStep'>Please Try another Supervisor</div></>}
            {group?.level===3&&<><div className='warnStep'>Wait for the Topic Acception a from Topic Evaluvation Panal Member</div></>}
            {group?.level===-2&&<><div className='backStep'>Please Try another Topic</div></>}
            {group?.level===4&&<><div className='nextStep'>Next Step: Request a Co Supervisor</div></>}
            {group?.level===5&&<><div className='warnStep'>Wait for the Co Supervisor Response.</div></>}
            {group?.level===-3&&<><div className='backStep'>Please Try another Co Supervisor</div></>}
            {group?.level===6&&<><div className='warnStep'>Wait for Assigning the Panal Member from Admin.</div></>}
            {group?.level===7&&<><div className='nextStep'>COOL !!! , Finally Your Group is Complete all Task. Now you can Submit your Submission before the Deadline</div><br/><SubmissionDashBoard myGroup={group}/></>}
    
    
    

    </div>
  )
}

export default DashBoard