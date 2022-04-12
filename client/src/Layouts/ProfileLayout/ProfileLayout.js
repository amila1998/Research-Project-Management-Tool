import axios from 'axios';
import "./profilelayout.css";
import { useContext } from "react";
import {AuthContext} from "../../context/AuthContext";
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const ProfileLayout = () => {
  const navigate = useNavigate();
const {dispatch} =  useContext(AuthContext);

const logoutHadleClick =  async (e) =>{
  e.preventDefault();
  try {
    await axios.get("/api/auth/signout")
    localStorage.removeItem("_appSignging")
    dispatch({type:"SIGNOUT"})
      
  } catch (error) {
    console.log(error);
  }
}

const updateHadleClick =  () =>{
  <Navigate to="/updateProfile"/>
}

  return (
    <div className="profilelayout">
      <p>ProfileLayout</p><br/>
      <button  onClick={() => navigate('/updateProfile')}>update</button> <button onClick={logoutHadleClick}>Logout</button>
    </div>
  );
};

export default ProfileLayout;