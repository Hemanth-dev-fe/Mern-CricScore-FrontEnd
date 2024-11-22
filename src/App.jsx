import Theme from "./Theme_Components/Theme"
import "./App.css"
import { useDispatch, useSelector } from "react-redux"
import {toggleTheme} from "./reducers/ThemeSlice"
// import MemoryGame from "./memoryGame_Component/memoryGame"
// import Game from "./TicTocToe_component/game";
import TextAnimation from "./TicTocToe_component/TextAnimation"
import { createContext } from "react"
// eslint-disable-next-line react-refresh/only-export-components
export let context =createContext()
function App()
{
    const darkMode=useSelector((state)=>state.Theme.DarkMode)
     const dispatch=useDispatch()
    const handleTheme=()=>{
       dispatch(toggleTheme())
    }
    const winner = useSelector((state) => state.game.winner);
    return(
        <>
       <context.Provider value={winner}>
       <div className={darkMode?"App light":"App dark"}>
        <Theme click={handleTheme} />
        {/* <div className="center-content"> <Game /> </div> */}
        <TextAnimation/>
        {/* <MemoryGame/> */}
        </div>
       </context.Provider>
        </>
    )
}
export default App