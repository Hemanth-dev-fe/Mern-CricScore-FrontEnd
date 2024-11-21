import { useDispatch, useSelector } from "react-redux";
import { addSquare, resetGame } from "../reducers/TicTocToereducer";
import "./game.css";
import Board from "./board";
import PropTypes from "prop-types";

function Game({ player1, player2, cancel }) {
    const squares = useSelector((state) => state.game.squares);
    const winner = useSelector((state) => state.game.winner);
    const xIsNext = useSelector((state) => state.game.xIsNext);
    const dispatch = useDispatch();

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
                        <p>The Next Player Is: {xIsNext ? player1 : player2}</p>
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
