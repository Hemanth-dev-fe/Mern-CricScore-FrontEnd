import PropTypes from "prop-types"
import "./board.css"
function Board({squares,clicked})
{
const renderSquare=(i)=>{
    return <button key={i} className="square" onClick={()=>clicked(i)}>
    {squares[i]}
</button>
}
const renderBoard=()=>{
    const board=[];
    for (let row=0;row<3;row++)
    {
        const rowsquare=[]
        for(let col=0;col<3;col++)
        {
            rowsquare.push(renderSquare(row*3+col))
        }
        board.push(
            <div key={row} className="board-row">
                {rowsquare}
            </div>
        )
    }
    return board
}

    return(
        <>
             <div className="board-main">
                {renderBoard()}
             </div>
        </>
    )
}

Board.propTypes=
{
    squares:PropTypes.arrayOf(PropTypes.string).isRequired,
    clicked:PropTypes.func.isRequired
}
export default Board