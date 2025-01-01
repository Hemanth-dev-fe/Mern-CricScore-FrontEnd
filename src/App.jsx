import { createContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "./reducers/ThemeSlice";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Theme from "./Theme_Components/Theme";
import "./App.css";
import HomePage from "./cricketGame-HomePage/HomePage-cricket";
import AuthPage from "./Form_Component/form";
import Tile from "./Tile_Component/tile";
import Quiz from "./quizGame_Component/quizGame";
import TextAnimation from "./TicTocToe_component/TextAnimation";

export let context = createContext();

function App() {
    const darkMode = useSelector((state) => state.Theme.DarkMode);
    const dispatch = useDispatch();
    const handleTheme = () => {
        dispatch(toggleTheme());
    };
    const winner = useSelector((state) => state.game.winner);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <>
            <context.Provider value={winner}>
                <div className={darkMode ? "App dark" : "App light"}>
                    <Theme click={handleTheme} />
                    <Router>
                        <Routes>
                            <Route path="/" element={<AuthPage setAuth={setIsAuthenticated} />} />
                            <Route path="/tile" element={isAuthenticated ? <Tile /> : <Navigate to="/" />} />
                            <Route path="/quiz" element={isAuthenticated ? <Quiz /> : <Navigate to="/" />} />
                            <Route path="/memory" element={isAuthenticated ? <TextAnimation /> : <Navigate to="/" />} />
                            <Route path="/cricket" element={isAuthenticated ? <HomePage /> : <Navigate to="/" />} />
                        </Routes>
                    </Router>
                </div>
            </context.Provider>
        </>
    );
}

export default App;