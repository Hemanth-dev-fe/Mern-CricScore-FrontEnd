import React, { createContext, useState, useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "./reducers/ThemeSlice";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
const Theme=React.lazy(()=>import("./Theme_Components/Theme"))
// import Theme from "./Theme_Components/Theme";
import "./App.css";

const HomePage=React.lazy(()=>import("./cricketGame-HomePage/HomePage-cricket"))
// import HomePage from "./cricketGame-HomePage/HomePage-cricket";
const AuthPage=React.lazy(()=>import("./Form_Component/form"))
const Tile=React.lazy(()=>import("./Tile_Component/tile"))
const Quiz=React.lazy(()=>import("./quizGame_Component/quizGame"))
const TextAnimation=React.lazy(()=>import("./TicTocToe_component/TextAnimation"))
// const AdminTable=React.lazy(()=>import("./Form_Component/admin-table"))
const QuizTable=React.lazy(()=>import("./Form_Component/admin-table"))
// import AuthPage from "./Form_Component/form";
// import Tile from "./Tile_Component/tile";
// import Quiz from "./quizGame_Component/quizGame";
// import TextAnimation from "./TicTocToe_component/TextAnimation";
// import AdminTable from "./Form_Component/admin-table";
// import QuizTable from "./Form_Component/admin-table";

export let context = createContext();

function App() {
    const darkMode = useSelector((state) => state.Theme.DarkMode);
    const dispatch = useDispatch();
    const handleTheme = () => {
        dispatch(toggleTheme());
    };
    const winner = useSelector((state) => state.game.winner);
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem("isAuthenticated") === "true";
    });

    useEffect(() => {
        localStorage.setItem("isAuthenticated", isAuthenticated);
    }, [isAuthenticated]);

    return (
        <>
            <context.Provider value={winner}>
                <div className={darkMode ? "App dark" : "App light"}>
                    <Theme click={handleTheme} />
                    <Router>
                        <Suspense fallback={<div>Loading...</div>} >
                        <Routes>
                            <Route path="/" element={<AuthPage setAuth={setIsAuthenticated} />} />
                            <Route path="/tile" element={isAuthenticated ? <Tile /> : <Navigate to="/" />} />
                            <Route path="/quiz" element={isAuthenticated ? <Quiz /> : <Navigate to="/" />} />
                            <Route path="/memory" element={isAuthenticated ? <TextAnimation /> : <Navigate to="/" />} />
                            <Route path="/cricket" element={isAuthenticated ? <HomePage /> : <Navigate to="/" />} />
                            <Route path="/Admin" element={<QuizTable /> } />
                        </Routes>
                        </Suspense>
                    </Router>
                </div>
            </context.Provider>
        </>
    );
}

export default App;