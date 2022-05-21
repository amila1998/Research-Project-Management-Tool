import "./register.scss";

import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { useEffect, useState } from "react";
import * as React from 'react';


import axios from "axios";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';
import Select from 'react-select';
import { isEmpty, isEmail, isLength, isMatch } from "../../helper/validate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../Loading/Loading";

const Register = () => {
  const initialState = {
    name: "",
    gender: "",
    email: "",
    username: "",
    password: "",
    c_password: "",
    role: "",
    description: "",
    interestedTopics: [],
  }
  const [staff, setStaff] = useState(initialState);
  const { name, gender, email, username, password, c_password, role, description, interestedTopics } = staff;
  const [topics, setTopics] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [panelMember, setPanelMember] = useState(false);
  const [cosupervisor, setCoSupervisor] = useState(false);
  const [isLoading, setisLoading]=useState(false);

  const [checkedComputing, setCheckedComputing] = useState(false);
  const [checkedBussines, setCheckedBussines] = useState(false);
  const [checkedEngineering, setCheckedEngineering] = useState(false);
  const theme = useTheme();
  const [ComputerTopics, setComputerTopics] = React.useState({ value: [] });
  const [BusinessTopics, setBusinessTopics] = React.useState({ value: [] });
  const [EngineerTopics, setEngineerTopics] = React.useState({ value: [] });



  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("🚀 ~ file: Register.js ~ line 54 ~ handleRegister ~ ComputerTopics", ComputerTopics)
    console.log("🚀 ~ file: Register.js ~ line 54 ~ handleRegister ~ BusinessTopics", BusinessTopics)
    console.log("🚀 ~ file: Register.js ~ line 54 ~ handleRegister ~ EngineerTopics", EngineerTopics)
    console.log("🚀 ~ file: Register.js ~ line 54 ~ handleRegister ~ staff", staff)
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
    if (!isMatch(password, c_password))
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
      const res = await axios.post("/api/register-staff", {
        name,
        email,
        password,
        username,
        gender,
        role, 
        description, 
        interestedTopics
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
      console.log("🚀 ~ file: Register.js ~ line 130 ~ handleRegister ~ err", err)
      setisLoading(false);
      toast.error(err.response.data.message, {
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
  }
  const handleReset = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    setStaff({ ...staff, name: "", email: "", password: "", c_password: "" });
  };

  const appendTopics = () => {
    let topics = [];
    ComputerTopics.value.map((topic) => {
      topics.push(topic)
    });
    BusinessTopics.value.map((topic) => {
      topics.push(topic)
    });
    EngineerTopics.value.map((topic) => {
      topics.push(topic)
    });
    setStaff({ ...staff, interestedTopics: topics });
    console.log("🚀 ~ file: Register.js ~ line 71 ~ appendTopics ~ topics", topics)
  }

  const handleComputingChange = (selectedOption) => {
    let option = [];
    selectedOption.map((topic) => {
      option.push(topic.value)
    })
    setComputerTopics({ ...ComputerTopics, value: option })
    appendTopics();
  }
  const handleBusinessChange = (selectedOption) => {
    let option = [];
    selectedOption.map((topic) => {
      option.push(topic.value)
    })
    setBusinessTopics({ ...BusinessTopics, value: option })
    appendTopics();
  }
  const handleEngineeringChange = (selectedOption) => {
    let option = [];
    selectedOption.map((topic) => {
      option.push(topic.value)
    })
    setEngineerTopics({ ...EngineerTopics, value: option })
    appendTopics();
  }

  const handleOnChangeComputing = () => {
    setCheckedComputing(!checkedComputing);
    if (checkedComputing == false) {
      setComputerTopics({ value: [] });
    }
  };
  const handleOnChangeBussines = () => {
    setCheckedBussines(!checkedBussines);
    if (checkedBussines == false) {
      setBusinessTopics({ value: [] });
    }
  };

  const handleOnChangeEngineer = () => {
    setCheckedEngineering(!checkedEngineering);
    if (checkedEngineering == false) {
      setEngineerTopics({ value: [] });
    }
  };

  const computingTopics = [
    { value: 'Information Security', label: 'Information Security' },
    { value: 'Artificial Intelligence and Machine Learning', label: 'Artificial Intelligence and Machine Learning' },
    { value: 'ICT for Development', label: 'ICT for Development' },
    { value: 'Distributed & Parallel Computing', label: 'Distributed & Parallel Computing' },
    { value: 'Software Engineering', label: 'Software Engineering' },
    { value: 'Data Communication & Networking', label: 'Data Communication & Networking' },
    { value: 'Visual Computing', label: 'Visual Computing' },
    { value: 'Robotics & Intelligent Systems', label: 'Robotics & Intelligent Systems' },
    { value: 'Data Science', label: 'Data Science' },
    { value: 'Design Lab', label: 'Design Lab' },
    { value: 'Assistive Technology', label: 'Assistive Technology' },
    { value: 'E-learning and Education', label: 'E-learning and Education' },
    { value: 'Computational Linguistics', label: 'Computational Linguistics' },
    { value: 'Business Intelligence and Analytics', label: 'Business Intelligence and Analytics' },
    { value: 'Human Computer Interaction', label: 'Human Computer Interaction' }
  ];

  const businessTopics = [
    { value: 'Artificial Intelligence & Business Analytics', label: 'Artificial Intelligence & Business Analytics' },
    { value: 'Business & Development Economics', label: 'Business & Development Economics' },
    { value: 'Business Finance & Accounting', label: 'Business Finance & Accounting' },
    { value: 'Consumer Behavior & Marketing', label: 'Consumer Behavior & Marketing' },
    { value: 'Human Capital & Knowledge Management', label: 'Human Capital & Knowledge Management' },
    { value: 'Interdisciplinary Studies', label: 'Interdisciplinary Studies' },
    { value: 'Logistics & Quality Management', label: 'Logistics & Quality Management' }
  ];

  const engineeringTopics = [
    { value: 'Sustainable Built Environment', label: 'Sustainable Built Environment' },
    { value: 'Computer Vision/Industrial Automation', label: 'Computer Vision/Industrial Automation' },
    { value: 'Sustainable Built Environment', label: 'Sustainable Built Environment' },
    { value: 'Industrial Engineering and Operations Management', label: 'Industrial Engineering and Operations Management' }
  ];

  function getStyles(name, ComputerTopics, theme) {
    return {
      fontWeight:
        ComputerTopics.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const handleClick = () => {
    setVisible(!visible);
  };
  const handleClick2 = () => {
    setVisible2(!visible2);
  };

  function handleStaffChange(e) {
    setStaff({ ...staff, role: e.target.value });
    if (e.target.value === "panelMember") {
      setPanelMember(true);
    }
  }
  function handleGenderChange(e) {
    setStaff({ ...staff, gender: e.target.value });
  }
  const handleInputChange = (e, input_field) => {
    const { value } = e.target;
    setStaff({ ...staff, [input_field]: value });
  };

  return (
    <>
      {isLoading ? <Loading /> :
        <>
          <ToastContainer />
          <div className="reg">
            <h1>
              Staff Registration
            </h1>

            <form className="" novalidate>

              <div className="column">
                <label htmlFor="validationCustom04" className="form-label" >Your Role</label>
                <select className="form-select" onChange={handleStaffChange} id="validationCustom04" required>
                  <option selected disabled value="">Choose Your Role...</option>
                  <option value="supervisor">Supervisor</option>
                  <option value="coSupervisor">Co-Supervisor</option>
                  <option value="panelMember">Panel Member</option>
                </select>
              </div>

              <div className="column">
                <label htmlFor="validationCustom01" className="form-label">Name with Initials</label>
                <input type="text" className="form-control" id="validationCustom01" onChange={e => handleInputChange(e, "name")} required />
              </div>

              <div className="column">
                <label htmlFor="validationCustom04" className="form-label">Gender</label>
                <select className="form-select" onChange={handleGenderChange} id="validationCustom04" required>
                  <option selected disabled value="">Choose Your Gender...</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="column">
                <label htmlFor="validationCustom02" className="form-label">Username</label>
                <input type="text" className="form-control" id="validationCustomUsername" onChange={e => handleInputChange(e, "username")} required />
              </div>

              <div className="column">
                <label htmlFor="validationCustom03" className="form-label">Email</label>
                <input type="email" className="form-control" id="validationCustom03" onChange={e => handleInputChange(e, "email")} required />
              </div>

              <div className="column">
                <label htmlFor="exampleFormControlTextarea1" class="form-label">About me</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={e => handleInputChange(e, "description")}></textarea>
              </div>
              {!panelMember && <>
              <div className="column">

                <label htmlFor="" class="form-label">Interested Topics</label>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"
                    checked={checkedComputing}
                    onChange={handleOnChangeComputing} />
                  <label className="form-check-label" for="flexCheckDefault">
                    Computing
                  </label>

                  <div className="column">{checkedComputing && <>
                    <div>
                      <InputLabel id="demo-multiple-chip-label">Select your Computing topics</InputLabel>
                      <Select
                        isMulti
                        name="computingTopics"
                        options={computingTopics}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={handleComputingChange}
                      />
                    </div>
                  </>}
                  </div>
                </div>

                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={checkedBussines}
                    onChange={handleOnChangeBussines} />
                  <label className="form-check-label" for="flexCheckDefault">
                    Bussines
                  </label>

                  <div className="column">{checkedBussines && <>
                    <div>
                      <InputLabel id="demo-multiple-chip-label">Select your Business topics</InputLabel>
                      <Select
                        isMulti
                        name="businessTopics"
                        options={businessTopics}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={handleBusinessChange}
                      />
                    </div>
                  </>}
                  </div>
                </div>

                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={checkedEngineering}
                    onChange={handleOnChangeEngineer} />
                  <label className="form-check-label" for="flexCheckDefault">
                    Engineering
                  </label>

                  <div className="column">{checkedEngineering && <>
                    <div>
                      <InputLabel className="chip" id="demo-multiple-chip-label">Select your Engineering topics</InputLabel>
                      <Select
                        isMulti
                        name="engineeringTopics"
                        options={engineeringTopics}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={handleEngineeringChange}
                      />
                    </div>
                  </>}
                  </div>
                </div>
              </div>
              </>}

              <div className="column">
                <label htmlFor="validationCustom05" className="form-label">Password</label>
                <div className="input-group has-validation">
                  <input className="form-control" id="validationCustom05" type={visible ? "text" : "password"}
                    text="Password"
                    onChange={e => handleInputChange(e, "password")}
                    required />
                  <span className="input-group-text" id="validationTooltipUsernamePrepend">
                    <div onClick={handleClick}>{visible ? <MdVisibility /> : <MdVisibilityOff />}</div></span>
                </div>
              </div>

              <div className="column">
                <label htmlFor="validationCustom05" className="form-label">Confirm Password</label>
                <div className="input-group has-validation">
                  <input className="form-control" id="validationCustom05" type={visible2 ? "text" : "password"}
                    text="Password"
                    onChange={e => handleInputChange(e, "c_password")}
                    required />
                  <span className="input-group-text" id="validationTooltipUsernamePrepend">
                    <div onClick={handleClick2}>{visible2 ? <MdVisibility /> : <MdVisibilityOff />}</div></span>
                </div>
              </div>

              <div className="column">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required />
                  <label className="form-check-label" for="invalidCheck">
                    Agree to terms and conditions
                  </label>

                </div>
              </div>
              <div className="column">
                <div className="login_btn">
                  <button type="submit" onClick={handleRegister} >register</button>
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