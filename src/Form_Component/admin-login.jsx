import { Button, Card, CardActions, CardContent, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function AdminLogin() {
  const navigate=useNavigate()
    const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');
      const handleLogin = async (e) => {
        e.preventDefault();
        if(username==="admin" && password==="admin")
        {
          navigate('/Admin')
            console.log("admin logined...")
            setUsername("")
            setPassword("")
        }
        else{
          alert("invalid credentials...")
        }
        
    };
  return(
    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <Card sx={{width:"400px", height:"320px"}}>
      <Typography variant="h4" align='center' sx={{marginTop:"15px"}}>Admin Login</Typography>
        <CardContent>
        <TextField label="Email" variant="standard" fullWidth margin="dense"
      value={username}
      onChange={(e) => setUsername(e.target.value)} />
      <TextField label="Password" type="password" variant="standard" fullWidth margin="dense" 
      value={password}
      onChange={(e) => setPassword(e.target.value)}/>
        </CardContent>
      <CardActions>
      <Button variant="contained" color="primary" fullWidth onClick={(e) => handleLogin(e)}>Admin-Login</Button>
      </CardActions>
      </Card>
      </div>
   
  )
  
  }
export default AdminLogin