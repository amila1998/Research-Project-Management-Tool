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
    const [callback,setCallback]=useState(true);
        
    
    const handleCategory = e => {
        setRole(e.target.value)
        setSearch('')
    }

    
    const handleUnVerify = async (id) => {
      try {
        const res = await axios.patch(
          `/api/admin/verifyUsers/${id}`,
          { isverify: false },
          { withCredentials: true }
        );
        setCallback(true);
        return toast.success(res.data.msg, {
          className: "toast-success",
          bodyClassName: "toast-success",
        });
      } catch (err) {
        toast.error(err.response.data.msg, {
          className: "toast-failed",
          bodyClassName: "toast-failed",
        });
      }
    };

    const handleVerify = async (id) => {
      try {
        const res = await axios.patch(
          `/api/admin/verifyUsers/${id}`,
          { isverify: true },
          { withCredentials: true }
        );
        setCallback(true);
        return toast.success(res.data.msg, {
          className: "toast-success",
          bodyClassName: "toast-success",
        });
      } catch (err) {
        toast.error(err.response.data.msg, {
          className: "toast-failed",
          bodyClassName: "toast-failed",
        });
      }
    };

    const handleDelete = async (id) => {
      try {
        const res = await axios.delete(`/api/admin/deleteUser/${id}`,{ withCredentials: true });
        setCallback(true);
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
        console.log(error);
        toast.error(error.response.data.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };
    
  
    useEffect(() => {
        console.log(search," ",isVerify," ",sort," ",role," " );
      const getAllUsers=async()=>{
        try {
            if (callback) {
          const res = await axios.get(`/api/admin/getallUsers?isVerify=${isVerify}&createdAt=${sort}&role=${role}&keyword=${search}`,{
            withCredentials:true
          });
          setCallback(false);
          setUsers(res.data.users);
        }
        } catch (error) {
          console.log(error)
        }
      }
      getAllUsers();
    }, [isVerify,search,sort,role,callback])

  return (
      <>
      <ToastContainer/>
      <>
      <h1 className="User">User Management</h1>
      <div className='table-page'>
      <div className="filter_menu">
            <div className="row1">
                <span>Filters : </span>
                <select name="category" value={role} onChange={e =>{ setRole(e.target.value);setCallback(true);}} >
                    <option value='' selected>All Users</option>
                    <option value='admin'>Admin</option>
                    <option value='supervisor'>Supervisor</option>
                    <option value='coSupervisor'>Co Supervisor</option>
                    <option value='student'>Student</option>
                 
                    
                </select>
            </div>

            <input type="text" value={search} placeholder="Search by username or email..."
            onChange={e =>{ setSearch(e.target.value.toLowerCase());setCallback(true);}} />
            <div className="row1">
                <span>Verification : </span>
                <select name="category" value={isVerify} onChange={e => {setIsVeryfiy(e.target.value);setCallback(true);}} >
                    <option value='' selected>All</option>
                    <option value='true'>Verified</option>
                    <option value='false'>Not Verified</option>
                 
                    
                </select>
            </div>
            <div className="row1 sort">
                <span>Sort By : </span>
                <select value={sort} onChange={e => {setSort(e.target.value);setCallback(true);}} >
                    <option value=''>Oldest</option>
                    <option value='desc'>Newest</option>
                </select>
            </div>
        </div>

            <h4 className="u_manage">You have {users.length} users</h4>

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
                                <td>{items.isverify?<><button onClick={()=>handleUnVerify(items._id)} className='btn btn-outline-danger'>Unverify</button></>:<><button onClick={()=>handleVerify(items._id)} className='btn btn-outline-success'>Verify</button></>}</td>
                                <td>  
                                    <ViewUserDetails data={items}/>
                                   
                                </td>
                                <td><button onClick={()=>handleDelete(items._id)} className='btn btn-outline-danger'>Delete</button></td>
                            </tr>
                        ))
                    }
                </tbody>
                
                </>}
                
            </table>
            </div>
            </>
      </>
    
  )
}

export default UserManagement