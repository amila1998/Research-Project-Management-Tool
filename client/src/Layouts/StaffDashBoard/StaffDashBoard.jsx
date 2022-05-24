import { useContext, useState } from "react";
import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import "../AdminDashBoard/AdminDashBoard";
import SupervisorDashBoard from "./SupervisorDashBoard";
import CoSupervisorDashBoard from "./CoSupervisorDashBoard";
import { PanelMemberDashBoard } from "./PanelMemberDashBoard";

const StaffDashBoard = () => {
  const {dispatch, user, isLoggedIn,isAdmin,isCoSupervisor,isPanelMember,isSupervisor } = useContext(AuthContext);
  


  if (isSupervisor) {
    return(
      <>
      {/* <h1>Supervisor</h1> */}
       <SupervisorDashBoard/>
      
      
      
      
      </>
       
    
    );
    
  }else if(isCoSupervisor){
    return(
      <>
      {/* <h1>isCoSupervisor</h1> */}
      <CoSupervisorDashBoard/>
      </>
    );
  }
  else if(isPanelMember){
    return(
      <>
      {/* <h1>isPanelMember</h1> */}
     <PanelMemberDashBoard/>
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

export default StaffDashBoard