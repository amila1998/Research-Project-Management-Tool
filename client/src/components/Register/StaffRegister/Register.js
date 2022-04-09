
import "./register.css";

import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { useEffect, useState } from "react";


import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const Register = () => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [supervisor, setSupervisor] = useState(false);
  const [cosupervisor, setCoSupervisor] = useState(false);
  const [degree, setDegree] = useState(null);
  const [checkedComputing, setCheckedComputing] = useState(false);
  


  

  const handleOnChangeComputing = () => {
    setCheckedComputing(!checkedComputing);
  };

  const handleClick = () => {
    setVisible(!visible);
  };
  const handleClick2 = () => {
    setVisible2(!visible2);
  };

  function handleStaffChange(e) {
    setDegree(e.target.value);
  }

  return (
    <>
    <div className="reg">
    <h1>
        Staff Registration
    </h1>
   
    <form className="" novalidate>

    <div className="column">
    <label htmlFor="validationCustom04" className="form-label" >Your Role</label>
    <select className="form-select"  onChange={handleStaffChange} id="validationCustom04" required>
      <option selected disabled value="">Choose Your Role...</option>
      <option value="supervisor">Supervisor</option>
      <option value="coSupervisor">Co-Supervisor</option>
    </select>
    
  </div>

  <div className="column">
    <label htmlFor="validationCustom01" className="form-label">Name with Inisials</label>
    <input type="text" className="form-control" id="validationCustom01"  required/>
    
  </div>
  <div className="column">
    <label htmlFor="validationCustom04" className="form-label">Gender</label>
    <select className="form-select" id="validationCustom04" required>
      <option selected disabled value="">Choose Your Gender...</option>
      <option>Male</option>
      <option>Female</option>
    </select>
    
  </div>
  <div className="column">
    <label htmlFor="validationCustom02" className="form-label">Username</label>
    <input type="text" className="form-control" id="validationCustomUsername" required/>
   
  </div>
  


  
  
  <div className="column">
    <label htmlFor="validationCustom03" className="form-label">Email</label>
    <input type="email" className="form-control" id="validationCustom03" required/>
    
  </div>

  <div className="column">
  <label htmlFor="exampleFormControlTextarea1" class="form-label">About me</label>
  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
    
  </div>

  <div className="column">
  <label htmlFor="" class="form-label">Interested Topics</label>
  <div className="form-check">
  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" 
  checked={checkedComputing}
  onChange={handleOnChangeComputing}/>
  <label className="form-check-label" for="flexCheckDefault">
    Computing
  </label>
  <div className="column">{checkedComputing &&  <> 
  
  <div className="form-check">
  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
  <label className="form-check-label" for="flexCheckDefault">
  Information Security
  </label>
  </div>
  <div className="form-check">
  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
  <label className="form-check-label" for="flexCheckDefault">
  Artificial Intelligence and Machine Learning
  </label>
  </div>
  <div className="form-check">
  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
  <label className="form-check-label" for="flexCheckDefault">
  ICT for Development
  </label>
  </div>
  
   </>}
  
 

  </div>
  
</div>

<div className="form-check">
 
  
</div>

  

<div className="form-check">
  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
  <label className="form-check-label" for="flexCheckDefault">
    Bussines
  </label>
  
</div>
<div className="form-check">
  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
  <label className="form-check-label" for="flexCheckDefault">
    Engineering
  </label>
  
</div>
    
  </div>


  
 
  <div className="column">
  <label htmlFor="validationCustom05" className="form-label">Password</label>
  <div className="input-group has-validation">
      <input className="form-control" id="validationCustom05" type={visible ? "text" : "password"}
        text="Password"
        required/>
        <span className="input-group-text" id="validationTooltipUsernamePrepend">
          <div onClick={handleClick}>{visible ? <MdVisibility /> : <MdVisibilityOff />}</div></span>
    </div>
  </div>

  <div className="column">
  <label htmlFor="validationCustom05" className="form-label">Confirm Password</label>
  <div className="input-group has-validation">
      <input className="form-control" id="validationCustom05" type={visible2 ? "text" : "password"}
        text="Password"
        required/>
        <span className="input-group-text" id="validationTooltipUsernamePrepend">
          <div onClick={handleClick2}>{visible2 ? <MdVisibility /> : <MdVisibilityOff />}</div></span>
    </div>
  </div>

  <div className="column">
    <div className="form-check">
      <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required/>
      <label className="form-check-label" for="invalidCheck">
        Agree to terms and conditions
      </label>
      
    </div>
  </div>
  <div className="column">
  <div className="login_btn">
    <button type="submit">register</button>
  </div>
  </div>
</form>
</div>

    </>
  );
};

export default Register;