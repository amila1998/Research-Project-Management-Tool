import CreateGroup from '../../components/Student/StudentGroup/CreateGroup';
import ProfileUpdate from '../../components/Profile/ProfileUpdate';
import Profile from "../../components/Profile/Profile";
import DashBoard from "../../components/Student/DashBoard/DashBoard";
import "./studentDashboard.scss"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { AiFillHome, AiFillCaretDown, AiFillCaretRight } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaUserEdit } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import { MdSupervisedUserCircle, MdDriveFolderUpload, MdDocumentScanner,MdTopic } from "react-icons/md";
import { } from "react-icons/gr";
import axios from "axios";
import StudentGroupDetails from '../../components/Student/StudentGroupDetails/StudentGroupDetails';
import TopicRegistration from '../../components/Student/TopicRegistration/TopicRegistration';
axios.defaults.withCredentials = true;

const StudentDashboard = () => {
    const navigate = useNavigate()
    const { dispatch, user, isLoggedIn, isAdmin, isCoSupervisor, isPanelMember, isSupervisor } = useContext(AuthContext);
    const [myGroup,setMyGroup]=useState();
    const [dashboard, setDashboard] = useState(true);
    const [profile, setProfile] = useState(false);
    const [updateProfile, setUpdateProfile] = useState(false);
    const [groupRegistration, setGroupRegistration] = useState(false);
    const [topicRegistration,setTopicRegistration]=useState(false);



    //console.log(user.student?.haveAGroup);

    useEffect(() => {
        ///api/group/getmygroup
            const getMyGroup =async()=>{
                if(user.student?.haveAGroup){
                    const res=await axios.get(`/api/group/getmygroup/${user._id}`)
                    setMyGroup(res.data);
            }
        }

        getMyGroup();
    }, [user])
    


    const handleDashboard = () => {
        setDashboard(true);
        setProfile(false);
        setUpdateProfile(false);
        setGroupRegistration(false);
        setTopicRegistration(false);

        navigate('/')
    };

    const handleProfile = () => {
        setDashboard(false);
        setProfile(true);
        setUpdateProfile(false);
        setGroupRegistration(false);
        setTopicRegistration(false);

    }
    const handleUpdateProfile = () => {
        setDashboard(false);
        setProfile(profile);
        setGroupRegistration(false);
        setUpdateProfile(!updateProfile);
        setTopicRegistration(false);
  
    }

    const handleGroupRegistration = () => {
        setDashboard(false);
        setProfile(false);
        setGroupRegistration(true);
        setUpdateProfile(false);
        setTopicRegistration(false);

    }

    const handleTopicRegistration =()=>{
        setDashboard(false);
        setProfile(false);
        setUpdateProfile(false);
        setGroupRegistration(false);
        setTopicRegistration(true);

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
                    {user.student?.haveAGroup&&
                    <div onClick={handleTopicRegistration} className={topicRegistration ? 'nav1Select' : 'nav1'}>
                        <div className={topicRegistration ? "navIconSelect" : "navIcon"}><MdTopic /></div>
                        <div className={topicRegistration ? 'navTextSelect' : 'navText'}>TOPIC REGISTRATION</div>
                    </div>
                     }
                    <div onClick={handleGroupRegistration} className={groupRegistration ? 'nav1Select' : 'nav1'}>
                    <div className={groupRegistration ? "navIconSelect" : "navIcon"}><MdSupervisedUserCircle /></div>
                    <div className={groupRegistration ? 'navTextSelect' : 'navText'}>{user.student?.haveAGroup?"GROUP DETAILS":"GROUP REGISTRATION"}</div>
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
                    {groupRegistration &&user.student?.haveAGroup? <StudentGroupDetails groupData={myGroup}/>:groupRegistration &&<CreateGroup />}
                    {topicRegistration&&<TopicRegistration/>}
                </div>
            </div>
        </>
    );
}

export default StudentDashboard;