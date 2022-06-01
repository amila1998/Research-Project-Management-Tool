import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './GroupManagement.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ViewTopicDetails from '../../utils/ViewTopicDetails/ViewTopicDetails';
import UserDetails from '../../utils/ViewUser/UserDetails';
import Loading from '../../Loading/Loading';
axios.defaults.withCredentials = true;
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Select from "react-select";
import InputLabel from "@mui/material/InputLabel";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const GroupManagement = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setPanalMemeber_id('');
  }
  const [groups, setGroups] = useState([]);
  console.log("🚀 ~ file: GroupManagement.jsx ~ line 7 ~ GroupManagement ~ groups", groups)
  const [callback, setCallback] = useState(true);
  const [level, setLevel] = useState("");
  const [loading, setLoading] = useState(false);
  const [panalMember_id, setPanalMemeber_id] = useState();
  const [panalMembers, setPanalMemebers] = useState([]);


  useEffect(() => {
    const getGroups = async () => {
      if (callback) {
        try {
          setLoading(true)
          const res = await axios.get(`/api/admin/getallGroups?level=${level}`, {
            withCredentials: true
          });
          setCallback(false);
          setGroups(res.data)
          setLoading(false)
        } catch (error) {
          console.log("🚀 ~ file: GroupManagement.jsx ~ line 15 ~ getGroups ~ error", error)

        }
      }
    }
    getGroups();
  }, [callback, level])

  useEffect(() => {
    if (callback) {
      const getPanalMembers = async () => {

        try {
          setLoading(true)
          const res = await axios.get('/api/topicEvPanlMem/getAllPanaleMem');
          setPanalMemebers(res.data);
          setCallback(false)
          setLoading(false)
        } catch (error) {
          console.log("🚀 ~ file: TopicEvaluationPanelManagement.jsx ~ line 71 ~ getPanalMembers ~ error", error)
          setLoading(false)
        }
      }
      getPanalMembers()
    }

  }, [callback])

  const handleSubmit = async (groupID) => {
    try {
      setLoading(true)
      const res = await axios.post(`/api/admin/addPanalMem/${groupID}`,{user_id:panalMember_id});
      toast.success(res.data.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false)

    } catch (error) {
      console.log("🚀 ~ file: GroupManagement.jsx ~ line 88 ~ handleSubmit ~ error", error)
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false)
    }
    setCallback(true);
  }

  const handlePanalMember = (e) => {
    setPanalMemeber_id(e.value)
  }


  const options = [];
  panalMembers.map((item) =>
    options.push({
      value: item._id,
      label: item.email,
    })
  );

  return (
    <>
      <ToastContainer />
      <div className="group_m">Group Management</div>
      <br></br>
      <div className='table-page'>
        <div className="filter_menu">
          <div className="row1">
            <span>Group Level : </span>
            <select name="category" value={level} onChange={e => { setLevel(e.target.value); setCallback(true); }} >
              <option value='' selected>All Group</option>
              <option value='1'>Level 1</option>
              <option value='2'>Level 2</option>
              <option value='3'>Level 3</option>
              <option value='4'>Level 4</option>
              <option value='5'>Level 5</option>
              <option value='6'>Level 6</option>
              <option value='7'>Level 7</option>


            </select>
          </div>

        </div>

        <h4 className="u_manage">You have {groups.length} Groups</h4>

        <table>
          <thead>
            <tr>
              <th>Date of Created</th>
              <th>Date of Updated</th>
              <th>Group Name</th>
              <th>Topic</th>
              <th>Members</th>
              <th>Supervisor</th>
              <th>Co Supervisor</th>
              <th>Panal Member</th>
              <th>Status</th>
            </tr>
          </thead>
          {loading ? <Loading /> : <>
            <tbody>
              {
                groups.map(items => (
                  <tr key={items._id}>
                    <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                    <td>{new Date(items.updatedAt).toLocaleDateString()}</td>
                    <td>{items.groupName}</td>
                    <td><ViewTopicDetails group={items} /></td>
                    <td>
                      <table>
                        <thead>
                          <tr>
                          </tr>
                        </thead>
                        <tbody>
                          {items.members.map(member =>
                            <tr key={member.user_id}>
                              <td><UserDetails member={member} /></td>
                            </tr>

                          )}
                        </tbody>
                      </table>

                    </td>
                    <td>{items.supervisor?.name}</td>
                    <td>{items.coSupervisor?.name}</td>
                    <td>{items.panelMember?.name}</td>
                    <td>{items.level === 6 && <>
                      <div>
                        <button className='btn btn-outline-success' onClick={handleOpen}>ADD PANAL MEMBER</button>
                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                              ADD PANAL MEMBER
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                              <>
                                <InputLabel id="demo-multiple-chip-label">Select a Panal Member</InputLabel>
                                <Select
                                  className="basic-single"
                                  classNamePrefix="select"
                                  isSearchable
                                  name="panalMember_id"
                                  options={options}
                                  onChange={handlePanalMember}
                                />

                                <br></br>
                                <div className='row'>
                                  <button className='btn btn-outline-success' onClick={()=>handleSubmit(items._id)}>ADD</button>
                                </div>

                              </>
                            </Typography>
                          </Box>
                        </Modal>
                      </div>


                    </>}
                      {items.level != 6 && <>{items.level}</>}</td>
                  </tr>
                ))
              }
            </tbody>

          </>}

        </table>
      </div>

    </>

  )
}

export default GroupManagement