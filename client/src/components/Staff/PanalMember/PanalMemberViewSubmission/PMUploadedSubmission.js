import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { PMUploadedOne } from './PMUploadedOne';


import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = { 
    // position: 'absolute',
    // top: '50%',
    // left: '50%',
    // transform: 'translate(-50%, -50%)',
    width: 400,
    height: "auto",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    // overflow: 'scroll',
    boxShadow: 24,
    p: 4,}
  ;

export const PMUploadedSubmission = () => {
    const [allMyGroups, setallMyGroups] = useState([]);
    console.log("🚀 ~ file: PMUploadedSubmission.js ~ line 6 ~ PMUploadedSubmission ~ allMyGroups", allMyGroups)


    useEffect(() => {

        const getSubmitted = async () => {

            await axios.get(`/api/submssion/getPanalMemberSub/`).then((res) => {
                setallMyGroups(res.data);
            }).catch((err) => {
                console.log("🚀 ~ file: UploadedSubmission.js ~ line 15 ~ awaitaxios.get ~ err", err)

            })
        }
        getSubmitted();

    }, [])


    return (
        <div>
            {allMyGroups.map((i) =>
                <div key={i._id}>

                    {i.map((s) =>

                        <div key={s._id}>
                            {/* {s.groupID} */}
                            <Card sx={bull}>
                            <CardActions>
                            <PMUploadedOne subId={s._id} />
                            </CardActions>
                            </Card>
                       </div>

                    )}


                </div>)}
                {/* <Card sx={bull}>
                            <CardActions>
                            
                            </CardActions>
                            </Card> */}

        </div>
    )
}
