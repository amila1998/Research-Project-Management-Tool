import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SubmissionDashBoard from '../StudentSubmission/SubmissionDashBoard';


const DashBoard = ({group}) => {

  
  return (
    <div>Welcome To Student DashBoard
    <SubmissionDashBoard myGroup={group}/>

    </div>
  )
}

export default DashBoard