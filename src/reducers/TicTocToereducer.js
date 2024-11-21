import { createSlice } from "@reduxjs/toolkit";

const gameReducer=createSlice(
    {
        name:"game",
        initialState:{
            squares:Array(9).fill(null),
            xIsNext:true,
            winner:null,
            player1:"",
            player2:""
        },
        reducers:{
            addSquare:(state,action)=>{
                const i=action.payload
                if(state.squares[i] || state.winner)
                {
                    return
                }
                state.squares[i]=state.xIsNext?"VIRAT":"KOHLI";
                state.xIsNext=!state.xIsNext;
                state.winner=calculateWinner(state.squares,state.player1,state.player2)

            },
            resetGame:(state)=>{
                state.squares=Array(9).fill(null);
                state.xIsNext=true;
                state.winner=null;
            },
            setPlayersName:(state,action)=>{
                state.player1=action.payload.player1;
                state.player2=action.payload.player2
            }

        },
    },
);

function calculateWinner(square,player1,player2)
{
let lines=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
]
for(let i=0;i<lines.length;i++)
{
    const[a,b,c]=lines[i]
    if(square[a] && square[a]===square[b] && square[a]===square[c])
    {
        return square[a]==="VIRAT"?player1:player2
    }
}
return null
}

export const{addSquare,resetGame,setPlayersName}=gameReducer.actions;
export default gameReducer.reducer;