import { createSlice } from "@reduxjs/toolkit";

const MemoryReducer=createSlice(
    {
        name:"MemoryGame",
        initialState:{
            grid:Array(9).fill(null),
            revalSquare:Array(9).fill(false),
            enterValues:Array(9).fill(""),
            attempts:0,
            maxAttempts:3,
            initialReval:true,
            message:"",
            gameStatus:"playing",
            timeLimit:60
        },
        reducers:{
            startGame:(state)=>{
                state.grid=shuffleGrid();
                state.revalSquare=Array(9).fill(true);
                state.enterValues=Array(9).fill("");
                state.attempts=0;
                state.maxAttempts=3;
                state.initialReval=true;
                state.message="";
                state.gameStatus="playing";
            },
            enterInputValues:(state,action)=>{
                let {value,index}=action.payload;
                state.enterValues[index]=value

            },
            hideInitialValues:(state)=>{
                state.revalSquare.fill(false);
                state.initialReval=false

            },
            decrementTimeLimit:(state)=>{
                state.timeLimit += -1;
                if(state.timeLimit<=0 && state.gameStatus==="playing")
                {
                    state.message="you lost the game try again!";
                    state.gameStatus="lost"
                }

            },
            calculateWinner:(state)=>{
                let winner=state.grid.every((val,index)=>val.toString()===state.enterValues[index]);
                if(winner)
                {
                    state.message="Congratulation!";
                    state.gameStatus="won"
                }
                else{
                    state.attempts +=1;
                    if(state.attempts>=state.maxAttempts)
                    {
                        state.message="You lost The Game";
                        state.gameStatus="lost"
                    }
                    else{
                        state.message="Try Again You Have A Another Chance"
                    }
                }

            },
            resetGame:(state)=>{
                state.grid=Array(9).fill(null);
                state.revalSquare=Array(9).fill(false);
                state.enterValues=Array(9).fill("");
                state.attempts=0;
                state.maxAttempts=3;
                state.initialReval=true;
                state.message="";
                state.gameStatus="playing";
                state.timeLimit=60

            },
        }
    }
);
export default MemoryReducer.reducer;
export const {startGame,enterInputValues,hideInitialValues,decrementTimeLimit,calculateWinner,resetGame}=MemoryReducer.actions;
const shuffleGrid=()=>{
    let arr=[1,2,3,4,5,6,7,8,9];
    for(let i=arr.length-1;i>0;i--)
    {
        let j=Math.floor(Math.random()*(i+1));
        [arr[i],arr[j]]=[arr[j],arr[i]]
    }
    return arr

}