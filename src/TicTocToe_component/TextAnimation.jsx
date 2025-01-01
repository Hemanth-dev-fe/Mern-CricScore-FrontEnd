import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentText } from "../reducers/textanimation_tictoctoe_reducer";
import { setPlayersName } from "../reducers/TicTocToereducer";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, TextField } from "@mui/material";
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
    const [player1Name, setPlayer1Name] = useState("");
    const [player2Name, setPlayer2Name] = useState("");
    const [snackbar, setSnackbar] = useState(false);
    const index = useRef(0);

    const handleSnackBarOpen = () => {
        setSnackbar(true);
        console.log("Snackbar state set to true");
    };

    const handleSnackBarClose = () => {
        setSnackbar(false);
        console.log("Snackbar state set to false");
    };

    useEffect(() => {
        if (!text) return;
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
        const name1 = player1.trim() ? player1 : "A";
        const name2 = player2.trim() ? player2 : "B";

        console.log(`Player 1 Name: ${name1}, Player 2 Name: ${name2}`);
        
        if (name1 === "A" || name2 === "B") {
            handleSnackBarOpen();
        }

        setPlayer1Name(name1);
        setPlayer2Name(name2);

        dispatch(setPlayersName({ player1: name1, player2: name2 }));
        setShowInput(false);
        setShowGame(true);
    };

    if (showGame) {
        return <Game player1={player1Name} player2={player2Name} cancel={handleCancelButton} />;
    }

    const handleInputChange1 = (event) => {
        const input = event.target.value;
        const capitalizedInput = input.charAt(0).toUpperCase() + input.slice(1);
        setPlayer1(capitalizedInput);
    };

    const handleInputChange2 = (event) => {
        const input = event.target.value;
        const capitalizedInput = input.charAt(0).toUpperCase() + input.slice(1);
        setPlayer2(capitalizedInput);
    };

    return (
        <>
            <h4
                style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "20px",
                    fontSize: "25px",
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
            <Snackbar
                open={snackbar}
                autoHideDuration={5000}
                onClose={handleSnackBarClose}
                message="Starting match with default values"
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                sx={{
                    '.MuiSnackbar-root': {
                        backgroundColor: 'grey',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '1.5rem',
                        zIndex: 9999,
                    },
                }}
            />
        </>
    );
}

export default TextAnimation;
