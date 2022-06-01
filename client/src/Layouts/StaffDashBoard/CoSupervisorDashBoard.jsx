import { useContext, useState } from "react";
import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";

import ProfileUpdate from '../../components/Profile/ProfileUpdate';
import "../AdminDashBoard/AdminDashBoard";
import { AiFillHome,AiFillCaretDown,AiFillCaretRight } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaUserEdit } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import { MdSupervisedUserCircle } from "react-icons/md";
import DashBoard from "../../components/Staff/CoSupervisor/DashBoard/DashBoard";
import axios from "axios";
import Profile from "../../components/Profile/Profile";
import UserManagement from "../../components/Admin/UserManagement/UserManagement";
import Requests from "../../components/Staff/CoSupervisor/Requests/Requests";

const CoSupervisorDashBoard = () => {
    const {dispatch, user, isLoggedIn,isAdmin,isCoSupervisor,isPanelMember,isSupervisor } = useContext(AuthContext);
    const [dashboard, setDashboard] = useState(true);
    const [profile, setProfile] = useState(false);
    const [updateprofile, setUpdateProfile] = useState(false);
    const [groupReqManagement, setGroupReqManagement] = useState(false);
  
    const history = useNavigate()
    const handleDashboard = () => {
      setDashboard(true);
      setProfile(false);
      setUpdateProfile(false);
      setGroupReqManagement(false);
      history('/')
    };
  
    const handleProfile = () => {
      setDashboard(false);
      setProfile(true);
      setUpdateProfile(false);
      setGroupReqManagement(false);
    }
    const handleUpdateProfile = () => {
      setDashboard(false);
      setProfile(profile);
      setUpdateProfile(!updateprofile);
      setGroupReqManagement(false);
    }
  
    const handleGroupReqManagement = () => {
      setDashboard(false);
      setProfile(false);
      setUpdateProfile(false);
      setGroupReqManagement(true);
    }
  
    const logoutHadleClick =  async (e) =>{
      e.preventDefault();
      try {
        await axios.get("/api/auth/signout")
        localStorage.removeItem("_appSignging")
        sessionStorage.clear();
        dispatch({type:"SIGNOUT"})
          
      } catch (error) {
        console.log(error);
      }
    }
   
  return (
    <div>
        <div className="dashboard">
           
           <div className="left">
         
          <div onClick={handleDashboard} className={dashboard?'nav1Select':'nav1'}>
          <div className={dashboard?"navIconSelect":"navIcon"}><AiFillHome/></div>
          <div className={dashboard?'navTextSelect':'navText'}>CO SUPERVISOR DASHBOARD</div>
          </div>
          <div onClick={handleGroupReqManagement} className={groupReqManagement?'nav1Select':'nav1'}>
          <div className={groupReqManagement?"navIconSelect":"navIcon"}><MdSupervisedUserCircle/></div>
          <div className={groupReqManagement?'navTextSelect':'navText'}>GROUP REQUEST</div>
          </div>




          <hr></hr>
         
          <div onClick={handleProfile} className={profile?'nav1Select':'nav1'}>
          <div className={profile?"navIconSelect":"navIcon"}><CgProfile/></div>
          <div className={profile?'navTextSelect':'navText'}>PROFILE</div>
          <div className={profile?'downSelect':'down'}>{profile?<AiFillCaretDown/>:<AiFillCaretRight/>}</div>
          </div>
          {
            profile&&<>
          <div onClick={handleUpdateProfile} className={updateprofile?'subnav1Select':'subnav1'}>
          <div className={updateprofile?"navIconSelect":"navIcon"}><FaUserEdit/></div>
          <div className={updateprofile?'navTextSelect':'navText'}>UPDATE PROFILE</div>
          </div>
            
            </>
          }
           <hr></hr>
          
          <div onClick={logoutHadleClick} className={'nav1logout'}>
          <div className={"navIconlogout"}><BiLogOutCircle/></div>
          <div className={'navTextlogout'}>LOGOUT</div>
          </div>
   
          
            
       
     </div>
    
           <div className="right">
          {dashboard&&<DashBoard/>}
          {profile&&!updateprofile?<Profile/>:profile&&updateprofile&&<ProfileUpdate/>}
          {groupReqManagement&&<Requests/>}
           
           </div>
       </div>
    </div>
  )
}

export default CoSupervisorDashBoard