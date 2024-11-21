import Theme from "./Theme_Components/Theme"
import "./App.css"
import { useDispatch, useSelector } from "react-redux"
import {toggleTheme} from "./reducers/ThemeSlice"
// import Game from "./TicTocToe_component/game";
import TextAnimation from "./TicTocToe_component/TextAnimation"
function App()
{
    const darkMode=useSelector((state)=>state.Theme.DarkMode)
     const dispatch=useDispatch()
    const handleTheme=()=>{
       dispatch(toggleTheme())
    }
    return(
        <>
        <div className={darkMode?"App light":"App dark"}>
        <Theme click={handleTheme} />
        {/* <div className="center-content"> <Game /> </div> */}
        <TextAnimation/>
        </div>
        </>
    )
}
export default App