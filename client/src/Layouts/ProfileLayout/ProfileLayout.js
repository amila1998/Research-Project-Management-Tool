import axios from 'axios';
import "./profilelayout.css";
import { useContext } from "react";
import {AuthContext} from "../../context/AuthContext";


const ProfileLayout = () => {
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

  return (
    <div className="profilelayout">
      <p>ProfileLayout</p><br/>
      <button >update</button> <button onClick={logoutHadleClick}>Logout</button>
    </div>
  );
};

export default ProfileLayout;