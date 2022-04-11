import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./header.css"

export default function Header() {
  const { user } = useContext(AuthContext);
  return (
    <>
      {/* Header */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
    
    <a className="navbar-brand" href="/">
      <img src={require("../../assets/img/SLIIT_Logo_Crest.png")} alt="" width="40" height="45"/>
      Research Project Management Tool
    </a>

    <a className="navbar-brand" href="#"></a><br/>
    
      <form className="d-flex">
        {!user.name?<>
        
        <button>Login</button>
        
        </>:<>
        
        <a className="nav-link active" aria-current="page" href="#">{user.name}</a>
        <img src={user.logo} className="rounded"  width="40" height="40" alt="..."></img>
        </>}
    
      </form>
    </div>
 
</nav>
    </>
  );
}
