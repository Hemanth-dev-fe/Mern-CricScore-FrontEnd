import { createSlice } from "@reduxjs/toolkit";

const UserAuthSlice=createSlice(
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
export const{setUserName,setEmail,setPassword}=UserAuthSlice.actions
export default UserAuthSlice.reducer