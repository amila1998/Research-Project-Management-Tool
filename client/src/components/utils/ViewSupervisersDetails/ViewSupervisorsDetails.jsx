import React, { forwardRef, useEffect, useState } from "react";
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
import axios from "axios";
axios.defaults.withCredentials = true;

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

const ViewSupervisorsDetails = ({userid}) => {
    const [open, setOpen] = useState(false);
  const[userDetails,setUserDetails]=useState();
  const[callback,setCallback]=useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


    useEffect(() => {
        const getUser=async()=>{
          if (callback) {
            const res = await axios.get(`/api/users/getuserDetails/${userid}`);
            setUserDetails(res.data)
            setCallback(false)
          }
        }
        getUser();
      }, [userid])
      
  return (
    <>
    
      <div>
        <BootstrapButton variant="outlined" onClick={()=>{setCallback(true)
        handleClickOpen()}}>
         {userDetails?.name}
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
                {userDetails?.name}
              </Typography>
            </Toolbar>
          </AppBar>
          <div style={{alignItems :'center'}}>
          <List>
            <Avatar
              alt="Logo"
              src={userDetails?.logo}
              sx={{ width: 200, height: 200 ,alignSelf:'center' }}
            />
            <Divider />
            <ListItem button>
              <ListItemText primary="Name" secondary={userDetails?.name} />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="E-Mail" secondary={userDetails?.email} />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Role" secondary={userDetails?.role} />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText
                primary="Verification"
                secondary={userDetails?.isverify ? "Verified" : "Not Verified"}
              />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText
                primary="Registered On"
                secondary={new Date(userDetails?.createdAt).toLocaleDateString()}
              />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Related Topics" />   
              
            </ListItem>
           
            {userDetails?.staff?.interestedTopics.map(i=>  
              <div className="row" key={i}>{i}</div>    )}   
               <Divider />
          </List>
          </div>
        </Dialog>
      </div>
    </>
  )
}

export default ViewSupervisorsDetails