import React, { useEffect, useState } from 'react';
import axios from "axios";
axios.defaults.withCredentials = true;
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from '../../../Loading/Loading'
import UserDetails from '../../../utils/ViewUser/UserDetails';
import ViewTopicDetails from '../../../utils/ViewTopicDetails/ViewTopicDetails';

const Requests = () => {
    ///api/supervisor/getmygrouprequests
    const [myRequests,setMyRequests]=useState([]);
    const [callback,setCallback]=useState(true);
    const [loading,setLoading]=useState(false);

    useEffect(() => {
        const getMyRequests= async()=>{
            if (callback) {
                try {
                    setLoading(true)
                    const res = await axios.get(`/api/supervisor/getmygrouprequests`);
                    setMyRequests(res.data);
                    setLoading(false);
                    setCallback(false);
                 
                } catch (error) {
                console.log("🚀 ~ file: Requests.jsx ~ line 18 ~ getMyRequests ~ error", error)
                    
                }
            }
        } 
     getMyRequests();
    }, [callback])
    
    const conformHandler =async(id)=>{
    try {
        const res = await axios.post(`/api/supervisor/giveResponse/${id}`,{
            supervisorResponse:true,
            level:3
        })
        console.log("🚀 ~ file: Requests.jsx ~ line 39 ~ conformHandler ~ res", res)
        toast.success(res.data.msg ,{
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
    } catch (error) {
        toast.error(error.response.data.msg ,{
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
    }
    setCallback(true);

    }

    const rejectmHandler=async(id)=>{
        try {
            const res = await axios.post(`/api/supervisor/giveResponse/${id}`,{
                supervisorResponse:false,
                level:-1
            })
            console.log("🚀 ~ file: Requests.jsx ~ line 67 ~ rejectmHandler ~ res", res)
            toast.success(res.data.msg ,{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        } catch (error) {
            console.log("🚀 ~ file: Requests.jsx ~ line 78 ~ rejectmHandler ~ error", error)
            toast.error(error.response.data.msg ,{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        }
        setCallback(true)
    }

  return (
    <div >
{loading?<><div className='loadingBody'><Loading/></div></>:<>
<ToastContainer/>
<div className="Dash">
You have {myRequests.length} Requests

</div>
<br/>
<table>
    <thead>
        <tr>
            <th>Group ID</th>
            <th>Date of Created</th>
            <th>Group Name</th>
            <th>Topic</th>
            <th>Members</th>
            <th></th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        {
            myRequests.map(items => (
            
                
                <tr key={items._id}>
                    {console.log("🚀 ~ file: Requests.jsx ~ line 55 ~ Requests ~ items", items)}
                    <td>{items._id}</td>
                    <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                    <td>{items.groupName}</td>
                    <td><ViewTopicDetails group={items}/></td>
                    <td>
                    <table>
                        <thead>
                            <tr>
                             </tr>
                        </thead>
                        <tbody>
                            {items.members.map(member=>
                                 <tr key={member.user_id}>
                                        <td><UserDetails member={member}/></td>
                                 </tr>
                                
                                )}
                        </tbody>
                    </table>

                    </td>
                    <td><button onClick={()=>conformHandler(items._id)} className='btn btn-outline-success'>Accept</button></td>
                    <td><button onClick={()=>rejectmHandler(items._id)} className='btn btn-outline-danger'>Reject</button></td>
                </tr>
            ))
        }
    </tbody>
</table>

</>}


    </div>
  )
}

export default Requests