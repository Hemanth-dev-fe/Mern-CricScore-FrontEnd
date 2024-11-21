import { createSlice } from "@reduxjs/toolkit";

const TextSlice=createSlice(
    {
        name:"Textanimation",
        initialState:{
            text:"Hello user! Thank You For Visiting Please Enroll Your Name And Opposition Name And Start The Game ...",
            currentText:""
        },
        reducers:{
            updateCurrentText:(state,action)=>{
                state.currentText=action.payload
            }
        }

    }
);
export const{updateCurrentText}=TextSlice.actions;
export default TextSlice.reducer;