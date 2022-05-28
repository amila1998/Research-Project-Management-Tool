import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';
import Avatar from '../Avatar/Avatar';
import "./profile.scss";
import unverify from "../../assets/img/unverify.png"
import verify from "../../assets/img/verify.png"

const Profile = () => {
    const { user, isCoSupervisor,isPanelMember,isSupervisor } = useContext(AuthContext);
    console.log(user);
  return (
    <div className='myprofile'>
      <h1 className="userpro">User Profile{user.isverify?<><img type="button" src={verify} class="fa-solid fa-badge-check btn verfybatch" data-toggle="tooltip" data-placement="top" title="This is a Verification of Admin"/>
</>:<>
<img type="button" src={unverify} class="fa-solid fa-badge-check btn verfybatch" data-toggle="tooltip" data-placement="top" title="This is a Verification of Admin"/>
</>}</h1><br/>
        <div className='profile_avatar'>
        <div className="profile_avatar-wrapper" >
            <Avatar />
        </div>
        </div>
        
        <div className='row'>
          <div className='col   '><h5>Name</h5></div>
          <div className='col'>:</div>
          <div className='col'>{user.name}</div>
        </div>
        <div className='row'>
          <div className='col   '><h5>Email</h5></div>
          <div className='col'>:</div>
          <div className='col'> {user.email}</div>
        </div>
        <div className='row'>
          <div className='col   '><h5>Role</h5></div>
          <div className='col'>:</div>
          <div className='col'>{user.role}</div>
        </div>
        <div className='row'>
          <div className='col   '><h5>Gender</h5></div>
          <div className='col'>:</div>
          <div className='col'>{user.gender}</div>
        </div>
        {user.role=="student"&&<>
        <div className='row'>
          <div className='col   '><h5>Faculty</h5></div>
          <div className='col'>:</div>
          <div className='col'>{user.student.faculty}</div>
        </div>
        <div className='row'>
          <div className='col'><h5>Degree</h5></div>
          <div className='col'>:</div>
          <div className='col'>{user.student.degree}</div>
        </div>
        <div className='row'>
          <div className='col   '><h5>Specialization</h5></div>
          <div className='col'>:</div>
          <div className='col'>{user.student.specialization}</div>
        </div>
        <div className='row'>
          <div className='col   '><h5>Batch</h5></div>
          <div className='col'>:</div>
          <div className='col'>{user.student.batch}</div>
        </div>
        
        </>}
        {user.role=="supervisor"&&<>
        hi
        </>}
       
        
           
        
   
   
    </div>
    
  )
}

export default Profile