import { createSlice } from "@reduxjs/toolkit";

const deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};

const initialInnings = {
    runs: 0,
    wickets: 0,
    totalOvers: 0,
    completedOvers: 0,
    totalBallsBowled: 0,
    delivaryMapInEachOver: [],
    extras: {
        wide: 0,
        noBall: 0,
        legByes: 0,
        byes: 0
    }
};

const initialState = {
    innings: [deepClone(initialInnings), deepClone(initialInnings)],
    currentInnings: 0,
    totalOvers: 0,
    teamDetails: [
        {
            name: "",
            totalPlayers: 11,
            players: []
        },
        {
            name: "",
            totalPlayers: 11,
            players: []
        }
    ],
    matchStarted: false,
    inningsCompleted: false,
    matchCompleted: false,
    target: 0,
    ShowSimpleScoreCard: false,
    toggleScoreCardFlag: false,
    isGullyCricketMode: {
        enableExtraRunsForWide: false,
        enableExtraRunsForNoBall: false
    },
    toggleScoreCard: false,
    isOverCompleted: false,
    isScoreEdited: false,
    winnerMessage: "",
    batFirstTeamName: "",
    bowlFirstTeamName: ""
};

const calculateWinner = (state) => {
    const teamAScore = state.innings[0].runs;
    const teamBScore = state.innings[1].runs;
    if (teamAScore > teamBScore) {
        const runDifference = teamAScore - teamBScore;
        const runWord = runDifference === 1 ? "run" : "runs";
        state.winnerMessage = `Team ${state.teamDetails[0].name} won by ${runDifference} ${runWord}`;
    } else if (teamAScore < teamBScore) {
        const runDifference = teamBScore - teamAScore;
        const runWord = runDifference === 1 ? "run" : "runs";
        const oversLeft = (state.totalOvers - state.innings[1].completedOvers).toFixed(1);
        const overWord = oversLeft === "1.0" ? "over" : "overs";
        state.winnerMessage = `Team ${state.teamDetails[1].name} won by ${runDifference} ${runWord} with ${oversLeft} ${overWord} remaining`;
    } else {
        state.winnerMessage = "Match tied";
    }
};

const ScoreCardSlice = createSlice({
    name: "cricket",
    initialState,
    reducers: {
        startMatch: (state, action) => {
            state.matchStarted = action.payload.newMatch;
            state.teamDetails = action.payload.teamDetails;
            state.totalOvers = action.payload.totalOvers;
            state.currentInnings = action.payload.currentInnings;
            state.innings[0].totalOvers = action.payload.totalOvers;
            state.batFirstTeamName = action.payload.batFirstTeamName;
            state.bowlFirstTeamName = action.payload.bowlFirstTeamName;
        },
        startSecondInnings: (state) => {
            state.currentInnings = 1;
            state.innings[1] = deepClone(initialInnings); // Deep clone initialInnings for the second innings
            state.innings[1].totalOvers = state.totalOvers;
            state.inningsCompleted = false;
        },
        incrementRuns: (state, action) => {
            state.innings[state.currentInnings].runs += action.payload;
            if (state.currentInnings === 1 && state.innings[1].runs > state.target) {
                calculateWinner(state);
                state.matchCompleted = true;
                state.inningsCompleted = true;
            }
        },
        addBall: (state) => {
            state.innings[state.currentInnings].totalBallsBowled += 1;

            const totalBallsBowled = state.innings[state.currentInnings].totalBallsBowled;
            const overs = Math.floor(totalBallsBowled / 6);
            const balls = totalBallsBowled % 6;
            const completedOvers = overs + balls / 10;

            state.innings[state.currentInnings].completedOvers = completedOvers;

            if (balls === 0 && totalBallsBowled !== 0) {
                state.isOverCompleted = true;
            }

            if (state.totalOvers > 0 && completedOvers >= state.totalOvers) {
                if (state.currentInnings === 0) {
                    state.inningsCompleted = true;
                    state.target = state.innings[0].runs + 1;
                    state.currentInnings = 1;
                } else if (state.currentInnings === 1) {
                    state.inningsCompleted = true;
                    calculateWinner(state);
                    state.matchCompleted = true;
                }
            }
        },
        addExtras: (state, action) => {
            const { type, runs } = action.payload;
            state.innings[state.currentInnings].extras[type] += 1;
            state.innings[state.currentInnings].runs += runs;
        },
        addWicket: (state) => {
            state.innings[state.currentInnings].wickets += 1;
        },
        switchInnings: (state) => {
            state.currentInnings = 1;
        },
        setTarget: (state, action) => {
            state.innings[1].target = action.payload;
        },
        resetGame: (state) => {
            const matchStarted = state.matchStarted;
            const isGullyCricketMode = state.isGullyCricketMode;
            const currentInnings = state.currentInnings;
            const teamDetails = state.teamDetails;
            const totalOvers = state.totalOvers;
            return {
                ...initialState,
                matchStarted,
                isGullyCricketMode,
                currentInnings,
                teamDetails,
                totalOvers
            };
        },
        setDeliveryMapInEachOver: (state, action) => {
            console.log('Adding delivery to innings:', state.currentInnings);
            console.log('Before:', JSON.stringify(state.innings[state.currentInnings].delivaryMapInEachOver));
            state.innings[state.currentInnings].delivaryMapInEachOver.push(action.payload);
            console.log('After:', JSON.stringify(state.innings[state.currentInnings].delivaryMapInEachOver));
            state.isOverCompleted = false;
        },
        toggleScoreCard: (state) => {
            state.toggleScoreCardFlag = !state.toggleScoreCardFlag;
        },
    }
});

export const {
    startMatch,
    startSecondInnings,
    addBall,
    incrementRuns,
    addExtras,
    addWicket,
    switchInnings,
    setTarget,
    resetGame,
    setDeliveryMapInEachOver,
    toggleScoreCard
} = ScoreCardSlice.actions;

export default ScoreCardSlice.reducer;