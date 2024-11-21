import "./Theme.css"
import PropTypes from "prop-types"
function Theme({click})
{
    return(
        <>
        <div className="Themespace">
            <label>
                <input type="checkbox"
                onChange={click}
                >
                </input>
                <span className="splider"></span>
            </label>

        </div>
        </>
    )
}
Theme.propTypes={
    click:PropTypes.func.isRequired
}
export default Theme