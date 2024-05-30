import  React, {useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';

import Fab from '@mui/material/Fab';
import { toast } from 'react-toastify';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';

import { DataGrid } from '@mui/x-data-grid';

import Typography from '@mui/material/Typography';  
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';

import { useNavigate } from 'react-router';

const BASE_URL = import.meta.env.VITE_API_BASE_URL

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});

const handleDelete = async (id) => {
  try {
   const response = await axios.delete(BASE_URL+'/account/my-password/', { data: { id } });
   if (response.status == 200){
    toast.success("Password Deleted")
    fatchData()
   }
    // Handle success, e.g., update state or refresh data
  } catch (error) {
    // Handle error
    console.error('Error deleting password:', error);
  }
};
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'account', headerName: 'Account', width: 130 },
  { field: 'passwords', headerName: 'Passwords', width: 130 ,sortable: false},
  
  {
    field: 'action',
    headerName: 'Delete',
    width: 130,
    sortable: false,
    renderCell: (params) => (
      <Button
        variant="contained"
        color="secondary"
        onClick={() => handleDelete(params.id)}
      >
        Delete
      </Button>
    ),
  },
  
  
];




export default function PasswordList() {

  const [data, setData] = useState([]);
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

  const handleSubmit = async () => {
    if (password.account.trim() === '' || password.password.trim() === '') {
      toast.warning("Please Fill all the required fields");
      return;}
      const token = localStorage.getItem('access')
      const headers = {
        'Authorization': `Bearer ${token}`, // Add space after 'Bearer'
        'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data for FormData
      };
      try{
        
        
        const response = await axios.post(BASE_URL+`/account/my-password/`,
        password,{ headers }
         )

         if (response.status === 201){
          toast.success("Password Added Successfully")
         }
         fetchData()
         handleClose()


      }catch(error){
        console.log(error)
      }
    }


    const fetchData = async () => {
      const token = localStorage.getItem('access');
      try {
        const response = await axios.get(BASE_URL+'/account/my-password/', {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const handleDelete = async (id) => {
      const token = localStorage.getItem('access');
      console.log(id);
      try {
        const response = await axios.delete(`${BASE_URL}/account/my-password/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
          data: { id } // Pass the ID in the request body
        });
    
        if (response.status === 200) {
          toast.success("Password Deleted");
          fetchData(); // Assuming fetchData() is a function to refetch data
        } else {
          // Handle other response statuses if needed
        }
      } catch (error) {
        console.error('Error deleting password:', error);
        // Handle error, e.g., show an error message to the user
      }
    };
    const columns = [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'account', headerName: 'Account', width: 130 },
      { field: 'passwords', headerName: 'Passwords', width: 130 ,sortable: false},
      
      {
        field: 'action',
        headerName: 'Delete',
        width: 130,
        sortable: false,
        renderCell: (params) => (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDelete(params.id)}
          >
            Delete
          </Button>
        ),
      },
      
      
    ];
    

    useEffect(()=>{
      fetchData()
    },[])


  return (
    <React.Fragment>
      <CssBaseline />
      <div style={{ height: 400, width: '100%' }}>
        <h4>My passwords</h4>
      <DataGrid
        rows={data}
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
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
    </React.Fragment>
  );
}
