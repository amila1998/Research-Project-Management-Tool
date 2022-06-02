import { useContext, useState } from "react";
import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";

import ProfileUpdate from '../../components/Profile/ProfileUpdate';
import "./admindashboard.scss";
import { AiFillHome,AiFillCaretDown,AiFillCaretRight } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaUserEdit } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import { RiProfileFill } from "react-icons/ri";
import { MdSupervisedUserCircle,MdDriveFolderUpload ,MdDocumentScanner,MdSchema,MdRememberMe} from "react-icons/md";
import {  } from "react-icons/gr";
import DashBoard from "../../components/Admin/DashBoard/DashBoard";
import axios from "axios";
import Profile from "../../components/Profile/Profile";
import UserManagement from "../../components/Admin/UserManagement/UserManagement";
import UploadTemplates from "../../components/Admin/UploadTemplates/UploadTemplates";
import SubmissionTypeManagement from "../../components/Admin/SubmissionTypeManagement/SubmissionTypeManagement";

import {Provider} from "react-redux"
import store, {persistor} from '../../components/Admin/SubmissionTypeManagement/Redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import MarkingSchemaManagement from "../../components/Admin/MarkingSchemaManagement/MarkingSchemaManagement";
import GroupManagement from "../../components/Admin/GroupManagement/GroupManagement";
import EvaluateSubmission from "../../components/Admin/MarkingSchemaManagement/EvaluateSubmission";
import TopicEvaluationPanelManagement from "../../components/Admin/TopicEvaluationPanelManagement/TopicEvaluationPanelManagement";

