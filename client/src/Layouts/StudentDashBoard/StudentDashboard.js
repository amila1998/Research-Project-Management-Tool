import CreateGroup from '../../components/Student/StudentGroup/CreateGroup';
import ProfileUpdate from '../../components/Profile/ProfileUpdate';
import Profile from "../../components/Profile/Profile";
import DashBoard from "../../components/Student/DashBoard/DashBoard";
import "./studentDashboard.scss"
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { AiFillHome, AiFillCaretDown, AiFillCaretRight } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaUserEdit } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import { MdSupervisedUserCircle, MdDriveFolderUpload, MdDocumentScanner } from "react-icons/md";
import { } from "react-icons/gr";
import axios from "axios";

const StudentDashboard = () => {
    const navigate = useNavigate()
    const { dispatch, user, isLoggedIn, isAdmin, isCoSupervisor, isPanelMember, isSupervisor } = useContext(AuthContext);

    const [dashboard, setDashboard] = useState(true);
    const [profile, setProfile] = useState(false);
    const [updateProfile, setUpdateProfile] = useState(false);
    const [groupRegistration, setGroupRegistration] = useState(false);
    const [uploadTemplates, setUploadTemplates] = useState(false);
    const [submissionTypeManagement, setSubmissionTypeManagement] = useState(false);


    const handleDashboard = () => {
        setDashboard(true);
        setProfile(false);
        setUpdateProfile(false);
        setGroupRegistration(false);
        setUploadTemplates(false);
        setSubmissionTypeManagement(false);
        navigate('/')
    };

    const handleProfile = () => {
        setDashboard(false);
        setProfile(true);
        setUpdateProfile(false);
        setGroupRegistration(false);
        setUploadTemplates(false);
        setSubmissionTypeManagement(false);
    }
    const handleUpdateProfile = () => {
        setDashboard(false);
        setProfile(profile);
        setGroupRegistration(false);
        setUploadTemplates(false);
        setUpdateProfile(!updateProfile);
        setSubmissionTypeManagement(false);
    }

    const handleGroupRegistration = () => {
        setDashboard(false);
        setProfile(false);
        setGroupRegistration(true);
        setUpdateProfile(false);
        setUploadTemplates(false);
        setSubmissionTypeManagement(false);
    }

    const handleUploadTemplates = () => {
        setDashboard(false);
        setProfile(false);
        setGroupRegistration(false);
        setUpdateProfile(false);
        setUploadTemplates(true);
        setSubmissionTypeManagement(false);
    }

    const handleSubmissionTypeManagement = () => {
        setDashboard(false);
        setProfile(false);
        setGroupRegistration(false);
        setUpdateProfile(false);
        setUploadTemplates(false);
        setSubmissionTypeManagement(true);
    }

    const logoutHandleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.get("/api/auth/signout")
            localStorage.removeItem("_appSignging")
            sessionStorage.clear();
            dispatch({ type: "SIGNOUT" })

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="dashboard">
                <div className="left">

                    <div onClick={handleDashboard} className={dashboard ? 'nav1Select' : 'nav1'}>
                        <div className={dashboard ? "navIconSelect" : "navIcon"}><AiFillHome /></div>
                        <div className={dashboard ? 'navTextSelect' : 'navText'}>DASHBOARD</div>
                    </div>
                    <div onClick={handleGroupRegistration} className={groupRegistration ? 'nav1Select' : 'nav1'}>
                        <div className={groupRegistration ? "navIconSelect" : "navIcon"}><MdSupervisedUserCircle /></div>
                        <div className={groupRegistration ? 'navTextSelect' : 'navText'}>GROUP REGISTRATION</div>
                    </div>
                    <div onClick={handleSubmissionTypeManagement} className={submissionTypeManagement ? 'nav1Select' : 'nav1'}>
                        <div className={submissionTypeManagement ? "navIconSelect" : "navIcon"}><MdDocumentScanner /></div>
                        <div className={submissionTypeManagement ? 'navTextSelect' : 'navText'}>SUBMISSION TYPE MANAGEMENT</div>
                    </div>
                    <div onClick={handleUploadTemplates} className={uploadTemplates ? 'nav1Select' : 'nav1'}>
                        <div className={uploadTemplates ? "navIconSelect" : "navIcon"}><MdDriveFolderUpload /></div>
                        <div className={uploadTemplates ? 'navTextSelect' : 'navText'}>TEMPLATES MANAGEMENT</div>
                    </div>

                    <hr></hr>

                    <div onClick={handleProfile} className={profile ? 'nav1Select' : 'nav1'}>
                        <div className={profile ? "navIconSelect" : "navIcon"}><CgProfile /></div>
                        <div className={profile ? 'navTextSelect' : 'navText'}>PROFILE</div>
                        <div className={profile ? 'downSelect' : 'down'}>{profile ? <AiFillCaretDown /> : <AiFillCaretRight />}</div>
                    </div>
                    {
                        profile && <>
                            <div onClick={handleUpdateProfile} className={updateProfile ? 'subnav1Select' : 'subnav1'}>
                                <div className={updateProfile ? "navIconSelect" : "navIcon"}><FaUserEdit /></div>
                                <div className={updateProfile ? 'navTextSelect' : 'navText'}>UPDATE PROFILE</div>
                            </div>

                        </>
                    }

                    <hr></hr>

                    <div onClick={logoutHandleClick} className={'nav1logout'}>
                        <div className={"navIconlogout"}><BiLogOutCircle /></div>
                        <div className={'navTextlogout'}>LOGOUT</div>
                    </div>

                </div>
                <div className="student-dashboard">
                    {dashboard && <DashBoard />}
                    {profile && !updateProfile ? <Profile /> : profile && updateProfile && <ProfileUpdate />}
                    {groupRegistration && <CreateGroup />}
                </div>
            </div>
        </>
    );
}

export default StudentDashboard;