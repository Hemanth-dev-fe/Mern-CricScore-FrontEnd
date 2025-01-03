import  { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Card, CardContent, CardActions } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from "axios"

const LoginForm = ({ toggleForm,setAuth }) => {
  const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const Navigate=useNavigate()
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post("https://mern-cricscore-backend.onrender.com/auth/login", { email: username, password });
          console.log("data stored:", response.data);
          setAuth(true);
          Navigate("./tile");
          setUsername("");
          setPassword("");
      } catch (error) {
          console.log("error is while login:", error);
          alert("Invalid credentials");
      }
  };
return(
  <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
    <Card sx={{width:"400px", height:"320px"}}>
    <Typography variant="h4" align='center' sx={{marginTop:"15px"}}>Login</Typography>
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
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://mern-cricscore-backend.onrender.com/auth/register", {
        name: username,
        email: email,
        password: password
      });
      console.log("register successfully", response.data);
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log("error registering:", error.response ? error.response.data : error.message);
      alert("Invalid credentials");
    }
  };

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
    console.log("Toggling form");
    setIsLogin(!isLogin);
    console.log("isLogin state:", !isLogin);
  };

  return (
    <Container maxWidth="sm">
      {isLogin ? (
        <LoginForm toggleForm={toggleForm} setAuth={setAuth} />
      ) : (
        <RegistrationForm toggleForm={toggleForm} />
      )}
    </Container>
  );
};
AuthPage.propTypes={
  setAuth:PropTypes.func.isRequired
}
export default AuthPage;