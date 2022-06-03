import axios from 'axios';
import React, { forwardRef, useEffect, useState } from 'react'
import TopicRegistration from '../TopicRegistration/TopicRegistration';
import './topic.scss';
axios.defaults.withCredentials = true;
import approved from '../../../assets/img/approved.gif'
import rejected from '../../../assets/img/rejected.gif'

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

const TopicDetails = ({topic,group}) => {
    // console.log(topic);
    // console.log(group);
    const[callback,setCallback]=useState(true);
  const [rejectTopics,setRejectTopicDetails]=useState([]);
  const [open, setOpen] = useState(false);
    useEffect(() => {
      const getARejectTopic =async()=>{
          try {
            const res = await axios.get(`/api/topics/getMyRejectTopics/${group._id}`)
            setRejectTopicDetails(res.data)
          } catch (error) {
          console.log("🚀 ~ file: ViewTopicDetails.jsx ~ line 69 ~ getARejectTopic ~ error", error)
              
          }
  
      }
      getARejectTopic();
  
  }, [group,callback])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (group.level===-2) {
    return(
      <>
      <TopicRegistration data={group}/>
      </>
    )
  }else{
    return (
      <>
      {topic.panalMemberAcception===true&&<img src={approved} className='statusimg'/>}
      <div className="Dash">   <h1>Topic Details</h1></div>
    
      <br/>
      <div className='display'>
        <div className='row1'>
          <div className='col1 bold'>Topic ID : </div>
          <div className='col1'>{topic._id}</div>
        </div>
        <div className='row1'>
          <div className='col1 bold'>Topic Name : </div>
          <div className='col1'>{topic.topicname}</div>
        </div>
        <div className='row1'>
          <div className='col1 bold'>Panal Member Acception :</div>
          <div className='col1'>{topic.panalMemberAcception===null?"Pending"
      :topic.panalMemberAcception===false?"Rejected"
      :topic.panalMemberAcception===true?"Accepted":""}</div>
        </div>
        <div className='row1'>
          <div className='col1 bold'>Topic Description :</div>
          <div className='col1'>{topic.topicDescribe}</div>
        </div>
        <div className='row1'>
          <div className='col1 bold'>Related Topics :</div>
          {topic.interestedTopics.map(items=>(
              <div key={items} className='col1'>{items}<br/></div>
          ))}
        
        </div>
        <div className='row1'>
          <div className='col1 bold'>Topic Created At :</div>
          <div className='col1 '>{new Date(topic.createdAt).toLocaleDateString()}</div>
        </div>
        <div className='row1'>
          <div className='col1 bold'>Topic Updated At :</div>
          <div className='col1'>{new Date(topic.updatedAt).toLocaleDateString()}</div>
        </div>
      
      {group.level>=4?<></>:<>  <div className='row1'>
              <button className='btn btn-outline-success'>UPDATE</button>
            </div></>}
      </div>

      <br/>
      <hr></hr>
      <div className='rejtxt'>
        Your Group Have {rejectTopics.length} Rejected Topics.
      </div>
      <br/>
      {rejectTopics.map(item=>
              <div key={item._id} className='rej'>
                 <img src={rejected} className='statusimg2'/>
                 <div>
        <BootstrapButton variant="outlined" onClick={()=>{setCallback(true)
        handleClickOpen()}}>
        {item.topicname}
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
              {item.topicname}
              </Typography>
            </Toolbar>
          </AppBar>
          <div style={{alignItems :'center'}}>
          <List>
           
            <Divider />
            <ListItem button>
              <ListItemText primary="Description" secondary={item.topicDescribe} />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Panal Member Acception" secondary={item.panalMemberAcception===null?
              "Pending":item.panalMemberAcception===true?"Accepted":item.panalMemberAcception===false&&'Rejected'} />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Related Topics" />   
              
            </ListItem>
           
            {item.interestedTopics.map(i=>  
              <div className="row" key={i}>{i}</div>    )}   
               <Divider />
          </List>
         
                  
               
                   

          </div>
        </Dialog>
      </div>
               
              </div>
              
              )}
      </>
    )
  }


  
}

export default TopicDetails