import DisplayButtonAndInput from "../cricketGame-Components/actions-creating buttons and display input"
import MainScoreBoardDisplay from "../cricketGame-Components/MainScoreBoardDisplay"
import MatchDetails from "../cricketGame-Components/matchDetails"
import ScoreBoard from "../cricketGame-Components/ScoreBoardDiag"
import StartMatchConfiguration from "../cricketGame-Components/startMatchConfiguration"

function HomePage()
{
    return(
        <>
        
        <div className="cricscore">
            <h4>Cric Score</h4>
            <StartMatchConfiguration/>
            <MatchDetails/>
            <MainScoreBoardDisplay/>
            <DisplayButtonAndInput/>
            <ScoreBoard/>
        </div>
        
     
       
        </>
    )
}
export default HomePage