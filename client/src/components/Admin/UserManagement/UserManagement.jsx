import axios from 'axios';
import React, { useEffect, useState } from 'react'

const UserManagement = () => {
    const [isVerify,setIsVeryfiy]=useState(false);
    const [search,setSearch]=useState("");
    const [sort,setSort]=useState("asc");
    const [role,setRole]=useState("");
    const [users,setUsers]=useState([]);
  
    useEffect(() => {
      const getAllUsers=async()=>{
        try {
          const res = await axios.get(`/api/admin/getallUsers?isVerify=${isVerify}&createdAt${sort}&role=${role}&keyword=${search}`);
          setUsers(res.data.users);
        } catch (error) {
          console.log(error)
        }
      }
      getAllUsers();
    }, [])

    console.log(users);
  return (
      <>
      <h1>User Management</h1>
      <div>
          
      </div>
      </>
    
  )
}

export default UserManagement