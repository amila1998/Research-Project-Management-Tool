import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';
import Avatar from '../Avatar/Avatar';

const Profile = () => {
    const { user, token, dispatch } = useContext(AuthContext);
    console.log(user);
  return (
    <div className='profile'>
        <div className='profile_avatar'></div>
        <div className="profile_avatar-wrapper" >
            <Avatar />
        </div>
    

    </div>
  )
}

export default Profile