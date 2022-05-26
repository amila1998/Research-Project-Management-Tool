import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ViewUserDetails from '../../utils/AdminViewUser/ViewUserDetails';
import Loading from '../../Loading/Loading'



import './usermanagement.scss';

  

const UserManagement = () => {
    const [isVerify,setIsVeryfiy]=useState("");
    const [search,setSearch]=useState("");
    const [sort,setSort]=useState("");
    const [role,setRole]=useState("");
    const [users,setUsers]=useState([]);
    const [loading,setLoading]=useState(false);

    
    
    const handleCategory = e => {
        setRole(e.target.value)
        setSearch('')
    }

    
  
    useEffect(() => {
        console.log(search," ",isVerify," ",sort," ",role," " );
      const getAllUsers=async()=>{
        try {
        
          const res = await axios.get(`/api/admin/getallUsers?isVerify=${isVerify}&createdAt=${sort}&role=${role}&keyword=${search}`,{
            withCredentials:true
          });
          setUsers(res.data.users);
        } catch (error) {
          console.log(error)
        }
      }
      getAllUsers();
    }, [isVerify,search,sort,role])

    console.log(users);
  return (
      <>
      <h1>User Management</h1>
      <div className='table-page'>
      <div className="filter_menu">
            <div className="row1">
                <span>Filters : </span>
                <select name="category" value={role} onChange={e => setRole(e.target.value)} >
                    <option value='' selected>All Users</option>
                    <option value='admin'>Admin</option>
                    <option value='supervisor'>Supervisor</option>
                    <option value='coSupervisor'>Co Supervisor</option>
                    <option value='student'>Student</option>
                 
                    
                </select>
            </div>

            <input type="text" value={search} placeholder="Search by username or email..."
            onChange={e => setSearch(e.target.value.toLowerCase())} />
            <div className="row1">
                <span>Verification : </span>
                <select name="category" value={isVerify} onChange={e => setIsVeryfiy(e.target.value)} >
                    <option value='' selected>All</option>
                    <option value='true'>Verified</option>
                    <option value='false'>Not Verified</option>
                 
                    
                </select>
            </div>
            <div className="row1 sort">
                <span>Sort By : </span>
                <select value={sort} onChange={e => setSort(e.target.value)} >
                    <option value=''>Oldest</option>
                    <option value='desc'>Newest</option>
                </select>
            </div>
        </div>

            <h4>You have {users.length} users</h4>

            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Date of Created</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Verification</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                {loading?<Loading/>:<>
                <tbody>
                    {
                        users.map(items => (
                            <tr key={items._id}>
                                <td>{items._id}</td>
                                <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                                <td>{items.email}</td>
                                <td>{items.role}</td>
                                <td>{items.isverify?<><button className='btn btn-outline-danger'>Unverify</button></>:<><button className='btn btn-outline-success'>Verify</button></>}</td>
                                <td>  
                                    <ViewUserDetails data={items}/>
                                   
                                </td>
                                <td><button className='btn btn-outline-danger'>Delete</button></td>
                            </tr>
                        ))
                    }
                </tbody>
                
                </>}
                
            </table>
            </div>
      </>
    
  )
}

export default UserManagement