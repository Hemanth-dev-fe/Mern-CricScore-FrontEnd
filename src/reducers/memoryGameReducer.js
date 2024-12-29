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
            timeLimit:75,
            timeFormate:"00h:01min:15sec"
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
                state.timeLimit=75;
                state.timeFormate=formate(75)
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
                state.timeLimit -= 1;
                state.timeFormate = formate(state.timeLimit);
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
                state.timeLimit=60;
                state.formattedTime = formate(70);

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
const formate=(seconds)=>{
    let hours=Math.floor(seconds/3600);
    let minutes=Math.floor((seconds%3600)/60);
    let second=Math.floor(seconds % 60);
    return `${hours.toString().padStart(2,"0")}h:${minutes.toString().padStart(2,"0")}min:${second.toString().padStart(2,"0")}sec`

}
/* Calculate Hours:

let hours = Math.floor(70 / 3600);

Since 70 / 3600 is much less than 1, Math.floor(0.0194444) results in 0 hours.

Calculate Remaining Minutes:

let minutes = Math.floor((70 % 3600) / 60);

First, we find 70 % 3600, which is still 70 because 70 is less than 3600.

Next, 70 / 60 is 1.1666666667. Using Math.floor(1.1666666667) results in 1 minute.

Calculate Remaining Seconds:

let second = Math.floor(70 % 60);

70 % 60 is 10, so this gives us 10 seconds. */

/* example
When Seconds Go Below 60
Second Last Second (61 → 60 seconds)

timeLimit: 60

Formatting:

Hours: Math.floor(60 / 3600) = 0

Minutes: Math.floor((60 % 3600) / 60) = 1

Seconds: 60 % 60 = 0

Formatted Time: "00h:01min:00sec"

Last Second (60 → 59 seconds)

timeLimit: 59

Formatting:

Hours: Math.floor(59 / 3600) = 0

Minutes: Math.floor((59 % 3600) / 60) = 0

Seconds: 59 % 60 = 59

Formatted Time: "00h:00min:59sec" */