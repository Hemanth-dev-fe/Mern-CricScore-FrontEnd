import { useCallback, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { context } from "../App";

function WinnerMessage() {
    const darkMode = useSelector((state) => state.Theme.DarkMode);
    const [bgcolor, setBGColor] = useState(darkMode || "white");

    const handleBackgroundColor = useCallback(() => {
        const backgroundColors = ["red", "yellow", "blue", "pink", "lightgreen", "orange"];
        const randColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
        setBGColor(randColor);
    }, []);

    useEffect(() => {
        const intervalId = setInterval(handleBackgroundColor, 1000);
        
        return () => clearInterval(intervalId);
    }, [handleBackgroundColor]);

   
    const winner = useContext(context);

    return (
        <>
            <h1 style={{ textAlign: "center", fontSize: "60px",color:bgcolor }}>
                Congratulations: {winner}
            </h1>
        </>
    );
}

export default WinnerMessage;
