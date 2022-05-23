import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext';
import axios from "axios"

import Select from 'react-select'
import InputLabel from '@mui/material/InputLabel';
import "./group.scss"
import { ToastContainer, toast } from "react-toastify";
import { isEmpty } from "../helper/validate";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../Loading/Loading";

function CreateGroup() {

  const initialState = {
    groupName: "",
    members: [],
  }
  const { user } = useContext(AuthContext);
  const [student, setStudent] = useState([]);
  const [mutualStudents, setMutualStudents] = useState([]);
  const [member1, setMember1] = useState({});
  const [member2, setMember2] = useState({});
  const [member3, setMember3] = useState({});
  const [member4, setMember4] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [group, setGroup] = useState(initialState);
  const { groupName, members } = group;

  useEffect(() => {
    let degree = "";
    let faculty = "";
    setStudent(user);
    getMutualStudents(degree, faculty);
  }, [])

  useEffect(() => {
    appendMembers();
  }, [member1, member2, member3, member4])

  useEffect(() => {
    console.log("🚀 ~  group", group)
  }, [group])

  const getMutualStudents = async (degree, faculty) => {
    try {
      const res = await axios.post("/api/group/getMutualStudents", {
        degree,
        faculty
      });
      setMutualStudents(res.data)
      console.log("🚀 ~ file: CreateGroup.js ~ line 20 ~ getMutualStudents ~ res", res)
    } catch (error) {
      console.log("🚀 ~ file: CreateGroup.js ~ line 23 ~ getMutualStudents ~ error", error)
    }
  }

  const appendMembers = () => {
    let members = [];
    members.push(member1)
    members.push(member2)
    members.push(member3)
    members.push(member4)

    setGroup({ ...group, members: members })
  }

  const handleInputChange = (e) => {
    setGroup({ ...group, groupName: e.target.value })
  }

  const handleMember1Change = (selectedOption) => {
    const member = selectedOption.value;
    member["isLeader"] = true;
    setMember1(member);
  }
  const handleMember2Change = (selectedOption) => {
    const member = selectedOption.value;
    member["isLeader"] = false;
    setMember2(selectedOption.value);
  }
  const handleMember3Change = (selectedOption) => {
    const member = selectedOption.value;
    member["isLeader"] = false;
    setMember3(selectedOption.value);
  }
  const handleMember4Change = (selectedOption) => {
    const member = selectedOption.value;
    member["isLeader"] = false;
    setMember4(selectedOption.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // check fields
    if (isEmpty(member1) || isEmpty(member2) || isEmpty(member3) || isEmpty(groupName) || isEmpty(member4))

      return toast.error("Please fill in all fields.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    try {
      setIsLoading(true);
      const res = await axios.post("/api/group/groupRegister", group);
      console.log("🚀 ~ file: CreateGroup.js ~ line 110 ~ handleSubmit ~ res", res)
      setIsLoading(false);

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
      console.log("🚀 ~ file: CreateGroup.js ~ line 122 ~ handleSubmit ~ err", err)
      setIsLoading(false);
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

  }

  const mutualStudentOptions = [];
  mutualStudents.map((student) => (
    mutualStudentOptions.push({
      value: {
        name: student.name,
        user_id: student._id
      }, label: student.name
    })
  ))

  return (
    <>{isLoading ? <Loading /> :
      <>
        <ToastContainer />
        <div className="groupReg">
          <h1>
            Group Registration
          </h1>

          <form className="" noValidate>
            <div className="column">
              <label htmlFor="validationCustom01" className="form-label">Group Name</label>
              <input type="text" className="form-control" id="validationCustom01"
                onChange={e => handleInputChange(e)}
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
                options={mutualStudentOptions}
                onChange={handleMember1Change}
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
                options={mutualStudentOptions}
                onChange={handleMember2Change}
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
                options={mutualStudentOptions}
                onChange={handleMember3Change}
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
                options={mutualStudentOptions}
                onChange={handleMember4Change}
              />
            </div>

            <div className="column">
              <div className="group_btn">
                <button type="submit" onClick={handleSubmit}>Submit Group</button>
              </div>
            </div>
          </form>
        </div>
      </>
    }
    </>
  )
}

export default CreateGroup