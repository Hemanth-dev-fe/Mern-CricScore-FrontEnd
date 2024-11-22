import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentText } from "../reducers/textanimation_tictoctoe_reducer";
import { setPlayersName } from "../reducers/TicTocToereducer";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import Game from "./game";

function TextAnimation() {
    const text = useSelector((state) => state.TextAnimation.text);
    const currentText = useSelector((state) => state.TextAnimation.currentText);
    const dispatch = useDispatch();
    const [showButton, setShowButton] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [showGame, setShowGame] = useState(false);
    const [player1, setPlayer1] = useState("");
    const [player2, setPlayer2] = useState("");
    const [player1Name, setPlayer1Name] = useState("A");
    const [player2Name, setPlayer2Name] = useState("B");
    const index = useRef(0);

    useEffect(() => {
        if (!text) return; // If no text, then interval stop
        const interval = setInterval(() => {
            if (index.current < text.length) {
                let updatedText = currentText + text[index.current];
                dispatch(updateCurrentText(updatedText));
                index.current++;
            } else {
                clearInterval(interval);
                setShowButton(true);
            }
        }, 100);
        return () => clearInterval(interval);
    }, [dispatch, text, currentText]);

    const handleInputButton = () => {
        setShowButton(false);
        setShowInput(true);
    };

    const handleCancelButton = () => {
        setShowInput(false);
        setShowButton(true);
        setShowGame(false);
    };

    const handleStartButton = () => {
        // Use default names "A" and "B" if no names are entered
        const name1 = player1.trim() ? player1 : "A";
        const name2 = player2.trim() ? player2 : "B";

        // Update state
        setPlayer1Name(name1);
        setPlayer2Name(name2);

        // Dispatch the setPlayersName action with player names
        dispatch(setPlayersName({ player1: name1, player2: name2 }));
        setShowInput(false);
        setShowGame(true);
    };

    if (showGame) {
        return <Game player1={player1Name} player2={player2Name} cancel={handleCancelButton} />; // Render the game component with set names
    }

     
        // Ensure event is defined The onChange event handler in the first snippet automatically receives the event parameter,
        // which is essential for accessing the input value.

        /* Direct Function Reference (First Snippet):

onChange={handleInputChange}

Here, handleInputChange is passed directly as the event handler function. This allows the TextField component to automatically pass 
the event object to the function when an input change occurs.

Arrow Function (Second Snippet):

onChange={() => { handleInputChange(); }}

This creates a new arrow function that calls handleInputChange without any parameters. 
Since handleInputChange expects an event parameter, this will cause an error because event is not passed. */
const handleInputChange1 = (event) => {
        const input = event.target.value; 
                const capitalizedInput = input.charAt(0).toUpperCase() + input.slice(1); 
                setPlayer1(capitalizedInput);
               };
                const handleInputChange2 = (event) => {
                    const input = event.target.value; 
                            const capitalizedInput = input.charAt(0).toUpperCase() + input.slice(1); 
                            
                            setPlayer2(capitalizedInput); };
    return (
        <>
            <h4
                style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "20px",
                    fontSize: "25px",
                    background: "linear-gradient(red, blue, orange, pink, green, lightgreen, yellow)",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                }}
            >
                {currentText}
            </h4>
            {showButton && (
                <Box display="flex" alignItems="center" flexDirection="column" justifyContent="center" height="50vh">
                    <Button variant="contained" color="primary" onClick={handleInputButton}>Start Game</Button>
                </Box>
            )}
            {showInput && (
                <Dialog open={showInput}>
                    <DialogTitle>Enter Team Details</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            label="Your Name"
                            fullWidth
                            value={player1}
                            onChange={handleInputChange1}
                            variant="standard"
                            margin="dense"
                        />
                        <TextField
                            label="Another Player Name"
                            fullWidth
                            value={player2}
                            onChange={handleInputChange2}
                            variant="standard"
                            margin="dense"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCancelButton}>Cancel</Button>
                        <Button onClick={handleStartButton}>Start</Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
}

export default TextAnimation;
