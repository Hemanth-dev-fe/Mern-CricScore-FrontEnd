import { configureStore } from "@reduxjs/toolkit";
import ThemeReducer from "../reducers/ThemeSlice";
import gameReducer from "../reducers/TicTocToereducer";
import TextSlice from "../reducers/textanimation_tictoctoe_reducer"
import MemoryReducer from "../reducers/memoryGameReducer"
import quizCardSlice from "../reducers/quizGameReducer"
import cricScoreSlice from "../reducers/cricScoreReducers"
import UserAuthSlice from "../reducers/userAuthloginandlogoutcredentials"
const store=configureStore(
    {
        reducer:{
            userAuth:UserAuthSlice,
            Theme:ThemeReducer,
            game:gameReducer,
            TextAnimation:TextSlice,
            memory:MemoryReducer,
            quiz:quizCardSlice,
            cricScore:cricScoreSlice
        }
    }
);
export default store