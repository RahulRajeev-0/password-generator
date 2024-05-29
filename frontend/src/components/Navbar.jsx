import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import BasicMenu from './NavMenu';
import { useNavigate } from 'react-router';

export default function Navbar() {
    const navigate = useNavigate()
  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static"  sx={{ backgroundColor: '#d9c9c6', color:'black', border:' solid black', borderRadius:'10px'}}>
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            
          >
            
           
          </IconButton> */}
          <BasicMenu sx={{ mr: 2 }}/>
          <Typography variant='h6' component="div" sx={{ flexGrow: 1 }}>
          SafePass
          </Typography>
          <Button onClick={()=>navigate('/login')} color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}