import React, { forwardRef, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

import { styled } from '@mui/material';

const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    color:'#000000',
    borderColor: '#ff6a06',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: '#ff6a06',
      borderColor: '#ff6a06',
      boxShadow: 'none',
    },
   
  });

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const ViewUserDetails = ({data}) => {

    const [open, setOpen] = useState(false);

        const handleClickOpen = () => {
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
        };

  return (
    <>
  <div>
                                        <BootstrapButton variant="outlined" onClick={handleClickOpen}>
                                            View All Details
                                        </BootstrapButton>
                                        <Dialog
                                            fullScreen
                                            open={open}
                                            onClose={handleClose}
                                            TransitionComponent={Transition}
                                        >
                                            <AppBar sx={{ position: 'relative' }}>
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
                                                {data.email}
                                                </Typography>
                                                <Button autoFocus color="inherit" onClick={handleClose}>
                                                save
                                                </Button>
                                            </Toolbar>
                                            </AppBar>
                                            <List>
                                            <ListItem button>
                                                <ListItemText primary="Phone ringtone" secondary="Titania" />
                                            </ListItem>
                                            <Divider />
                                            <ListItem button>
                                                <ListItemText
                                                primary="Default notification ringtone"
                                                secondary="Tethys"
                                                />
                                            </ListItem>
                                            </List>
                                        </Dialog>
                                    </div>
  
</>
  )
}

export default ViewUserDetails