import  { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Card, CardContent, CardActions } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import AdminLogin from "./admin-login"
import { useDispatch, useSelector } from 'react-redux';
import {setUserName,setEmail,setPassword} from "../reducers/userLogin"
import {setUserName1,setEmail1,setPassword1} from "../reducers/userRegister"
const LoginForm = ({ toggleForm,setAuth,isUserLogin,handleAdminUser,handleUserLogin }) => {
  const dispatch=useDispatch()
  // const [username, setUsername] = useState('');
  //   const [password, setPassword] = useState('');
  const email=useSelector((state)=>state.UserAuthLogin.email)
  const password=useSelector((state)=>state.UserAuthLogin.password)
  const name=useSelector((state)=>state.UserAuthLogin.userName)

    
    const Navigate=useNavigate()
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
          // Send the request to the backend
          const response = await axios.post("http://localhost:3000/auth/login", { name, email, password });
          console.log("API Response Data:", response.data);
          // Log the full response data
          console.log("data stored:", response.data);
          
          // Set authentication to true
          setAuth(true);
          
          // Navigate to the desired route
          Navigate("./tile");
  
          // Dispatch the email, password, and name to Redux
          dispatch(setEmail(response.data.email));  // Set the email
          dispatch(setPassword(""));   // Clear the password
          dispatch(setUserName(response.data.name));  // Update userName with the response name
          
          // Log the response email and name
          console.log("Email after login:", response.data.email);
          console.log("Name after login:", response.data.name);
      } catch (error) {
          // Log any errors that occur
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
    value={email||""}
    onChange={(e) => dispatch(setEmail(e.target.value))} />
    <TextField label="Password" type="password" variant="standard" fullWidth margin="dense" 
    value={password||""}
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
  const username=useSelector((state)=>state.UserAuthRegister.userName)
  const email=useSelector((state)=>state.UserAuthRegister.email)
  const password=useSelector((state)=>state.UserAuthRegister.password)
  const emailVerify=/^[a-z0-9]+@+[a-z]+\.+[a-z]{2,}$/
  const passwordVerify=/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~!@#$%^&*?`|/])[a-zA-Z0-9~!@#$%^&*?`|/]{8,}$/
  const [emailError,setEmailError]=useState(false)
  const [passwordError,setPasswordError]=useState(false)
  let hashError=false
  
  const handleRegister = async (e) => {
    e.preventDefault();
    if(!emailVerify.test(email))
      {
         setEmailError(true)
         hashError=true
      }
      else
      {
        setEmailError(false)
        
      }

      if(!passwordVerify.test(password))
      {
           setPasswordError(true)
           hashError=true
      }
      else
      {
        setPasswordError(false)
       
      }


    try {


      if(hashError)
      {
        console.log("Validation errors present, registration aborted.");
        return; 
         // Prevent registration if there are validation errors
      }
      const emailResponse=await axios.get(`http://localhost:3000/auth/check-email?email=${email}`)

        if(emailResponse.data.exist)
        {
          alert("email already exist")
          return 
        }
      const response = await axios.post("https://mern-cricscorebackend.onrender.com/auth/register", {
        name: username,
        email: email,
        password: password
      });
      console.log(response)
      console.log("register successfully", response.data);
      dispatch(setUserName1(""))
    dispatch(setEmail1(""))
    dispatch(setPassword1(""))
    setUserName("")
    } catch (error) {
      console.log("error registering:",  error.message);
      // alert("Invalid credentials");
    }
  };

  return(
  
     <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <Card sx={{width:"340px", height:emailError||passwordError?"420px":"360px"}}>
          <Typography variant="h4" align='center' sx={{marginTop:"15px"}}>Sign Up</Typography>
        <CardContent>
        <TextField label="Name" variant="standard" fullWidth margin="dense"value={username}
    onChange={(e) => dispatch(setUserName1(e.target.value))} />
        <TextField label="Email" variant="standard" fullWidth margin="dense"
    value={email}
    onChange={(e) => dispatch(setEmail1(e.target.value))} />
    {emailError  && <p style={{color:"red"}}>invalid email</p>}
    <TextField label="Password" type="password" variant="standard" fullWidth margin="dense" 
    value={password}
    onChange={(e) => dispatch(setPassword1(e.target.value))}/>
    {passwordError  && <p style={{color:"red"}}>password should be one uppercase,lowercase and special character.</p>}
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