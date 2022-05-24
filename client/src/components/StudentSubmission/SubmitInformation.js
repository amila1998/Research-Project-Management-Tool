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
export const SubmitInformation = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  



  return (
    <div>
        
        SubmitInformation




    <table class="table table-striped">
   <tbody>
    <tr>
      <th scope="row">Submission Status</th>
      <td>Submission Status</td>
      
     
    </tr>
    <tr>
      <th scope="row">Grading Status</th>
      <td>Grading Status</td>
     
      
    </tr>
    <tr>
      <th scope="row">Due Data</th>
      <td>	Tuesday, 8 February 2022, 12:00 AM</td>
      
     
    </tr>
    <tr>
      <th scope="row">Time Remaining</th>
      <td>Assignment was submitted 6 hours 56 mins early</td>
      
     
    </tr>
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
            <AddSubmission/>
          </Typography>
        </Box>
      </Modal>
    </div>


    </div>
  )
}
