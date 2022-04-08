import "./register.css"
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { useEffect, useState } from "react";

const Register = () => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [faculty, setFaculty] = useState(null);
  const [degree, setDegree] = useState(null);

  function handleFucultyChange(e) {
    setFaculty(e.target.value);
  }

  function handleDegreeChange(e) {
    setDegree(e.target.value);
  }

 
 
 
 
  const handleClick = () => {
    setVisible(!visible);
  };
  const handleClick2 = () => {
    setVisible2(!visible2);
  };

  return (
    <>
    <div className="reg">
    <h1>
        Student Registration
    </h1>
   
    <form class="g-3" novalidate>
  <div class="column">
    <label for="validationCustom01" class="form-label">Name with Inisials</label>
    <input type="text" class="form-control" id="validationCustom01"  required/>
    
  </div>
  <div class="column">
    <label for="validationCustom04" class="form-label">Gender</label>
    <select class="form-select" id="validationCustom04" required>
      <option selected disabled value="">Choose Your Gender...</option>
      <option>Male</option>
      <option>Female</option>
    </select>
    
  </div>
  <div class="column">
    <label for="validationCustom02" class="form-label">Student ID </label>
    <input type="text" class="form-control" id="validationCustomUsername" required/>
   
  </div>
  
  <div class="column">
    <label for="validationCustom04" class="form-label" >Faculty</label>
    <select class="form-select" onChange={handleFucultyChange} id="validationCustom04" required>
      <option selected disabled value="">Choose Your Faculty...</option>
      <option value="Faculty of Computing">Faculty of Computing</option>
      <option value="Faculty of Business">Faculty of Business</option>
      <option value="Faculty of Engineering">Faculty of Engineering</option>
    </select>
    
  </div>

  {/** Business Degrees */}
  <div class="column2"> {faculty=="Faculty of Business"&&
  <>
    <label for="validationCustom04" class="form-label" >Degree Programe</label>
    <select class="form-select" onChange={handleDegreeChange} id="validationCustom04" required>
      <option selected disabled value="">Choose Your Degree...</option>
      <option value="BBA (Hons) Business Management (SLIIT)">BBA (Hons) Business Management (SLIIT)</option>
      <option value="BBA (Hons) Business Management (LJMU)">BBA (Hons) Business Management (LJMU)</option>
      <option value="BBA (Hons) Business Management (QU)">BBA (Hons) Business Management (QU)</option>
    </select>
    </>
  }
  </div>
  {/** Computing Degrees */}
  <div class="column2"> {faculty=="Faculty of Computing"&&
  <>
    <label for="validationCustom04" class="form-label" >Degree Programe</label>
    <select class="form-select" onChange={handleDegreeChange} id="validationCustom04" required>
      <option selected disabled value="">Choose Your Degree...</option>
      <option value="B.Sc (Hons) Information Technology (SLIIT)">B.Sc (Hons) Information Technology (SLIIT)</option>
      <option value="B.Sc Computer System Networks (Curtin)">B.Sc Computer System Networks (Curtin)</option>
      <option value="B.Sc Information Technology \ Software Engineering (Curtin)">B.Sc Information Technology \ Software Engineering (Curtin)</option>
      <option value="B.Eng (Hons) Software Engineering (SHU)">B.Eng (Hons) Software Engineering (SHU)</option>
    </select>

    <div class="column2">{degree== "B.Sc (Hons) Information Technology (SLIIT)"&&
    <>
    <label for="validationCustom04" class="form-label" >Specializing in</label>
    <select class="form-select" id="validationCustom04" required>
      <option selected disabled value="">Choose Your Specializion...</option>
      <option value="Information Technology">Information Technology</option>
      <option value="Software Engineering">Software Engineering</option>
      <option value="Computer Systems and Network Engineering">Computer Systems and Network Engineering</option>
      <option value="Information Systems Engineering">Information Systems Engineering</option>
      <option value="Cyber Security">Cyber Security</option>
      <option value="Interactive Media">Interactive Media</option>
    </select>
    </>
    
    }</div>

    </>
  }
  </div>

 {/** Engineering Degrees */}
  <div class="column2"> {faculty=="Faculty of Engineering"&&
  <>
    <label for="validationCustom04" class="form-label" >Degree Programe</label>
    <select class="form-select" onChange={handleDegreeChange} id="validationCustom04" required>
      <option selected disabled value="">Choose Your Degree...</option>
      <option value="B.Sc. (Hons) Engineering (SLIIT)">B.Sc. (Hons) Engineering (SLIIT)</option>
      <option value="B.Eng (Hons) Engineering (Curtin)">B.Eng (Hons) Engineering (Curtin)</option>
      <option value="Quantity Surveying">Quantity Surveying</option>
      <option value="B.Ed. Technology Education">B.Ed. Technology Education </option>
    </select>
    </>
  }
  </div>
  


  


  
  
  <div class="column">
    <label for="validationCustom03" class="form-label">Email</label>
    <input type="email" class="form-control" id="validationCustom03" required/>
    
  </div>
 
  <div class="column">
  <label for="validationCustom05" class="form-label">Password</label>
  <div class="input-group has-validation">
      <input class="form-control" id="validationCustom05" type={visible ? "text" : "password"}
        text="Password"
        required/>
        <span class="input-group-text" id="validationTooltipUsernamePrepend">
          <div onClick={handleClick}>{visible ? <MdVisibility /> : <MdVisibilityOff />}</div></span>
    </div>
  </div>

  <div class="column">
  <label for="validationCustom05" class="form-label">Confirm Password</label>
  <div class="input-group has-validation">
      <input class="form-control" id="validationCustom05" type={visible2 ? "text" : "password"}
        text="Password"
        required/>
        <span class="input-group-text" id="validationTooltipUsernamePrepend">
          <div onClick={handleClick2}>{visible2 ? <MdVisibility /> : <MdVisibilityOff />}</div></span>
    </div>
  </div>

  <div class="column">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required/>
      <label class="form-check-label" for="invalidCheck">
        Agree to terms and conditions
      </label>
      
    </div>
  </div>
  <div class="column">
  <div class="login_btn">
    <button type="submit">register</button>
  </div>
  </div>
</form>
</div>

    </>
  );
};

export default Register;