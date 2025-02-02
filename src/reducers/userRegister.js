import { createSlice } from "@reduxjs/toolkit";

const UserAuthRegisterSlice=createSlice(
    {
        "name":"userAuth",
        initialState:{
            userName:"",
            email:"",
            password:""
        },
        reducers:{
            setUserName1:(state,action)=>{
                state.userName=action.payload
            },
            setEmail1:(state,action)=>{
                state.email=action.payload
            },
            setPassword1:(state,action)=>{
                state.password=action.payload
            }

        }
    }
)
export const{setUserName1,setEmail1,setPassword1}=UserAuthRegisterSlice.actions
export default UserAuthRegisterSlice.reducer