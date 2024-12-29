import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import "./actions-creating buttons and display input.css";
import DeliveryMap from "./deliverMap for inputfield";
import { incrementRuns, addBall, addWicket, addExtras, resetGame, setDeliveryMapInEachOver, toggleScoreCard } from "../reducers/ScoreCardSlice_cricket";
import { useEffect, useState } from "react";

function DisplayButtonAndInput() {
  const matchStarted = useSelector((state) => state.cricScore.matchStarted);
  const inningsCompleted = useSelector((state) => state.cricScore.inningsCompleted);
  const toggleScoreCardFlag = useSelector((state) => state.cricScore.toggleScoreCardFlag);
  const isOverCompleted = useSelector((state) => state.cricScore.isOverCompleted);
  const [deliveries, setDeliveries] = useState([]);
  const [actionHistory, setActionHistory] = useState([]);
  const dispatch = useDispatch();

  const handleValidBall = () => {
    dispatch(addBall());
  };

  const handleDelivery = (outcome) => {
    setDeliveries((del) => [...del, outcome]);
  };

  const updateActionHistory = (action) => {
    setActionHistory([...actionHistory, action]);
  };

  const handleruns = (runs) => {
    dispatch(incrementRuns(runs));
    handleValidBall();
    handleDelivery(runs);
    updateActionHistory({ action: 'run', runs });
  };

  const handleWicket = () => {
    dispatch(addWicket());
    handleValidBall();
    handleDelivery("w");
    updateActionHistory({ action: 'wicket' });
  };

  const handleExtra = (type) => {
    dispatch(addExtras({ type, runs: 1 }));
    const oc = type === 'noBall' ? "NB" : type === "wide" ? "WD" : type;
    handleDelivery(oc);
    if (type !== 'noBall' && type !== 'wide') {
      handleValidBall();
    }
    updateActionHistory({ action: 'extra', type });
  };

  const handleReset = () => {
    dispatch(resetGame());
    setDeliveries([]);
    setActionHistory([]);
  };

  const handleViewScorecard = () => {
    dispatch(toggleScoreCard());
  };

  useEffect(() => {
    if (isOverCompleted) {
      dispatch(setDeliveryMapInEachOver(deliveries));
      setDeliveries([]);
    }
  }, [dispatch,isOverCompleted, deliveries]);

  return (
    <>
      {matchStarted && !inningsCompleted && (
        <>
          <DeliveryMap deliveries={deliveries} />
          <div className="ActionsContainer">
            <Button variant="contained" color="primary" className="button" onClick={() => handleruns(0)}>Dot Ball</Button>
            {[1, 2, 3, 4, 6].map((run) => (
              <Button key={run} variant="contained" color="primary" className="button" onClick={() => handleruns(run)}>{run} Run{run > 1 ? "s" : ""}</Button>
            ))}
            <Button variant="contained" color="primary" className="button" onClick={() => handleWicket()}>Wicket</Button>
            <Button variant="contained" color="primary" className="button" onClick={() => handleExtra('noBall')}>No Ball</Button>
            <Button variant="contained" color="primary" className="button" onClick={() => handleExtra('wide')}>Wide Ball</Button>
          </div>
          <div className="ActionsContainer-2">
            <Button variant="contained" color="secondary" className="button2" onClick={() => handleReset()}>Reset</Button>
            <Button variant="contained" color="secondary" className="button2" onClick={() => handleViewScorecard()}>{toggleScoreCardFlag ? 'Hide Scorecard' : 'View Scorecard'}</Button>
          </div>
        </>
      )}
    </>
  );
}

export default DisplayButtonAndInput;