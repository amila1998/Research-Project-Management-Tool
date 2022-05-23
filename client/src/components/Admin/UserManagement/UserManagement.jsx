import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ViewUserDetails from '../../utils/AdminViewUser/ViewUserDetails';



import './usermanagement.scss';
// import { styled } from '@mui/material';

// const BootstrapButton = styled(Button)({
//     boxShadow: 'none',
//     textTransform: 'none',
//     fontSize: 16,
//     padding: '6px 12px',
//     border: '1px solid',
//     lineHeight: 1.5,
//     color:'#000000',
//     borderColor: '#ff6a06',
//     fontFamily: [
//       '-apple-system',
//       'BlinkMacSystemFont',
//       '"Segoe UI"',
//       'Roboto',
//       '"Helvetica Neue"',
//       'Arial',
//       'sans-serif',
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(','),
//     '&:hover': {
//       backgroundColor: '#ff6a06',
//       borderColor: '#ff6a06',
//       boxShadow: 'none',
//     },
   
//   });

// const Transition = React.forwardRef(function Transition(props, ref) {
//     return <Slide direction="up" ref={ref} {...props} />;
//   });
  
  

const UserManagement = () => {
    const [isVerify,setIsVeryfiy]=useState(false);
    const [search,setSearch]=useState("");
    const [sort,setSort]=useState("asc");
    const [role,setRole]=useState("");
    const [users,setUsers]=useState([]);
    


    
  
    useEffect(() => {
      const getAllUsers=async()=>{
        try {
          const res = await axios.get(`/api/admin/getallUsers?isVerify=${isVerify}&createdAt${sort}&role=${role}&keyword=${search}`,{
            withCredentials:true
          });
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
      <div className='table-page'>
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
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(items => (
                            <tr key={items._id}>
                                <td>{items._id}</td>
                                <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                                <td>{items.email}</td>
                                <td>{items.role}</td>
                                <td>{items.isverify?"true":'false'}</td>
                                <td>  
                                    <ViewUserDetails data={items}/>
                                   
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            </div>
      </>
    
  )
}

export default UserManagement