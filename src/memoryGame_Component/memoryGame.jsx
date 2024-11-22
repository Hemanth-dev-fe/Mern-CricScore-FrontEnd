import { useDispatch, useSelector } from "react-redux"
import {startGame,enterInputValues,hideInitialValues,decrementTimeLimit,calculateWinner,resetGame} from "../reducers/memoryGameReducer"
import { useCallback, useEffect, useRef } from "react"
import Button from '@mui/material/Button';
import "./memoryGame.css"
import WinnerMessage from "./winnerMessage";
function MemoryGame()
{
    let grid=useSelector((state)=>state.memory?.grid)
    let revalSquare=useSelector((state)=>state.memory?.revalSquare)
    let enterValues=useSelector((state)=>state.memory?.enterValues)
    let attempts=useSelector((state)=>state.memory?.attempts)
    let maxAttempts=useSelector((state)=>state.memory?.maxAttempts)
    let initialReval=useSelector((state)=>state.memory?.initialReval)
    let message=useSelector((state)=>state.memory?.message)
    let gameStatus=useSelector((state)=>state.memory?.gameStatus)
    let timeLimit=useSelector((state)=>state.memory?.timeLimit)
    let dispatch=useDispatch();
    let timer=useRef(null);
    let hideTimer=useRef(null)

    const setTimer=useCallback(()=>{
        hideTimer.current=setTimeout(()=>{
            dispatch(hideInitialValues())
        },10000);
        timer.current=setInterval(()=>{
            dispatch(decrementTimeLimit())
        },1000)
    },[dispatch])
    useEffect(()=>{
        dispatch(startGame())
        setTimer();
        return ()=>{
           clearTimeout( hideTimer.current)
           clearInterval(timer.current)
        }

    },[dispatch,setTimer])
    useEffect(()=>{
        if(gameStatus==="won"||gameStatus==="lost")
        {
            clearInterval(timer.current)
        }
    },[gameStatus])

    const handleInputChange=(value,index)=>{
           if(!initialReval && gameStatus==="playing" )
           {
            dispatch(enterInputValues({value,index}))
           }
        
    }
    const checkWin=()=>{
        dispatch(calculateWinner())
    }
    const reset=()=>{
        clearTimeout(hideTimer.current); clearInterval(timer.current);
        dispatch(resetGame())
        dispatch(startGame())
        setTimer()
    }
    return(
        <>
        <div className="game-container">
        {gameStatus==="won"?(<>
        <WinnerMessage/>
        </>):(
            <>
            <div className="message-info">
                
                {gameStatus==="playing" && <p className="message">Attempts : {attempts}/{maxAttempts} | Timeleft: {timeLimit}s </p>}
                {<p>{message}</p>}

            </div>
            <div className="grid">
                {
                   grid &&  grid.map((value,index)=>{
                    return (
                        <div key={index} className="tile">
                            {initialReval || revalSquare[index]?(value):
                            (
                                <input
                                type="text"
                                value={enterValues[index]||""}
                                onChange={(e)=>{handleInputChange(e.target.value,index)}}
                                className="tile-input"
                                disabled={initialReval}
                                />
                                
                            )
                            
                            }
                        </div>
                    )

                    })
                }
               
            </div>
        <div className="button-list">
        {gameStatus==="playing" && <Button variant="contained" color="primary"  onClick={checkWin} disabled={initialReval}>Check</Button>}
        {gameStatus==="lost" && <Button variant="contained" sx={{ backgroundColor: 'red' }}  onClick={reset}>Reset</Button>}
        </div>
            </>
        )
        
        }
            
        </div>
        </>
    )
}
export default MemoryGame