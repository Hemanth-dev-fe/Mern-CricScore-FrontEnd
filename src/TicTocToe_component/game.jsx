import { useDispatch, useSelector } from "react-redux";
import { addSquare, resetGame } from "../reducers/TicTocToereducer";
import "./game.css";
import Board from "./board";
import PropTypes from "prop-types";
import Button from "@mui/material/Button"
import MemoryGame from "../memoryGame_Component/memoryGame";
import {  useState } from "react";
import { Box, Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material";

function Game({ player1, player2, cancel }) {
    const squares = useSelector((state) => state.game.squares);
    const winner = useSelector((state) => state.game.winner);
    const xIsNext = useSelector((state) => state.game.xIsNext);
    const [nextLevel,setNextLevel]=useState(false)
    const [open,setOpen]=useState(false)
    const dispatch = useDispatch();
    if(nextLevel)
    {
        return <MemoryGame/>
    }
    

    const handleRest = () => {
        dispatch(resetGame());
    };

    const handleSquare = (i) => {
        dispatch(addSquare(i));
    };

    return (
        <>
            <div className="game_board">
                <div className="winnername">
                    {winner ? (
                        <p className="winnermessage">Congratulations: {winner}</p>
                    ) : (
                        <p style={{margin:"20px",textAlign:"center"}}>The Next Player Is: {xIsNext ? player1 : player2}</p>
                    )}
                </div>
                <Board squares={squares} clicked={handleSquare} />
                <div className="buttonsadj">
                    <button type="button" className="but" onClick={handleRest}>Reset</button>
                    <button type="button" className="but" onClick={()=>{
                        cancel();
                        handleRest()
                    }}>Exit</button>
                </div>
                {winner && (<div style={{marginTop:"30px", textAlign:"center"}}>
                    <p style={{color:"lightgreen",margin:"20px"}}>Hello  &apos;{winner}&apos; , If You Want To Play Next Level . Please Click the Below Button </p>
                    <Button variant="contained" color="primary" onClick={()=>{setOpen(true)}} style={{marginTop:"15px", textAlign:"center"}} >Next-Level</Button>
                    <Box display="flex" justifyContent="center" alignItems="center" >
                        <Dialog open={open} onClose={() => setOpen(false)} >
                            <DialogContent sx={{padding:"35px"}}>
                                <DialogContentText>are you want to move next level?</DialogContentText>
                            </DialogContent>
                            <DialogActions>
                            <Button variant="contained" color="primary" onClick={()=>{setOpen(false)}} >No</Button>
                            <Button variant="contained" color="primary" onClick={()=>{setNextLevel(true)}} >Yes</Button>
                            
                            </DialogActions>
                        </Dialog>
                    </Box>

                    </div>)
                
                }
            </div>
        </>
    );
}

Game.propTypes = {
    player1: PropTypes.string.isRequired,
    player2: PropTypes.string.isRequired,
    cancel: PropTypes.func.isRequired
};

export default Game;
