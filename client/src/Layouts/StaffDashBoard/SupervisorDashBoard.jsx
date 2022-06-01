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

import axios from "axios";
import Profile from "../../components/Profile/Profile";
import Requests from "../../components/Staff/Supervisor/Requests/Requests";
import SupervisorDashBoardComp from '../../components/Staff/Supervisor/DashBoard/SupervisorDashBoardComp';


const SupervisorDashBoard = () => {
  
    const {dispatch, user, isLoggedIn,isAdmin,isCoSupervisor,isPanelMember,isSupervisor } = useContext(AuthContext);
    const [dashboard, setDashboard] = useState(true);
    const [profile, setProfile] = useState(false);
    const [updateprofile, setUpdateProfile] = useState(false);
    const [groups, setGroups] = useState(false);
    const [groupsrequests, setGroupRequests]=useState(false);
    const [groupsSubmissions, setGroupSubmissions]=useState(false);

  
    const history = useNavigate()
    const handleDashboard = () => {
      setDashboard(true);
      setProfile(false);
      setUpdateProfile(false);
      setGroupRequests(false);
      setGroupSubmissions(false);
      window.location.href=('/')
    };
  
    const handleProfile = () => {
      setDashboard(false);
      setProfile(true);
      setUpdateProfile(false);
      setGroupRequests(false);
      setGroupSubmissions(false);
    }
    
    const handleUpdateProfile = () => {
      setDashboard(false);
      setProfile(profile);
      setUpdateProfile(!updateprofile);
      setGroupRequests(false);
      setGroupSubmissions(false);
    }

    const handleGroupRequets = () => {
      setDashboard(false);
      setProfile(false);
      setUpdateProfile(false);
      setGroupRequests(true);
      setGroupSubmissions(false);
    }

    const handleGroupSubmissions = () => {
      setDashboard(false);
      setProfile(false);
      setUpdateProfile(false);
      setGroupRequests(false);
      setGroupSubmissions(true);
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
          <div className={dashboard?'navTextSelect':'navText'}>SUPERVISOR DASHBOARD</div>
          </div>
          <div onClick={handleGroupRequets} className={groupsrequests?'nav1Select':'nav1'}>
          <div className={groupsrequests?"navIconSelect":"navIcon"}><AiFillHome/></div>
          <div className={groupsrequests?'navTextSelect':'navText'}>GROUP REQUESTS</div>
          </div>
          <div onClick={handleGroupSubmissions} className={groupsSubmissions?'nav1Select':'nav1'}>
          <div className={groupsSubmissions?"navIconSelect":"navIcon"}><AiFillHome/></div>
          <div className={groupsSubmissions?'navTextSelect':'navText'}>GROUP SUBMISSIONS</div>
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
          {dashboard&&<SupervisorDashBoardComp/>}
          {profile&&!updateprofile?<Profile/>:profile&&updateprofile&&<ProfileUpdate/>}
          {groupsrequests&&<Requests/>}
        
           
           </div>
       </div>


    </div>
  )
}

export default SupervisorDashBoard