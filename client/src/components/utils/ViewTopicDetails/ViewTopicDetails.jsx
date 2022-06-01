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

const ViewTopicDetails = ({group}) => {
  const [open, setOpen] = useState(false);
  const[topicDetails,setTopicDetails]=useState();
  const[callback,setCallback]=useState(true);
  const [rejectTopics,setRejectTopicDetails]=useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
      const getATopic =async()=>{
          try {
            const res = await axios.get(`/api/topics/getTopicDetails/${group._id}`)
            setTopicDetails(res.data)
          } catch (error) {
          console.log("🚀 ~ file: ViewTopicDetails.jsx ~ line 69 ~ getATopic ~ error", error)
              
          }

      }
      getATopic();
 
  }, [group,callback]);


  

  return (
    <>
      <div>
        <BootstrapButton variant="outlined" onClick={()=>{setCallback(true)
        handleClickOpen()}}>
        {topicDetails?.topicname}
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
              {topicDetails?.topicname}
              </Typography>
            </Toolbar>
          </AppBar>
          <div style={{alignItems :'center'}}>
          <List>
           
            <Divider />
            <ListItem button>
              <ListItemText primary="Description" secondary={topicDetails?.topicDescribe} />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Panal Member Acception" secondary={topicDetails?.panalMemberAcception===null?
              "Pending":topicDetails?.panalMemberAcception===true?"Accepted":topicDetails?.panalMemberAcception===false&&'Rejected'} />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Related Topics" />   
              
            </ListItem>
           
            {topicDetails?.interestedTopics.map(i=>  
              <div className="row" key={i}>{i}</div>    )}   
               <Divider />
          </List>
         
                  
               
                   

          </div>
        </Dialog>
      </div>
    </>
  );
};



export default ViewTopicDetails