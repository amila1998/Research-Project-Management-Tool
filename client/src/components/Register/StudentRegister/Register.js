import "./register.scss"
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { useState } from "react";

import { isEmpty, isEmail, isLength, isMatch } from "../../helper/validate";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../Loading/Loading";

const initialState = {
  name: "",
  email: "",
  username:"",
  gender:"",
  password: "",
  cf_password: "",
  faculty:"",
  degree:"",
  specialization:"",
  batch:"",

};

const Register = () => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [isLoading, setisLoading]=useState(false);
 
  const [data, setData] = useState(initialState);
  const { name, email, username, gender, password, cf_password, faculty,degree, specialization ,batch } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    setVisible(!visible);
  };
  const handleClick2 = () => {
    setVisible2(!visible2);
  };

  const register = async (e) => {
   
    e.preventDefault();
    // check fields
    if (isEmpty(name) || isEmpty(password))
     
      return toast.error("Please fill in all fields.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    // check email
    if (!isEmail(email))
      return toast.error("Please enter a valid email address.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    // check password
    if (isLength(password))
      return toast.error("Password must be at least 6 characters.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    // check match
    if (!isMatch(password, cf_password))
      return toast.error("Password did not match.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
     
    try {
      setisLoading(true);
      const res = await axios.post("http://localhost:8000/register-student", {
        name,
        email,
        password,
        username, 
        gender,
        faculty,
        degree,
        specialization,
        batch
      });
      setisLoading(false);
  
      toast.success(res.data.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      setisLoading(false);
      toast.error(err.response.data.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    handleReset();
  };

  const handleReset = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    setData({ ...data, name: "", email: "", password: "", cf_password: "" });
  };

  return (
    <>
    {isLoading ? <Loading/>:
  
    <>
    
    <ToastContainer />
    <div className="reg">
    <h1>
        Student Registration
        
    </h1>
    
    
    <form onSubmit={register}>
  
    
  <div className="column">
    <label htmlFor="name1" className="form-label">Name with Inisials</label>
    <input name="name" onChange={handleChange}  type="text" className="form-control" id="name1"  required/>
    
  </div>
  <div className="column">
    <label htmlFor="validationCustom04" className="form-label">Gender</label>
    <select name="gender" onChange={handleChange} className="form-select" id="validationCustom04" required>
      <option selected disabled value="">Choose Your Gender...</option>
      <option>Male</option>
      <option>Female</option>
    </select>
    
  </div>
  <div className="column">
    <label htmlFor="validationCustom02" className="form-label">Student ID </label>
    <input name="username" onChange={handleChange} type="text" className="form-control" id="validationCustomUsername" required/>
   
  </div>
  
  <div className="column">
    <label htmlFor="validationCustom04" className="form-label" >Faculty</label>
    <select name="faculty"  className="form-select" onChange={handleChange} id="validationCustom04" required>
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
    <select name="degree"  className="form-select" onChange={handleChange} id="validationCustom04" required>
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
    <select name="degree"  className="form-select" onChange={handleChange} id="validationCustom04" required>
      <option selected disabled value="">Choose Your Degree...</option>
      <option value="B.Sc (Hons) Information Technology (SLIIT)">B.Sc (Hons) Information Technology (SLIIT)</option>
      <option value="B.Sc Computer System Networks (Curtin)">B.Sc Computer System Networks (Curtin)</option>
      <option value="B.Sc Information Technology \ Software Engineering (Curtin)">B.Sc Information Technology \ Software Engineering (Curtin)</option>
      <option value="B.Eng (Hons) Software Engineering (SHU)">B.Eng (Hons) Software Engineering (SHU)</option>
    </select>

    <div className="column2">{degree== "B.Sc (Hons) Information Technology (SLIIT)"&&
    <>
    <label htmlFor="validationCustom04" className="form-label" >Specializing in</label>
    <select name="specialization"  className="form-select" onChange={handleChange} id="validationCustom04" required>
      <option selected disabled value="">Choose Your specialization...</option>
      
      <option value="Information Technology">Information Technology</option>
      <option value="Software Engineering">Software Engineering</option>
      <option value="Computer Systems and Network Engineering">Computer Systems and Network Engineering</option>
      <option value="Information Systems Engineering">Information Systems Engineering</option>
      <option value="Cyber Security">Cyber Security</option>
      <option value="Interactive Media">Interactive Media</option>
      
    </select>
    <div className="column2">{specialization &&
    <>
    <label htmlFor="validationCustom04" className="form-label" >Batch </label>
    <select name="batch" onChange={handleChange} className="form-select"  id="validationCustom04" required>
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
    <select name="degree"  className="form-select" onChange={handleChange} id="validationCustom04" required>
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
    <input name="email" onChange={handleChange} type="email" className="form-control" id="validationCustom03" placeholder="itxxxxxxxx@my.sliit.lk" required/>
    
  </div>
 
  <div className="column">
  <label htmlFor="validationCustom05" className="form-label">Password</label>
  <div className="input-group has-validation">
      <input name="password" onChange={handleChange} className="form-control" id="validationCustom05" type={visible ? "text" : "password"}
        text="Password"
        required/>
        <span className="input-group-text" id="validationTooltipUsernamePrepend">
          <div onClick={handleClick}>{visible ? <MdVisibility /> : <MdVisibilityOff />}</div></span>
    </div>
  </div>

  <div className="column">
  <label htmlFor="validationCustom05" className="form-label">Confirm Password</label>
  <div className="input-group has-validation">
      <input name="cf_password" onChange={handleChange} className="form-control" id="validationCustom05" type={visible2 ? "text" : "password"}
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
    <button type="submit" >register</button>
  </div>
  </div>
  
</form>

</div>
</>
}
    
    </>
  );
};

export default Register;