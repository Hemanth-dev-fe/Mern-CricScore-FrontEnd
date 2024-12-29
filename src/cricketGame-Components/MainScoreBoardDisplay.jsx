import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { startSecondInnings,toggleScoreCard } from "../reducers/ScoreCardSlice_cricket";

function MainScoreBoardDisplay() {
    const matchStarted = useSelector((state) => state.cricScore.matchStarted); 
    const currentInningsIndex = useSelector((state) => state.cricScore.currentInnings);
    const innings = useSelector((state) => state.cricScore.innings);
    const completedOvers = useSelector((state) => state.cricScore.innings[currentInningsIndex].completedOvers);
    const inningsCompleted = useSelector((state) => state.cricScore.inningsCompleted);
    const matchCompleted = useSelector((state) => state.cricScore.matchCompleted);
    const winnerMessage = useSelector((state) => state.cricScore.winnerMessage);
    const dispatch = useDispatch();

    const handleSecondInnings = () => {
        dispatch(startSecondInnings());
    };
     const handleViewScorecard = () => {
        dispatch(toggleScoreCard());
      };

    console.log(matchStarted);

    return (
        <>
            {matchStarted && (
                <>
                    {!inningsCompleted ? (
                        <div style={{ marginTop: "20px", textAlign: "center" }}>
                            <h4>Score: {innings[currentInningsIndex].runs}/{innings[currentInningsIndex].wickets}</h4>
                            <h4>Completed Overs: {completedOvers}</h4>
                        </div>
                    ) : (
                        <>
                            {currentInningsIndex === 1 && !matchCompleted ? (
                                <Button variant="contained" color="secondary" onClick={handleSecondInnings}>
                                    Start Second Innings
                                </Button>
                            ) : (
                                <>
                                <h4>{winnerMessage}</h4>
                                <Button variant="contained" color="secondary" className="button2" onClick={() => handleViewScorecard()}>View Scorecard</Button>
                                </>
                            )}
                        </>
                    )}
                </>
            )}
        </>
    );
}

export default MainScoreBoardDisplay;