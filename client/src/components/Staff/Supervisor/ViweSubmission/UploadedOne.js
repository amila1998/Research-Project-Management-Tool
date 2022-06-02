import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import EvaluateSubmission from '../../../Admin/MarkingSchemaManagement/EvaluateSubmission';
import axios from 'axios';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75%',
    height: '100%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    overflow: 'scroll',
    boxShadow: 24,
    p: 4,
};

const UploadedOne = ({ subId }) => {
    // console.log("🚀 ~ file: Uploadedone.js ~ line 4 ~ UploadedOne ~ subId", subId)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [isOpen, setisOpen] = useState(false);
    const [submissionId, setSubmissionId] = useState([]);
    // console.log("🚀 ~ file: Uploadedone.js ~ line 26 ~ UploadedOne ~ submissionId", submissionId.groupName)

    const openbuttonhadal = () => {
        setisOpen(!isOpen)
    }

    useEffect(() => {
        const getSubmission = async () => {
            await axios.get(`http://localhost:8000/api/submssion/getOne/${subId}`).then((res) => {
                // console.log(res);
                setSubmissionId(res.data.submssion);

            }).catch((err) => {
                console.log("🚀 ~ file: Uploadedone.js ~ line 40 ~ axios.get ~ err", err)

            })
        }
        getSubmission();
    }, [])


    return (
        <div>
            {submissionId.groupName}
            <br />
            {submissionId.eventName}


            {isOpen && <>
                <br />

                <a href={submissionId.url}>Download Submission</a>
                <div>
                    <Button onClick={handleOpen}>Evaluate Submission</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Evaluate Submission
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <EvaluateSubmission groupID={submissionId.groupID} eventId={submissionId.eventId} />

                            </Typography>
                        </Box>
                        {/* <><EvaluateSubmission groupID={submissionId.groupID} eventId={submissionId.eventId}/></> */}

                    </Modal>
                </div>
            </>}
            <button onClick={openbuttonhadal}>{isOpen ? 'close' : 'open Submission'}</button>
        </div>
    )
}

export default UploadedOne