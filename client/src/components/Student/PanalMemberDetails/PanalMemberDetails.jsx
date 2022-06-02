import React, { useEffect, useState } from 'react'
import axios from "axios";
axios.defaults.withCredentials = true;

const PanalMemberDetails = ({group}) => {
console.log("🚀 ~ file: PanalMemberDetails.jsx ~ line 4 ~ PanalMemberDetails ~ group", group)
    const [userDetails,setUserDetails]=useState();

    useEffect(() => {
        const getPanalMember=async()=>{
            
               try {
                   const res = await axios.get(`/api/users/getuserDetails/${group.panelMember.user_id}`);
                   setUserDetails(res.data);
                 
               } catch (error) {
               console.log("🚀 ~ file: GroupSupervisorDetaiils.jsx ~ line 37 ~ getPanalMember ~ error", error)
               }
            }

        getPanalMember();
       }, [group])
    
  return (
    <div> 
        <h1>GROUP PANAL MEMBER</h1>
        <div className='row1 profile_avatar'>
    <div className='col1 profile_avatar-wrapper'><img src={userDetails?.logo}/></div> 
  </div>
  <div className='row1'>
    <div className='col1 fw-bold'>Name :</div> {userDetails?.name}
  </div>
    <div className='row1'>
    <div className='col1 fw-bold'>Email :</div> {userDetails?.email}
  </div>
  <div className='row1'>
  <div className='col1 fw-bold'>Role :</div> {userDetails?.role}
  </div></div>
  )
}

export default PanalMemberDetails