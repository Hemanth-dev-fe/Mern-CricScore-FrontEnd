import  { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Card, CardContent, CardActions } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import AdminLogin from "./admin-login"
import { useDispatch, useSelector } from 'react-redux';
import {setUserName,setEmail,setPassword} from "../reducers/userAuthloginandlogoutcredentials"

const LoginForm = ({ toggleForm,setAuth,isUserLogin,handleAdminUser,handleUserLogin }) => {
  const dispatch=useDispatch()
  // const [username, setUsername] = useState('');
  //   const [password, setPassword] = useState('');
  const email=useSelector((state)=>state.userAuth.email)
  const password=useSelector((state)=>state.userAuth.password)
    
    const Navigate=useNavigate()
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post("https://mern-cricscore-backend.onrender.com/auth/login", { email, password });
          console.log("data stored:", response.data);
          setAuth(true);
          Navigate("./tile");
          console.log("Email after login:", email); // Log the email to check its value
          dispatch(setEmail(email));
          dispatch(setPassword(""));
      } catch (error) {
          console.log("error is while login:", error);
          alert("Invalid credentials");
      }
  };
return(
  <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
    <Card sx={{width:"340px", height:"410px"}}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between',padding:"10px"}}>
    <Box sx={{ textAlign: 'center',cursor:"pointer" }}>
    <img src="userlogin.jpg" alt="user login" width="50px" height="50px" onClick={handleUserLogin} />
    <Typography variant="body1">User</Typography>
  </Box>
  <Box sx={{ textAlign: 'center',cursor:"pointer" }}>
    <img src="adminlogin.jpg" alt="admin login" width="50px" height="50px" onClick={handleAdminUser} />
    <Typography variant="body1">Admin</Typography>
  </Box>
 
        </Box>
    {
      isUserLogin?
      (
        <>
        <Typography variant="h4" align='center' sx={{marginTop:"15px"}}>Login</Typography>
      <CardContent>
      <TextField label="Email" variant="standard" fullWidth margin="dense"
    value={email}
    onChange={(e) => dispatch(setEmail(e.target.value))} />
    <TextField label="Password" type="password" variant="standard" fullWidth margin="dense" 
    value={password}
    onChange={(e) => dispatch(setPassword(e.target.value))}/>
      </CardContent>
    <CardActions>
    <Button variant="contained" color="primary" fullWidth onClick={(e) => handleLogin(e)}>Login</Button>
    </CardActions>
    <Box textAlign="center">
    <Button onClick={toggleForm} color="secondary">Dont have an account? Sign Up</Button>
    </Box>
        </>
      ):(
        <>
        <AdminLogin/>
          </>
      )
    }
    
    </Card>
    </div>
 
)

}
LoginForm.propTypes={
  toggleForm:PropTypes.func.isRequired,
  isUserLogin:PropTypes.bool.isRequired,
  handleAdminUser:PropTypes.func.isRequired,
  handleUserLogin:PropTypes.func.isRequired,
  setAuth: PropTypes.func?.isRequired,
}
const RegistrationForm = ({ toggleForm }) => {
  const dispatch=useDispatch()
  // const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const username=useSelector((state)=>state.userAuth.userName)
  const email=useSelector((state)=>state.userAuth.email)
  const password=useSelector((state)=>state.userAuth.password)
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://mern-cricscore-backend.onrender.com/auth/register", {
        name: username,
        email: email,
        password: password
      });
      console.log("register successfully", response.data);
      dispatch(setUserName(""))
    dispatch(setEmail(""))
    dispatch(setPassword(""))
    } catch (error) {
      console.log("error registering:",  error.message);
      alert("Invalid credentials");
    }
  };

  return(
  
     <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <Card sx={{width:"340px", height:"380px"}}>
          <Typography variant="h4" align='center' sx={{marginTop:"15px"}}>Sign Up</Typography>
        <CardContent>
        <TextField label="Name" variant="standard" fullWidth margin="dense"value={username}
    onChange={(e) => dispatch(setUserName(e.target.value))} />
        <TextField label="Email" variant="standard" fullWidth margin="dense"
    value={email}
    onChange={(e) => dispatch(setEmail(e.target.value))} />
    <TextField label="Password" type="password" variant="standard" fullWidth margin="dense" 
    value={password}
    onChange={(e) => dispatch(setPassword(e.target.value))}/>
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
  const [isUserLogin,setIsUserLogin]=useState(true)
  

  const toggleForm = () => {
    console.log("Toggling form");
    setIsLogin(!isLogin);
    console.log("isLogin state:", !isLogin);
  };

  const handleAdminUser=()=>{
    setIsUserLogin(false)
  }
  const handleUserLogin=()=>{
    setIsUserLogin(true)
  }
  return (
    <Container maxWidth="sm">
      {isLogin ? (
        <LoginForm toggleForm={toggleForm} setAuth={setAuth}
        isUserLogin={isUserLogin} handleAdminUser={handleAdminUser} handleUserLogin={handleUserLogin}
        />
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