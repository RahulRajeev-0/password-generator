import  React, {useState} from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Fab from '@mui/material/Fab';

import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';

import { DataGrid } from '@mui/x-data-grid';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'account', headerName: 'Account', width: 130 },
  
  
  {
    field: 'password',
    headerName: 'Password',
    sortable: false,
    width: 260,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
  { field: 'action', headerName: 'Delete', width: 130 ,sortable: false,},
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
 
];


export default function PasswordList() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClose = () =>{
    setShow(false)
    setPassword({
      account: '',
      password: '',
    })
  } ;
  const handleShow = () => setShow(true);

  const [password, setPassword] = useState({
    account: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPassword(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };


  return (
    <React.Fragment>
      <CssBaseline />
      <div style={{ height: 400, width: '100%' }}>
        <h4>My passwords</h4>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5]}
        
      />
    </div>
      <AppBar position="fixed" color="secondary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer">
            <MenuIcon />
          </IconButton>
          <StyledFab color="warning" onClick={handleShow} aria-label="add">
            <AddIcon />
          </StyledFab>
          <Box sx={{ flexGrow: 1 }} />
          
          <IconButton onClick={()=>navigate('/')} color="inherit">
            
            back
          </IconButton>
        </Toolbar>
      </AppBar>


      <Dialog open={show} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: 'flex', alignItems: 'center',color:'white', bgcolor: '#17141a'}}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Create New Channel
        </Typography>
        <Button autoFocus onClick={handleClose} color="inherit" size="small">
          x
        </Button>
      </DialogTitle>
      <DialogContent sx={{ bgcolor: '#17141a', color: 'white' }}>
      <TextField
          autoFocus
          margin="dense"
          id="account"
          label="Account"
          type="text"
          fullWidth
          variant="standard"
          required
          maxLength={50}
          name="account"
          value={password.account}
          onChange={handleInputChange}
          InputLabelProps={{ style: { color: 'white' } }} // Set label color to white
          InputProps={{ style: { color: 'white' } }} // Set input color to white
        />
        <TextField
          id="password"
          label="Password"
          multiline
          rows={3}
          fullWidth
          variant="standard"
          required
          maxLength={250}
          name="password"
          value={password.password}
          onChange={handleInputChange}
          InputLabelProps={{ style: { color: 'white' } }} // Set label color to white
          InputProps={{ style: { color: 'white' } }} // Set input color to white
        />
      </DialogContent>
      <DialogActions sx={{bgcolor:"#17141a"}}>
        <Button onClick={handleClose} variant="contained" color="secondary">
          Close
        </Button>
        <Button  variant="contained" color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
    </React.Fragment>
  );
}
