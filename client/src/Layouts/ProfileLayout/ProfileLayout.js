import axios from 'axios';
import "./profilelayout.scss";
import { useContext } from "react";
import {AuthContext} from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import Profile from '../../components/Profile/Profile';



const ProfileLayout = () => {
  const navigate = useNavigate();
const {dispatch} =  useContext(AuthContext);

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
    <div className="profilelayout">
      <h1>Profile</h1><br/>
      <Profile/>
      <div className='row'>
        <div className='col'><div className="login_btn"><button  onClick={() => navigate('/updateProfile')}>update</button> </div></div>
        <div className='col'><div className="logout_btn"><button onClick={logoutHadleClick}>Logout</button></div></div>
      </div>
      
      
      
    </div>
  );
};

export default ProfileLayout;