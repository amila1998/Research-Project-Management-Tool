import axios from 'axios';
import "./profilelayout.scss";
import { useContext } from "react";
import {AuthContext} from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';



const ProfileLayout = () => {
  const navigate = useNavigate();
const {dispatch} =  useContext(AuthContext);

const logoutHadleClick =  async (e) =>{
  e.preventDefault();
  try {
    await axios.get("http://localhost:8000/api/auth/signout")
    localStorage.removeItem("_appSignging")
    sessionStorage.clear();
    dispatch({type:"SIGNOUT"})
      
  } catch (error) {
    console.log(error);
  }
}

  return (
    <div className="profilelayout">
      <p>ProfileLayout</p><br/>
      <button  onClick={() => navigate('/updateProfile')}>update</button> <button onClick={logoutHadleClick}>Logout</button>
    </div>
  );
};

export default ProfileLayout;