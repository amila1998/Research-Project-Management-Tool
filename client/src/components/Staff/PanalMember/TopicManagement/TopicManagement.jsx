import React, { useEffect, useState } from 'react'
import axios from "axios";
import { isAfter } from 'date-fns';
import Loading from '../../../Loading/Loading';
import ViewGroupDetails from '../../../utils/ViewGroupDetails/ViewGroupDetails';
axios.defaults.withCredentials = true;
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TopicManagement = () => {
  const [topics,setTopics]=useState([]);  
  let tobeAcceptTopics =[];
  const [loading,setLoading]=useState(false);
  const [callback,setCallBack]=useState(true);

  for(const t of topics){
    if (t.panalMemberAcception===null) {
      tobeAcceptTopics.push(t)
    }
  }

    useEffect(() => {
      const getAllTopics =async()=>{
        if (callback) {
          try {
            setLoading(true);
            const res = await axios.get('/api/topics/getalltoResponce');
            setTopics(res.data);
            setLoading(false)
            setCallBack(false)
          } catch (error) {
          console.log("🚀 ~ file: TopicManagement.jsx ~ line 12 ~ getAllTopics ~ error", error)
            
          }
        }
      }

      getAllTopics();
    }, [callback])
    console.log(topics);

    const accept =async(item)=>{
      try {
        const res =await axios.post(`/api/topics/panalMemResponse/${item.group_id}/${item._id}`,{
          panalmemberResponse:true,
          level:4
        })
        console.log("🚀 ~ file: TopicManagement.jsx ~ line 47 ~ accept ~ res", res)
        toast.success(res.data.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        
      } catch (error) {
      console.log("🚀 ~ file: TopicManagement.jsx ~ line 39 ~ accept ~ error", error)
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      }
      setCallBack(true)
    }

    const reject =async(item)=>{
      try {
        const res =await axios.post(`/api/topics/panalMemResponse/${item.group_id}/${item._id}`,{
          panalmemberResponse:false,
          level:-2
        })
        console.log("🚀 ~ file: TopicManagement.jsx ~ line 79 ~ reject ~ res", res)
        toast.success(res.data.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } catch (error) {
      console.log("🚀 ~ file: TopicManagement.jsx ~ line 47 ~ reject ~ error", error)
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      }
      setCallBack(true)
    }

    if (loading) {
      return (
        <>
        <Loading/>
        </>
      )
    }else{
      return (
        <div>
          <ToastContainer/>
          You have {tobeAcceptTopics.length} Topics to Eveluvate.
          <div className='table-page'>
          <table>
        <thead>
            <tr>
                <th>Topic ID</th>
                <th>Date of Created</th>
                <th>Topic Name</th>
                <th>Topic Describe</th>
                <th>Group Details</th>
                <th>Related Topics</th>
                <td></td>
                <td></td>
            </tr>
        </thead>
        <tbody>
            {
                tobeAcceptTopics.map(items => (
                    <tr key={items._id}>
                        <td>{items._id}</td>
                        <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                        <td>{items.topicname}</td>
                        <td>{items.topicDescribe}</td>
                        <td><ViewGroupDetails gid={items.group_id}/></td>
                        <td>{items.interestedTopics.map(i=>
                          <div key={i}>{i}<br/></div>
                          )}</td>
                          <td><button onClick={()=>accept(items)} className='btn btn-outline-success'>Accept</button></td>
                          <td><button onClick={()=>reject(items)} className='btn btn-outline-danger'>Reject</button></td>
                    </tr>
                ))
            }
        </tbody>
    </table>
    </div>
    
        </div>
      )
    }

  
}

export default TopicManagement