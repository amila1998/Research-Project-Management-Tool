import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';
import Avatar from '../Avatar/Avatar';
import "./profile.scss";

const Profile = () => {
    const { user, isCoSuprevisor,isPanelMember,isSupervisor } = useContext(AuthContext);
    console.log(user);
  return (
    <div className='myprofile'>
        <div className='profile_avatar'>
        <div className="profile_avatar-wrapper" >
            <Avatar />
        </div>
        </div>
        
        <div className='row1'>
          <div className='col1   '><h5>Name</h5></div>
          <div className='col1'>:</div>
          <div className='col1'>{user.name}</div>
        </div>
        <div className='row1'>
          <div className='col1   '><h5>Email</h5></div>
          <div className='col1'>:</div>
          <div className='col1'> {user.email}</div>
        </div>
        <div className='row1'>
          <div className='col1   '><h5>Role</h5></div>
          <div className='col1'>:</div>
          <div className='col1'>{user.role}</div>
        </div>
        <div className='row1'>
          <div className='col1   '><h5>Gender</h5></div>
          <div className='col1'>:</div>
          <div className='col1'>{user.gender}</div>
        </div>
        {user.role=="student"&&<>
        <div className='row1'>
          <div className='col1   '><h5>Faculty</h5></div>
          <div className='col1'>:</div>
          <div className='col1'>{user.student.faculty}</div>
        </div>
        <div className='row1'>
          <div className='col1'><h5>Degree</h5></div>
          <div className='col1'>:</div>
          <div className='col1'>{user.student.degree}</div>
        </div>
        <div className='row1'>
          <div className='col1   '><h5>Specialization</h5></div>
          <div className='col1'>:</div>
          <div className='col1'>{user.student.specialization}</div>
        </div>
        <div className='row1'>
          <div className='col1   '><h5>Batch</h5></div>
          <div className='col1'>:</div>
          <div className='col1'>{user.student.batch}</div>
        </div>
        
        </>}
        {user.role=="supervisor"&&<>
        hi
        </>}
       
        
           
        
   
   
    </div>
    
  )
}

export default Profile