const AdminDashboard = () => {
  const {dispatch, user, isLoggedIn,isAdmin,isCoSupervisor,isPanelMember,isSupervisor } = useContext(AuthContext);

  const [dashboard, setDashboard] = useState(true);
  const [profile, setProfile] = useState(false);
  const [updateprofile, setUpdateProfile] = useState(false);
  const [userManagement, setUserManagement] = useState(false);
  const [uploadtemplates, setUploadTemplates] = useState(false);
  const [markingSchema, setMarkingSchema] = useState(false);
  const [submissionTypeManagement, setSubmissionTypeManagement] = useState(false);
  const [groupManagement, setGroupManagement] = useState(false);
  const [ topicEvaluationPanelManagement, settopicEvaluationPanelManagement]=useState(false);

const history = useNavigate()
  const handleDashboard = () => {
    setDashboard(true);
    setProfile(false);
    setUpdateProfile(false);
    setUserManagement(false);
    setUploadTemplates(false);
    setSubmissionTypeManagement(false);
    setMarkingSchema(false);
    setGroupManagement(false);
    settopicEvaluationPanelManagement(false);
    window.location.href=('/');
  };

  const handleProfile = () => {
    setDashboard(false);
    setProfile(true);
    setUpdateProfile(false);
    setUserManagement(false);
    setUploadTemplates(false);
    setSubmissionTypeManagement(false);
    setMarkingSchema(false);
    setGroupManagement(false);
    settopicEvaluationPanelManagement(false);
  }
  const handleUpdateProfile = () => {
    setDashboard(false);
    setProfile(profile);
    setUserManagement(false);
    setUploadTemplates(false);
    setUpdateProfile(!updateprofile);
    setSubmissionTypeManagement(false);
    setMarkingSchema(false);
    setGroupManagement(false);
    settopicEvaluationPanelManagement(false);
  }

  const handleUserManagement = () => {
    setDashboard(false);
    setProfile(false);
    setUserManagement(true);
    setUpdateProfile(false);
    setUploadTemplates(false);
    setSubmissionTypeManagement(false);
    setMarkingSchema(false);
    setGroupManagement(false);
    settopicEvaluationPanelManagement(false);
  }

  const handleUploadTemplates = () => {
    setDashboard(false);
    setProfile(false);
    setUserManagement(false);
    setUpdateProfile(false);
    setUploadTemplates(true);
    setSubmissionTypeManagement(false);
    setMarkingSchema(false);
    setGroupManagement(false);
    settopicEvaluationPanelManagement(false);
  }

  const handleSubmissionTypeManagement = () => {
    setDashboard(false);
    setProfile(false);
    setUserManagement(false);
    setUpdateProfile(false);
    setUploadTemplates(false);
    setSubmissionTypeManagement(true);
    setMarkingSchema(false);
    setGroupManagement(false);
    settopicEvaluationPanelManagement(false);
  }

  const handleMakingSchemaManagement =()=>{
    setDashboard(false);
    setProfile(false);
    setUserManagement(false);
    setUpdateProfile(false);
    setUploadTemplates(false);
    setSubmissionTypeManagement(false);
    setMarkingSchema(true);
    setGroupManagement(false);
    settopicEvaluationPanelManagement(false);
  }

  const handleGroupManagement =()=>{
    setDashboard(false);
    setProfile(false);
    setUserManagement(false);
    setUpdateProfile(false);
    setUploadTemplates(false);
    setSubmissionTypeManagement(false);
    setMarkingSchema(false);
    setGroupManagement(true);
    settopicEvaluationPanelManagement(false);
  }

  const topicEvaluationPanelManagementHandler =()=>{
    setDashboard(false);
    setProfile(false);
    setUserManagement(false);
    setUpdateProfile(false);
    setUploadTemplates(false);
    setSubmissionTypeManagement(false);
    setMarkingSchema(false);
    setGroupManagement(false);
    settopicEvaluationPanelManagement(true);
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


  if (isAdmin) {
    return(
      <>
       <div className="dashboard">
           
           <div className="left">
         
          <div onClick={handleDashboard} className={dashboard?'nav1Select':'nav1'}>
          <div className={dashboard?"navIconSelect":"navIcon"}><AiFillHome/></div>
          <div className={dashboard?'navTextSelect':'navText'}>ADMIN DASHBOARD</div>
          </div>
          <div onClick={handleUserManagement} className={userManagement?'nav1Select':'nav1'}>
          <div className={userManagement?"navIconSelect":"navIcon"}><MdSupervisedUserCircle/></div>
          <div className={userManagement?'navTextSelect':'navText'}>USER MANAGEMENT</div>
          </div>
          <div onClick={handleSubmissionTypeManagement} className={submissionTypeManagement?'nav1Select':'nav1'}>
          <div className={submissionTypeManagement?"navIconSelect":"navIcon"}><MdDocumentScanner/></div>
          <div className={submissionTypeManagement?'navTextSelect':'navText'}>SUBMISSION TYPE MANAGEMENT</div>
          </div>
          <div onClick={handleUploadTemplates} className={uploadtemplates?'nav1Select':'nav1'}>
          <div className={uploadtemplates?"navIconSelect":"navIcon"}><MdDriveFolderUpload/></div>
          <div className={uploadtemplates?'navTextSelect':'navText'}>TEMPLATES MANAGEMENT</div>
          </div>
          <div onClick={handleMakingSchemaManagement} className={markingSchema?'nav1Select':'nav1'}>
          <div className={markingSchema?"navIconSelect":"navIcon"}><MdSchema/></div>
          <div className={markingSchema?'navTextSelect':'navText'}>MARKING SCHEMA MANAGEMENT</div>
          </div>
          <div onClick={handleGroupManagement} className={groupManagement?'nav1Select':'nav1'}>
          <div className={groupManagement?"navIconSelect":"navIcon"}><RiProfileFill/></div>
          <div className={groupManagement?'navTextSelect':'navText'}>GROUP MANAGEMENT</div>
          </div>
          <div onClick={topicEvaluationPanelManagementHandler} className={topicEvaluationPanelManagement?'nav1Select':'nav1'}>
          <div className={topicEvaluationPanelManagement?"navIconSelect":"navIcon"}><MdRememberMe/></div>
          <div className={topicEvaluationPanelManagement?'navTextSelect':'navText'}>TOPIC EVALUVATION PANAL MANAGEMENT</div>
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
          {userManagement&&<UserManagement/>}
          {uploadtemplates&&<UploadTemplates/>}
          {submissionTypeManagement&&<>
            <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
            <SubmissionTypeManagement/>
            </PersistGate> 
            </Provider>
            
          
          </>}
          {/* {markingSchema&&<MarkingSchemaManagement/>} */}
          {markingSchema&&<EvaluateSubmission/>}
          {groupManagement&&<GroupManagement/>}
          {topicEvaluationPanelManagement&&<TopicEvaluationPanelManagement/>}
           </div>
       </div>
      
      
      
      
      
      </>
       
    
    );
    
  }else{
    return(
      <>
      NOT FOUND
      </>
    );
  }
  }
    
    export default AdminDashboard;