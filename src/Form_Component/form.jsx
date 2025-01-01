import  { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Card, CardContent, CardActions } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from "axios"

const LoginForm = ({ toggleForm,setAuth }) => {
  const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const Navigate=useNavigate()
  const handleLogin = async(e) => {
    
    // Add your authentication logic here
    e.preventDefault();
    try{
      const response= await axios.post("http://localhost:1800/login",{email:username,password})
    
      console.log("data stored:" ,response.data)
      setAuth(true)
      Navigate("./tile")
      setUsername("")
      setPassword("")

    }
    catch(error){
      console.log("error is while login :", error)
      alert("invalid credentials")
    }
};
return(
  <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
    <Card sx={{width:"400px", height:"320px"}}>
    <Typography variant="h4" align='center' sx={{marginTop:"15px"}}>Sign In</Typography>
      <CardContent>
      <TextField label="Email" variant="standard" fullWidth margin="dense"
    value={username}
    onChange={(e) => setUsername(e.target.value)} />
    <TextField label="Password" type="password" variant="standard" fullWidth margin="dense" 
    value={password}
    onChange={(e) => setPassword(e.target.value)}/>
      </CardContent>
    <CardActions>
    <Button variant="contained" color="primary" fullWidth onClick={(e) => handleLogin(e)}>Login</Button>
    </CardActions>
    <Box textAlign="center">
    <Button onClick={toggleForm} color="secondary">Dont have an account? Sign Up</Button>
    </Box>
    </Card>
    </div>
 
)

}
LoginForm.propTypes={
  toggleForm:PropTypes.func.isRequired,
  setAuth: PropTypes.func?.isRequired,
}
const RegistrationForm = ({ toggleForm }) => {
  const handleRegister=async(e)=>{
    e.preventDefault();
    try{
      await axios.post("http://localhost:1800/register",{username,email,password})
    console.log("register successfully");
    setUsername("")
    setEmail("")
    setPassword("")
    }
    catch(error)
    {
      console.log("error registering:", error)
      alert("invalide credentials")
    }
  }
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return(
  
     <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <Card sx={{width:"400px", height:"380px"}}>
          <Typography variant="h4" align='center' sx={{marginTop:"15px"}}>Sign Up</Typography>
        <CardContent>
        <TextField label="Name" variant="standard" fullWidth margin="dense"value={username}
    onChange={(e) => setUsername(e.target.value)} />
        <TextField label="Email" variant="standard" fullWidth margin="dense"
    value={email}
    onChange={(e) => setEmail(e.target.value)} />
    <TextField label="Password" type="password" variant="standard" fullWidth margin="dense" 
    value={password}
    onChange={(e) => setPassword(e.target.value)}/>
        </CardContent>
        <CardActions>
        <Button variant="contained" color="primary" fullWidth onClick={handleRegister}>Sign Up</Button>
        </CardActions>
        <Box sx={{textAlign:"center"}}>
        <Button onClick={toggleForm} color="secondary">Already have an account? Login</Button>
        </Box>
        </Card>
     </div>
        
     
  
  )
}
RegistrationForm.propTypes={
  toggleForm:PropTypes.func.isRequired
}
const AuthPage = ({ setAuth }) => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Container maxWidth="sm">
      {isLogin ? <LoginForm toggleForm={toggleForm} setAuth={setAuth} /> : <RegistrationForm toggleForm={toggleForm} />}
    </Container>
  );
};
AuthPage.propTypes={
  setAuth:PropTypes.func.isRequired
}
export default AuthPage;