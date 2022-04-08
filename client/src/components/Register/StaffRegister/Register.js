import Input from "../../Input/Input";
import "./register.css";

import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { useState } from "react";

const Register = () => {
  const [visible, setVisible] = useState(false);
  const [supervisor, setSupervisor] = useState(false);
  const [cosupervisor, setCoSupervisor] = useState(false);

  const handleClick = () => {
    setVisible(!visible);
  };

  return (
    <>
    <h1>
        Staff Registration
    </h1><br/>
    <form>

     <div className="radiobox">
    <label>Select Your Role : </label> <br/>
      <div className="radioselection" >
        
        <input className="radiobtn" type="radio" id="supervisor" name="role" value="supervisor"/>
          <label className="radioLable"  for="supervisor"> Supervisor</label>
        <input className="radiobtn" type="radio" id="cosupervisor" name="role" value="cosupervisor"/>
          <label className="radioLable" for="cosupervisor"> Co-Supervisor</label>
      </div>
      </div> 
      
  
 
      <Input type="text" text="Name"/>
      <Input type="text" text="Username" />
      <Input type="text" text="Email" />
      <Input
        type={visible ? "text" : "password"}
        icon={visible ? <MdVisibility /> : <MdVisibilityOff />}
        text="Password"
        handleClick={handleClick}
      />
      <Input
        type={visible ? "text" : "password"}
        icon={visible ? <MdVisibility /> : <MdVisibilityOff />}
        text="Confirm Password"
        handleClick={handleClick}
      />
      <div className="login_btn">
        <button>register</button>
      </div>
    </form>
    </>
  );
};

export default Register;