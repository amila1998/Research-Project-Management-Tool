import axios from 'axios'
import React, { useEffect, useState } from 'react'

const UploadedSubmission = () => {
const[allSubmission,setallSubmission]=useState
console.log("🚀 ~ file: UploadedSubmission.js ~ line 5 ~ UploadedSubmission ~ allSubmission", allSubmission)


// useEffect(() => {
//     const getSubmitted = async () => {
//       try {
//         const res = await axios.get(`/api/submssion/getAll`)
//         setallSubmission(res.data)

//       } catch (error) {
//       console.log("🚀 ~ file: UploadedSubmission.js ~ line 14 ~ getSubmitted ~ error", error)
       

//       }

//     }
//     getSubmitted();

//   }, [])
 


  return (
    <div>UploadedSubmission</div>
  )
}

export default UploadedSubmission