import { createSlice } from "@reduxjs/toolkit";

const UserAuthLoginSlice=createSlice(
    {
        "name":"userAuth",
        initialState:{
            userName:"",
            email:"",
            password:""
        },
        reducers:{
            setUserName:(state,action)=>{
                state.userName=action.payload
            },
            setEmail:(state,action)=>{
                state.email=action.payload
            },
            setPassword:(state,action)=>{
                state.password=action.payload
            }

        }
    }
)
export const{setUserName,setEmail,setPassword}=UserAuthLoginSlice.actions
export default UserAuthLoginSlice.reducer