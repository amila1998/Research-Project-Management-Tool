import React from 'react'

import Select from 'react-select'
import InputLabel from '@mui/material/InputLabel';
import "./group.scss"
import { ToastContainer, toast } from "react-toastify";



function CreateGroup() {

    const initialState = {
        groupName: "",
        gender: "",
        email: "",
        username: "",
        password: "",
        c_password: "",
        role: "",
        description: "",
        interestedTopics: [],
      }
      const [group, setGroup] = useState(initialState);
      const { name, gender, email, username, password, c_password, role, description, interestedTopics } = group;

      const options = [
        { value: 'Kevin', label: 'Kevin' },
        { value: 'Amila', label: 'Amila' },
        { value: 'Sithara', label: 'Sithara' },
        { value: 'Aroshana', label: 'Aroshana' },
        { value: 'Uthpala', label: 'Uthpala' },
        { value: 'Thilini', label: 'Thilini' },
        { value: 'Vishwa', label: 'Vishwa' },
        { value: 'Sean', label: 'Sean' }
      ]
    
  return (
    <>
      <ToastContainer />
      <div className="groupReg">
      <h1>
              Group Registration
            </h1>

            <form className="" novalidate>
            <div className="column">
            <label htmlFor="validationCustom01" className="form-label">Group Name</label>
            <input type="text" className="form-control" id="validationCustom01" 
            // onChange={e => handleInputChange(e, "name")} 
            required />
        </div>
        <div className="column">
        <InputLabel id="demo-multiple-chip-label">Member 1 (Leader)</InputLabel>
        <Select
          className="basic-single"
          classNamePrefix="select"
          isSearchable
          isClearable
          name="leader"
          options={options}
        />
        </div>
        <div className="column">
        <InputLabel id="demo-multiple-chip-label">Member 2</InputLabel>
        <Select
          className="basic-single"
          classNamePrefix="select"
          isSearchable
          isClearable
          name="leader"
          options={options}
        />
        </div>
        <div className="column">
        <InputLabel id="demo-multiple-chip-label">Member 3</InputLabel>
        <Select
          className="basic-single"
          classNamePrefix="select"
          isSearchable
          isClearable
          name="leader"
          options={options}
        />
        </div>
        <div className="column">
        <InputLabel id="demo-multiple-chip-label">Member 4</InputLabel>
        <Select
          className="basic-single"
          classNamePrefix="select"
          isSearchable
          isClearable
          name="leader"
          options={options}
        />
        </div>
        
        <div className="column">
        <div className="group_btn">
          <button type="submit">Submit Group</button>
        </div>
        </div>
      </form>
      </div>
    </>
  )
}

export default CreateGroup