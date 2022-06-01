import React, { forwardRef, useEffect, useState } from 'react'
import axios from "axios";
import UserDetails from '../ViewUser/UserDetails';
axios.defaults.withCredentials = true;

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Avatar from '@mui/material/Avatar';
import { styled } from "@mui/material";

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
  
  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  

const ViewGroupDetails = ({gid}) => {
    const [groupDetails,SetGroupDetails]=useState();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    useEffect(() => {
      const getGroupDetails=async()=>{
            try {
                const res = await axios.get(`/api/group/getgroup/${gid}`)
                SetGroupDetails(res.data)
                
            } catch (error) {
            console.log("🚀 ~ file: ViewGroupDetails.jsx ~ line 13 ~ getGroupDetails ~ error", error)
                
            }
      }
      getGroupDetails();
    }, [gid])

  return (
    <div>
         <BootstrapButton variant="outlined" onClick={()=>{
        handleClickOpen()}}>
        {groupDetails?.groupName}
        </BootstrapButton>
        <Dialog
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
          fullWidth='md'
        >
          <AppBar sx={{ position: "relative", backgroundColor: "#ff6a06" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {groupDetails?.groupName}
              </Typography>
            </Toolbar>
          </AppBar>
          <div style={{alignItems :'center'}}>
          <List>
          <div className='GDtopic'>{groupDetails?.groupName.toUpperCase()} GROUP DETAILS</div>
                <div>This Group level is {groupDetails?.level}</div>
                    <div className='table-page'>
                            <table>
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>Member Name</th>
                                <th>Role</th>
                             </tr>
                        </thead>
                        <tbody>
                            {
                            groupDetails?.members.map(items => (
                            
                                    <tr key={items.user_id}>
                                            {console.log(items)}
                                        <td>{items.user_id}</td>
                                        <td><UserDetails member={items}/></td>
                                        <td>{items.isLeader?"Leader":"Memeber"}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>


                </div>

           
           
               <Divider />
          </List>
          </div>
        </Dialog>
     </div>
  )
}

export default ViewGroupDetails