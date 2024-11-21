import { createSlice } from "@reduxjs/toolkit";

const ThemeReducer=createSlice(
    {
        name:"Theme",
        initialState:{
            DarkMode:false,
        },
        reducers:{
            toggleTheme:(state)=>{
                state.DarkMode=!state.DarkMode;
            },
        },
    },
);

export const{toggleTheme}=ThemeReducer.actions
export default ThemeReducer.reducer