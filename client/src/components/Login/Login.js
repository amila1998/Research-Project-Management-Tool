import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import Input from "../Input/Input";
import "./login.css";

const Login = () => {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(!visible);
  };
  return (
    <div className="loginbody">
       <h1>
        Login
    </h1>
    <form className="" novalidate>

       
  <div className="column">
    <label for="validationCustom03" className="form-label">Email</label>
    <input type="email" className="form-control" id="validationCustom03" required/>
    
  </div>

  <div className="column">
  <label for="validationCustom05" className="form-label">Password</label>
  <div className="input-group has-validation">
      <input className="form-control" id="validationCustom05" type={visible ? "text" : "password"}
        text="Password"
        required/>
        <span className="input-group-text" id="validationTooltipUsernamePrepend">
          <div onClick={handleClick}>{visible ? <MdVisibility /> : <MdVisibilityOff />}</div></span>
    </div>
  </div>

  <div className="column">
  
       <div className="login_btn">
      <button>login</button>

      </div>
     
    </div>
  </form>
  </div>
  );
};

export default Login;