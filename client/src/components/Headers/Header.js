import Avatar from "../Avatar/Avatar";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./header.scss"
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <>
      {/* Header */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
    
          <a className="navbar-brand" href="/">
      <img src={require("../../assets/img/SLIIT_Logo_Crest.png")} alt="" width="40" height="45"/>
      Research Project Management Tool
    </a>

          

    <a className="navbar-brand" href="/"></a><br/>
    
      <form className="d-flex">
        {!user.name?<>
        
        <button>Login</button>
        
        </>:<>
      
      <h3 className="nav-link-active" aria-current="page" onClick={() => navigate('/profile')}>{user.name}</h3>&nbsp;&nbsp;
        <Avatar />
        
        </>}
    
      </form>
    </div>
 
</nav>
    </>
  );
}
