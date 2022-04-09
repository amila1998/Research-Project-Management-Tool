import "./register.css"
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { useEffect, useState } from "react";

const Register = () => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [faculty, setFaculty] = useState(null);
  const [degree, setDegree] = useState(null);
  const [specializion, setSpecializion] = useState(null);

  function handleFucultyChange(e) {
    setFaculty(e.target.value);
  }

  function handleDegreeChange(e) {
    setDegree(e.target.value);
  }

  function handleSpecializionChange(e) {
    setSpecializion(e.target.value);
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
   
    <form className="" novalidate>
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
    <label htmlFor="validationCustom02" className="form-label">Student ID </label>
    <input type="text" className="form-control" id="validationCustomUsername" required/>
   
  </div>
  
  <div className="column">
    <label htmlFor="validationCustom04" className="form-label" >Faculty</label>
    <select className="form-select" onChange={handleFucultyChange} id="validationCustom04" required>
      <option selected disabled value="">Choose Your Faculty...</option>
      <option value="Faculty of Computing">Faculty of Computing</option>
      <option value="Faculty of Business">Faculty of Business</option>
      <option value="Faculty of Engineering">Faculty of Engineering</option>
    </select>
    
  </div>

  {/** Business Degrees */}
  <div className="column2"> {faculty=="Faculty of Business"&&
  <>
    <label htmlFor="validationCustom04" className="form-label" >Degree Programe</label>
    <select className="form-select" onChange={handleDegreeChange} id="validationCustom04" required>
      <option selected disabled value="">Choose Your Degree...</option>
      <option value="BBA (Hons) Business Management (SLIIT)">BBA (Hons) Business Management (SLIIT)</option>
      <option value="BBA (Hons) Business Management (LJMU)">BBA (Hons) Business Management (LJMU)</option>
      <option value="BBA (Hons) Business Management (QU)">BBA (Hons) Business Management (QU)</option>
    </select>
    </>
  }
  </div>
  {/** Computing Degrees */}
  <div className="column2"> {faculty=="Faculty of Computing"&&
  <>
    <label htmlFor="validationCustom04" className="form-label" >Degree Programe</label>
    <select className="form-select" onChange={handleDegreeChange} id="validationCustom04" required>
      <option selected disabled value="">Choose Your Degree...</option>
      <option value="B.Sc (Hons) Information Technology (SLIIT)">B.Sc (Hons) Information Technology (SLIIT)</option>
      <option value="B.Sc Computer System Networks (Curtin)">B.Sc Computer System Networks (Curtin)</option>
      <option value="B.Sc Information Technology \ Software Engineering (Curtin)">B.Sc Information Technology \ Software Engineering (Curtin)</option>
      <option value="B.Eng (Hons) Software Engineering (SHU)">B.Eng (Hons) Software Engineering (SHU)</option>
    </select>

    <div className="column2">{degree== "B.Sc (Hons) Information Technology (SLIIT)"&&
    <>
    <label htmlFor="validationCustom04" className="form-label" >Specializing in</label>
    <select className="form-select" onChange={handleSpecializionChange} id="validationCustom04" required>
      <option selected disabled value="">Choose Your Specializion...</option>
      
      <option value="Information Technology">Information Technology</option>
      <option value="Software Engineering">Software Engineering</option>
      <option value="Computer Systems and Network Engineering">Computer Systems and Network Engineering</option>
      <option value="Information Systems Engineering">Information Systems Engineering</option>
      <option value="Cyber Security">Cyber Security</option>
      <option value="Interactive Media">Interactive Media</option>
      
    </select>
    <div className="column2">{specializion &&
    <>
    <label htmlFor="validationCustom04" className="form-label" >Batch </label>
    <select className="form-select"  id="validationCustom04" required>
      <option selected disabled value="">Choose Your Batch...</option>
      <option value="2022 February">2022 February</option>
      <option value="2021 July">2021 July</option>
      <option value="2021 February">2021 February</option>
      <option value="2020 July">2020 July</option>
      <option value="2020 February">2020 February</option>
    </select>
    </>
    
    }</div>
    </>
    
    }</div>

    </>
  }
  </div>

 {/** Engineering Degrees */}
  <div className="column2"> {faculty=="Faculty of Engineering"&&
  <>
    <label htmlFor="validationCustom04" className="form-label" >Degree Programe</label>
    <select className="form-select" onChange={handleDegreeChange} id="validationCustom04" required>
      <option selected disabled value="">Choose Your Degree...</option>
      <option value="B.Sc. (Hons) Engineering (SLIIT)">B.Sc. (Hons) Engineering (SLIIT)</option>
      <option value="B.Eng (Hons) Engineering (Curtin)">B.Eng (Hons) Engineering (Curtin)</option>
      <option value="Quantity Surveying">Quantity Surveying</option>
      <option value="B.Ed. Technology Education">B.Ed. Technology Education </option>
    </select>
    </>
  }
  </div>
  


  


  
  
  <div className="column">
    <label htmlFor="validationCustom03" className="form-label"> Student Email</label>
    <input type="email" className="form-control" id="validationCustom03" placeholder="itxxxxxxxx@my.sliit.lk" required/>
    
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
      <label className="form-check-label" htmlFor="invalidCheck">
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