import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  List,
  Dialog,
  DialogContent,
  DialogActions,
  Grid,
} from '@mui/material';
import './ScoreBoardDialog.css';
import OverItem from './OverDetailsCard';
import { toggleScoreCard } from '../reducers/ScoreCardSlice_cricket';

function ScoreBoard() {
  const matchStarted = useSelector((state) => state.cricScore.matchStarted);
  const toggleScoreCardFlag = useSelector((state) => state.cricScore.toggleScoreCardFlag);
  const dispatch = useDispatch();

  const deliveryMapOfEachOverInnings1 = useSelector((state) => state.cricScore.innings[0].delivaryMapInEachOver);
  const deliveryMapOfEachOverInnings2 = useSelector((state) => state.cricScore.innings[1].delivaryMapInEachOver);

  const isGullyCricket = useSelector((state) => state.cricScore.isGullyCricket);

  function calculateRunsInOver(over) {
    return over.reduce((acc, curr) => {
      if (typeof curr === 'number') {
        return acc + curr;
      } else if (
        (curr === 'WD' || curr === 'NB') &&
        (isGullyCricket?.EnableExtraRunsForWide || isGullyCricket?.EnableExtraRunsForNoBall)
      ) {
        return acc + 1;
      }
      return acc;
    }, 0);
  }

  function countWicketsInOver(over) {
    return over.filter((d) => d === 'W').length;
  }

  const batting = 'batting';
  const bowling = 'bowling';
  const [view, setView] = useState(batting);
  const [inningsView, setInningsView] = useState(1); // 1 for first innings, 2 for second innings

  const toggleView = (option) => setView(option === bowling ? bowling : batting);
  const toggleInningsView = (innings) => setInningsView(innings);

  const handleClose = () => {
    dispatch(toggleScoreCard());
  };

  const deliveryMapsToShow = inningsView === 1 ? deliveryMapOfEachOverInnings1 : deliveryMapOfEachOverInnings2;

  console.log('deliveryMapOfEachOverInnings1:', deliveryMapOfEachOverInnings1);
  console.log('deliveryMapOfEachOverInnings2:', deliveryMapOfEachOverInnings2);
  console.log('deliveryMapsToShow:', deliveryMapsToShow);

  return (
    <>
      {matchStarted && toggleScoreCardFlag ? (
        <Dialog
          fullScreen
          open={toggleScoreCardFlag}
          onClose={handleClose}
          aria-labelledby="scoreboard-dialog-title"
          aria-describedby="scoreboard-dialog-description"
        >
          <DialogContent
            sx={{
              margin: '0px',
              backgroundColor: '#f5f5f5',
              padding: '16px',
              borderRadius: '8px',
            }}
          >
            <div className="scoreboard-scroll" id="scoreboardScroll">
              <Container
                sx={{
                  margin: '0px',
                  backgroundColor: '#f5f5f5',
                  padding: '16px',
                  borderRadius: '8px',
                }}
              >
                <Grid container spacing={0}>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => toggleView(batting)}
                      style={{ display: view === batting ? 'none' : 'inline-flex' }}
                    >
                      Show Batting statistics
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => toggleView(bowling)}
                      style={{ display: view === bowling ? 'none' : 'inline-flex' }}
                    >
                      Show Bowling statistics
                    </Button>
                  </Grid>
                </Grid>
                <Grid container spacing={0} sx={{ marginTop: '16px' }}>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => toggleInningsView(1)}
                      style={{ display: inningsView === 1 ? 'none' : 'inline-flex' }}
                    >
                      Show First Innings
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => toggleInningsView(2)}
                      style={{ display: inningsView === 2 ? 'none' : 'inline-flex' }}
                    >
                      Show Second Innings
                    </Button>
                  </Grid>
                </Grid>
                {view === batting ? (
                  <Card>
                    <CardContent>
                      <Typography variant="h5">Coming Soon.....</Typography>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent>
                      <Typography variant="h5">Bowling Scorecard</Typography>
                      <List>
                        {deliveryMapsToShow && deliveryMapsToShow.length > 0 ? (
                          deliveryMapsToShow.map((over, index) => {
                            const wicketsInOver = countWicketsInOver(over);
                            const runsInOver = calculateRunsInOver(over);
                            return (
                              <OverItem
                                key={index}
                                index={index}
                                runsInOver={runsInOver}
                                wicketsInOver={wicketsInOver}
                                over={over}
                              />
                            );
                          })
                        ) : (
                          <Typography variant="h6">No data available for this innings.</Typography>
                        )}
                      </List>
                    </CardContent>
                  </Card>
                )}
              </Container>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}
    </>
  );
}

export default ScoreBoard;