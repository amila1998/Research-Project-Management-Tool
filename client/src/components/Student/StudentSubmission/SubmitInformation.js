import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { AddSubmission } from './AddSubmission';

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
export const SubmitInformation = ({evt}) => {
// console.log("🚀 ~ file: SubmitInformation.js ~ line 20 ~ SubmitInformation ~ evt", evt)

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [subid,setsubid] = React.useState(); 
    const[isOpen,setisOpen]= React.useState(false);
    
    let countDownDate = new Date(evt.end).getTime();
    let now = new Date().getTime();
    let timeLeft = countDownDate - now;
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

  
  
    const openbuttonhadal =()=>{
        setisOpen(!isOpen)
    }

 
  return (
    <div>
        
        
        {evt.title}

{isOpen &&<>


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
      <td>{new Date(evt.end).toLocaleDateString()}</td>
      
     
    </tr>
   {days>0 &&<><tr>
      <th scope="row">Time Remaining</th>
      <td>you have {days} days  {hours} hours {minutes} mins </td>
    </tr></>}
    {days<0 &&<><tr>
      <th scope="row">Time Remaining</th>
      <td>you Submission time excide {days} days  {hours} hours {minutes} mins </td>
    </tr></>}

    <tr>
      <th scope="row">Last Modified</th>
      <td>Monday, 7 February 2022, 5:03 PM</td>
      
     
    </tr>
    <tr>
      <th scope="row">Submission Comments</th>
      <td>Submission Comments</td>
      
     
    </tr>
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
           <AddSubmission eventId={evt._id}/>
          </Typography>
        </Box>
      </Modal>
     
    </div>
    </>}
    <button onClick={openbuttonhadal}>{isOpen?'Hide':'open'}</button>

    </div>
  )
}
