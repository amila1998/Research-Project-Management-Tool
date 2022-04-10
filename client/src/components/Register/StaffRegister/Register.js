import "./register.css";

import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { useEffect, useState } from "react";
import * as React from 'react';


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

  const [role, setRole] = useState(false);

  const [checkedComputing, setCheckedComputing] = useState(false);
  const [checkedBussines, setCheckedBussines] = useState(false);
  const [checkedEngineering, setCheckedEngineering] = useState(false);
  const theme = useTheme();
  const [ComputerTopics, setComputerTopics] = React.useState([]);
  const [BussinesTopics, setBussinesTopics] = React.useState([]);
  const [EngineerTopics, setEngineerTopics] = React.useState([]);

  const handleChangecomputing = (event) => {
    const {
      target: { value },
    } = event;
    setComputerTopics(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleOnChangeComputing = () => {
    setCheckedComputing(!checkedComputing);
    if(checkedComputing==false){
      setComputerTopics([]);
    }
  };

  const handleChangebussines = (event) => {
    const {
      target: { value },
    } = event;
    setBussinesTopics(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleOnChangeBussines = () => {
    setCheckedBussines(!checkedBussines);
    if(checkedBussines==false){
      setBussinesTopics([]);
    }
  };

  const handleChangeengineer = (event) => {
    const {
      target: { value },
    } = event;
    setEngineerTopics(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleOnChangeEngineer = () => {
    setCheckedEngineering(!checkedEngineering);
    if(checkedEngineering==false){
      setEngineerTopics([]);
    }
  };

  //chip

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: '100%',
      },
    },
  };
  
  const computingTopics = [
    'Information Security',
    'Artificial Intelligence and Machine Learning',
    'ICT for Development',
    'Distributed & Parallel Computing',
    'Software Engineering',
    'Data Communication & Networking',
    'Visual Computing',
    'Robotics & Intelligent Systems',
    'Data Science',
    'Design Lab',
    'Assitive Technology',
    'Elearning and Education',
    'Computational Linguistics',
    'Business Intelligence and Analytics',
    'Human Computer Interaction',

  ];

  const bussinesTopics = [
    'Artificial Intelligence & Business Analytics',
    'Business & Development Economics',
    'Business Finance & Accounting',
    'Consumer Behaviour & Marketing',
    'Human Capital & Knowledge Management',
    'Interdisciplinary Studies',
    'Logistics & Quality Management',
  ];

  const engineeringTopics = [
    'Sustainable Built Environment',
    'Computer Vision/Industrial Automation',
    'Sustainable Built Environment',
    'Industrial Engineering and Operations Management',
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
    setRole(e.target.value);
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
                        <div>
                            <InputLabel id="demo-multiple-chip-label">Select your Computing topics</InputLabel>
                            <Select
                              labelId="demo-multiple-chip-label"
                              id="demo-multiple-chip"
                              multiple
                              value={ComputerTopics}
                              onChange={handleChangecomputing}
                              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                              renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                  {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                  ))}
                                </Box>
                              )}
                              MenuProps={MenuProps}
                            >
                              {computingTopics.map((name) => (
                                <MenuItem
                                  key={name}
                                  value={name}
                                  style={getStyles(name, ComputerTopics, theme)}
                                >
                                  {name}
                                </MenuItem>
                              ))}
                            </Select>
                        </div>
                      </>}
                      </div>
        </div>


          

        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"checked={checkedBussines}
          onChange={handleOnChangeBussines}/>
          <label className="form-check-label" for="flexCheckDefault">
            Bussines
          </label>

                      <div className="column">{checkedBussines &&  <> 
                      <div>
                          <InputLabel id="demo-multiple-chip-label">Select your Bussiness topics</InputLabel>
                          <Select
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            multiple
                            value={BussinesTopics}
                            onChange={handleChangebussines}
                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                            renderValue={(selected) => (
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                  <Chip key={value} label={value} />
                                ))}
                              </Box>
                            )}
                            MenuProps={MenuProps}
                          >
                            {bussinesTopics.map((name) => (
                              <MenuItem
                                key={name}
                                value={name}
                                style={getStyles(name, bussinesTopics, theme)}
                              >
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                      </div>
                    </>}
                    </div>
        </div>

        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={checkedEngineering}
          onChange={handleOnChangeEngineer}/>
          <label className="form-check-label" for="flexCheckDefault">
            Engineering
          </label>

          <div className="column">{checkedEngineering &&  <> 
                      <div>
                          <InputLabel className="chip" id="demo-multiple-chip-label">Select your Engineering topics</InputLabel>
                          <Select
                          className=".chipmenue"
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            multiple
                            value={EngineerTopics}
                            onChange={handleChangeengineer}
                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                            renderValue={(selected) => (
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                  <Chip key={value} label={value} />
                                ))}
                              </Box>
                            )}
                            MenuProps={MenuProps}
                          >
                            {engineeringTopics.map((name) => (
                              <MenuItem
                                key={name}
                                value={name}
                                style={getStyles(name, engineeringTopics, theme)}
                              >
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                      </div>
                    </>}
                    </div>
          
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