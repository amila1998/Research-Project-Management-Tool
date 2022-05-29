import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Select from 'react-select';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../Loading/Loading";
import InputLabel from '@mui/material/InputLabel';
import axios from "axios";
axios.defaults.withCredentials = true;

const TopicRegistration = ({data}) => {

  const initialState = {
    topicname:"",
    topicDescribe:"",
    interestedTopics: [],
  }
  const [topic,setTopic]=React.useState(initialState);
  const { topicname,
          topicDescribe,
          interestedTopics}=topic
  const [isLoading, setisLoading]=React.useState(false);
  const [checkedComputing, setCheckedComputing] = React.useState(false);
  const [checkedBussines, setCheckedBussines] = React.useState(false);
  const [checkedEngineering, setCheckedEngineering] = React.useState(false);
  const [ComputerTopics, setComputerTopics] = React.useState({ value: [] });
  const [BusinessTopics, setBusinessTopics] = React.useState({ value: [] });
  const [EngineerTopics, setEngineerTopics] = React.useState({ value: [] });

console.log(topic);
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
    setTopic({ ...topic, interestedTopics: topics });
   // console.log("🚀 ~ file: Register.js ~ line 71 ~ appendTopics ~ topics", topics)
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

  const handleInputChange = (e, input_field) => {
    const { value } = e.target;
    setTopic({ ...topic, [input_field]: value });
  };

  const handleRegister =async()=>{
    try {
      setisLoading(true);
      const res = await axios.post("/api/topics/addTopic", {
        topicname,
        topicDescribe,
        interestedTopics,
        group_id:data._id
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
      window.location.href=('/')
      
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

  }

  return (
    <>
    {isLoading ? <Loading /> :
      <>
        <ToastContainer />
        <div className="reg">
          <h1>
            Topic Registration
          </h1>

          <form className="" noValidate>


            <div className="column">
              <label htmlFor="validationCustom02" className="form-label">Topic name</label>
              <input type="text" className="form-control" id="validationCustomUsername" onChange={e => handleInputChange(e, "topicname")} required />
            </div>


            <div className="column">

            <label htmlFor="" class="form-label">Related Topics</label>
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

            <div className="column">
              <label htmlFor="exampleFormControlTextarea1" class="form-label">Description</label>
              <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={e => handleInputChange(e, "topicDescribe")}></textarea>
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
  )
}

export default TopicRegistration