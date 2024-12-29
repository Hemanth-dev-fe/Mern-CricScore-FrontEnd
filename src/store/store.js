import { configureStore } from "@reduxjs/toolkit";
import ThemeReducer from "../reducers/ThemeSlice";
import gameReducer from "../reducers/TicTocToereducer";
import TextSlice from "../reducers/textanimation_tictoctoe_reducer"
import MemoryReducer from "../reducers/memoryGameReducer"
import quizCardSlice from "../reducers/quizGameReducer"
import ScoreCardSlice from "../reducers/ScoreCardSlice_cricket"
const store=configureStore(
    {
        reducer:{
            Theme:ThemeReducer,
            game:gameReducer,
            TextAnimation:TextSlice,
            memory:MemoryReducer,
            quiz:quizCardSlice,
            cricScore:ScoreCardSlice
        }
    }
);
export default store