import React, { useEffect, useState } from 'react'
import axios from "axios";
axios.defaults.withCredentials = true;

const TopicManagement = () => {
  const [topics,setTopics]=useState([]);  

    useEffect(() => {
      const getAllTopics =async()=>{
        try {
          const res = await axios.get('/api/topics/getall');
          setTopics(res.data);
          
        } catch (error) {
        console.log("🚀 ~ file: TopicManagement.jsx ~ line 12 ~ getAllTopics ~ error", error)
          
        }
      }
      getAllTopics();
    }, [])
    

  return (
    <div>
      You have {topics.length} Topics to Eveluvate.

    </div>
  )
}

export default TopicManagement