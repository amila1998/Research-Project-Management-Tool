import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { AddSubmission } from './AddSubmission';
import axios from 'axios';
import { UpdateSubmission } from './UpdateSubmission';




// import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Avatar from '@mui/material/Avatar';
import { styled } from "@mui/material";



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
const BootstrapButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  color: "#000000",
  borderColor: "#ff6a06",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: "#ff6a06",
    borderColor: "#ff6a06",
    boxShadow: "none",
  },
});
export const SubmitInformation = ({ evt, group }) => {
  // console.log("🚀 ~ file: SubmitInformation.js ~ line 21 ~ SubmitInformation ~ group", group)
  // console.log("🚀 ~ file: SubmitInformation.js ~ line 20 ~ SubmitInformation ~ evt", evt)

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [subId, setsubId] = React.useState();
  const [SubmitId, setSubmitId] = React.useState([]);
  const [isOpen, setisOpen] = React.useState(false);
  const [submited, setSubmited] = React.useState();
  // console.log("🚀 ~ file: SubmitInformation.js ~ line 32 ~ SubmitInformation ~ submited", submited?._id)






  let countDownDate = new Date(evt.end).getTime();
  let now = new Date().getTime();
  let timeLeft = countDownDate - now;
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

  if (submited === null) {

  } else {}
    //console.log("🚀 ~ file: SubmitInformation.js ~ line 31 ~ SubmitInformation ~ submited",submited?.updatedAt);
    let submissionData=new Date(submited?.updatedAt).getTime();
    let assessmentDate=countDownDate-submissionData;
    
    const assessmentDays = Math.floor(assessmentDate / (1000 * 60 * 60 * 24));
    // console.log("🚀 ~ file: SubmitInformation.js ~ line 51 ~ SubmitInformation ~ assessmentDays", assessmentDays)
    const assessmenthours = Math.floor((assessmentDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    // console.log("🚀 ~ file: SubmitInformation.js ~ line 53 ~ SubmitInformation ~ assessmenthours", assessmenthours)
    const assessmentminutes = Math.floor((assessmentDate % (1000 * 60 * 60)) / (1000 * 60));
    // console.log("🚀 ~ file: SubmitInformation.js ~ line 55 ~ SubmitInformation ~ assessmentminutes", assessmentminutes)
  
  
  



  const openbuttonhadal = () => {
    setisOpen(!isOpen)
  }

  React.useEffect(() => {
    const getSubmitted = async () => {
      try {
        const res = await axios.get(`/api/submssion/getSubmitted/${group._id}/${evt._id}`)
        setSubmited(res.data)

      } catch (error) {
        console.log("🚀 ~ file: SubmitInformation.js ~ line 50 ~ getSubmitted ~ error", error)

      }

    }
    getSubmitted();

  }, [evt, group])

  React.useEffect(() => {
    const getSubmitId = async () => {
      if (subId) {
        axios.get(`http://localhost:8000/api/submssion/getOne/${subId}`).then((res) => {
          setSubmitId(res.data.submssion);
        }).catch((err) => {
          alert(err.massage);
        })

      } else {
        console.log("sub id is null")
      }

    }
    getSubmitId();
  }, [subId])

  return (
    <div>
      
<h5>

      {evt.title}
</h5>
      
      {submited === null ? <>
        {isOpen && <>


          <table class="table table-striped">
            <tbody>
              <tr>
                <th scope="row">Submission Status</th>
                <td>Submission Status</td>


              </tr>
              <tr>
                <th scope="row">Grading Status</th>
                <td>{evt.describe}</td>


              </tr>
              <tr>
                <th scope="row">Due Data</th>
                <td>{new Date(evt.end).toDateString()}</td>


              </tr>
              {days > 0 &&
                <>
                  <tr>
                    <th scope="row">Time Remaining</th>
                    <td>you have {days} days  {hours} hours {minutes} mins </td>
                  </tr>
                </>

              }
              {days < 0 && <>
                <tr>
                  <th scope="row">Time Remaining</th>
                  <td>you Submission time excide {days*-1} days  {hours*-1} hours {minutes*-1} mins </td>
                </tr>
              </>}

              {subId === null ? <>
                <tr>
                  <th scope="row">Last Modified</th>
                  <td>{new Date(SubmitId.updatedAt).toString().substring(0, 25)}</td>
                </tr>
                <tr>
                  <th scope="row">Submission Comments</th>
                  <td>{SubmitId.comments}</td>
                </tr>
              </> :
                <>
                  <tr>
                    <th scope="row">Last Modified</th>
                    <td>No Modification</td>
                  </tr>
                  <tr>
                    <th scope="row">Submission Comments</th>
                    <td>No Comments</td>
                  </tr>
                </>
              }


            </tbody>
          </table>

          <div>
            <Button onClick={handleOpen}>Add Submission</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Add Submission
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <AddSubmission eventtype={evt.type} eventName={evt.title} eventId={evt._id} setsubId={setsubId} />
                </Typography>
              </Box>
            </Modal> 
          </div>
        </>}
        &nbsp;&nbsp;<BootstrapButton onClick={openbuttonhadal}>{isOpen ? 'Hide' : 'open'}</BootstrapButton>
        <br/>
      </> : <>
      {/* <h4>updated submission</h4> */}
        {isOpen && <>

          {/* <h3> updata</h3> */}
          <table class="table table-striped">
            <tbody>
              <tr>
                <th scope="row">Submission Status</th>
                <td>Submission Status</td>


              </tr>
              <tr>
                <th scope="row">Grading Status</th>
                <td>{evt.describe}</td>


              </tr>
              <tr>
                <th scope="row">Due Data</th>
                <td>{new Date(evt.end).toDateString()}</td>


              </tr>
              {days > 0 &&
                <><tr>
                  <th scope="row">Time Remaining</th>
                  <td>you submited document in {assessmentDays} days  {assessmenthours} hours {assessmentminutes} mins early </td>
                </tr></>

              }
              {days < 0 && <><tr>
                <th scope="row">Time Remaining</th>
                <td>you Submission time excide {assessmentDays*-1} days  {assessmenthours*-1} hours {assessmentminutes*-1} mins </td>
              </tr></>}

              <tr>
                <th scope="row">Last Modified</th>
                <td>{new Date(submited.updatedAt).toString().substring(0, 25)}</td>

              </tr>
              <tr>
                <th scope="row">Submission Comments</th>
                <td>{submited.comments}</td>


              </tr>
            </tbody>
          </table>

          <div>
            <Button onClick={handleOpen}>Updated Submission</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Update Submission
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <UpdateSubmission  subId={submited?._id} />
                </Typography>
              </Box>
            </Modal>
          </div>
          
        </>}
        
        &nbsp;&nbsp;<BootstrapButton onClick={openbuttonhadal}>{isOpen ? 'Hide' : 'open'}</BootstrapButton>
        <br/>
      </>

      }


    </div>
  )
}
