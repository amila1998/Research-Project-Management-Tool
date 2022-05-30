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
import { BsFillChatDotsFill } from "react-icons/bs";
import { MdSupervisedUserCircle, MdDriveFolderUpload, MdDocumentScanner,MdTopic } from "react-icons/md";
import { } from "react-icons/gr";
import axios from "axios";
import StudentGroupDetails from '../../components/Student/StudentGroupDetails/StudentGroupDetails';
import TopicRegistration from '../../components/Student/TopicRegistration/TopicRegistration';
import TopicDetails from '../../components/Student/TopicDetails/TopicDetails';
import GroupChat from '../../components/GroupChat/GroupChat';
import RequestSupervisor from '../../components/Student/RequestSupervisor/RequestSupervisor';
axios.defaults.withCredentials = true;

const StudentDashboard = () => {
    const navigate = useNavigate()
    const { dispatch, user, isLoggedIn, isAdmin, isCoSupervisor, isPanelMember, isSupervisor } = useContext(AuthContext);
    const [myGroup,setMyGroup]=useState();
    const [topicDetails,setTopicDetail]=useState();

    const [dashboard, setDashboard] = useState(true);
    const [profile, setProfile] = useState(false);
    const [updateProfile, setUpdateProfile] = useState(false);
    const [groupRegistration, setGroupRegistration] = useState(false);
    const [topicRegistration,setTopicRegistration]=useState(false);
    const [groupchat,setGroupChat]=useState(false);
    const [requestSupervisor,setRequestSupervisor]=useState(false);



    //console.log(myGroup);

    useEffect(() => {
        ///api/group/getmygroup
            const getMyGroup =async()=>{
                if(user.student?.haveAGroup){
                    try {
                        const res=await axios.get(`/api/group/getmygroup/${user._id}`)
                        setMyGroup(res.data);
                    } catch (error) {
                        console.log(error);
                    }
            }
        }

        getMyGroup();
    }, [user])


    useEffect(() => {
            if (myGroup?.haveTopic) {
                const getTopicDetails =async()=>{
                    try {
                        const res = await axios.get(`/api/topics/getmyTopicDetails/${myGroup?._id}`);
                        setTopicDetail(res.data); 
                    } catch (error) {
                        console.log(error);  
                    }
                 }
                 getTopicDetails();
            }
    }, [myGroup?.haveTopic,myGroup?._id])
    
    


    const handleDashboard = () => {
        setDashboard(true);
        setProfile(false);
        setUpdateProfile(false);
        setGroupRegistration(false);
        setTopicRegistration(false);
        setGroupChat(false);
        setRequestSupervisor(false);
        window.location.href=('/');
    };

    const handleProfile = () => {
        setDashboard(false);
        setProfile(true);
        setUpdateProfile(false);
        setGroupRegistration(false);
        setTopicRegistration(false);
        setGroupChat(false);
        setRequestSupervisor(false);
    }
    const handleUpdateProfile = () => {
        setDashboard(false);
        setProfile(profile);
        setGroupRegistration(false);
        setUpdateProfile(!updateProfile);
        setTopicRegistration(false);
        setGroupChat(false);
        setRequestSupervisor(false);
    }

    const handleGroupRegistration = () => {
        setDashboard(false);
        setProfile(false);
        setGroupRegistration(true);
        setUpdateProfile(false);
        setTopicRegistration(false);
        setGroupChat(false);
        setRequestSupervisor(false);
    }

    const handleTopicRegistration =()=>{
        setDashboard(false);
        setProfile(false);
        setUpdateProfile(false);
        setGroupRegistration(false);
        setTopicRegistration(true);
        setGroupChat(false);
        setRequestSupervisor(false);
    } 

    const handleGroupChat = () => {
        setDashboard(false);
        setProfile(false);
        setUpdateProfile(false);
        setGroupRegistration(false);
        setTopicRegistration(false);
        setGroupChat(true);
        setRequestSupervisor(false);
    } 

    const handleRequestSupervisor = () => {
        setDashboard(false);
        setProfile(false);
        setUpdateProfile(false);
        setGroupRegistration(false);
        setTopicRegistration(false);
        setGroupChat(false);
        setRequestSupervisor(true);
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
                    <div onClick={handleRequestSupervisor} className={requestSupervisor ? 'nav1Select' : 'nav1'}>
                        <div className={requestSupervisor ? "navIconSelect" : "navIcon"}><MdTopic /></div>
                        <div className={requestSupervisor ? 'navTextSelect' : 'navText'}>{myGroup?.level===1?"REQUEST SUPERVISOR":"GROUP SUPERVISOR DETAILS"}</div>
                    </div>
                     }
                    {user.student?.haveAGroup&&
                    <div onClick={handleTopicRegistration} className={topicRegistration ? 'nav1Select' : 'nav1'}>
                        <div className={topicRegistration ? "navIconSelect" : "navIcon"}><MdTopic /></div>
                        <div className={topicRegistration ? 'navTextSelect' : 'navText'}>{myGroup?.haveTopic?"TOPIC DETAILS":"TOPIC REGISTRATION"}</div>
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

                    <div onClick={handleGroupChat} className={groupchat ? 'nav1Select' : 'nav1'}>
                        <div className={groupchat ? "navIconSelect" : "navIcon"}><BsFillChatDotsFill /></div>
                        <div className={groupchat ? 'navTextSelect' : 'navText'}>GROUP CHAT</div>
                    </div>

                    <hr></hr>

                    <div onClick={logoutHandleClick} className={'nav1logout'}>
                        <div className={"navIconlogout"}><BiLogOutCircle /></div>
                        <div className={'navTextlogout'}>LOGOUT</div>
                    </div>

                </div>
                <div className="right">
                    
                    {dashboard && <DashBoard />}
                    {profile && !updateProfile ? <Profile /> : profile && updateProfile && <ProfileUpdate />}
                    {groupRegistration &&user.student?.haveAGroup? <StudentGroupDetails groupData={myGroup}/>:groupRegistration &&<CreateGroup />}
                    {topicRegistration&&myGroup?.haveTopic?<TopicDetails topic={topicDetails} group={myGroup} />:topicRegistration&&<TopicRegistration data={myGroup}/>}
                    {myGroup&&groupchat&&<GroupChat group={myGroup}/>}
                    {requestSupervisor&&myGroup?.level===1?<RequestSupervisor topic={topicDetails} group={myGroup}/>:requestSupervisor&&<></>}
                </div>
            </div>
        </>
    );
}

export default StudentDashboard;