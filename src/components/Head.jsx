import { Link } from "react-router-dom"
import '../styles/Head.css'
function Head() {
    return (
        <div className="Head">
            <div className="Info">
                <p style={{marginRight : "15px"}}><i className="fa-sharp fa-solid fa-envelope"></i> test@gmail.com</p>
                <p><i className="fa-solid fa-phone"></i> 05454587878</p>
            </div>
            <div className="Liste">
                <Link to={'/watchListe'} className="WatchListe"><i className="fa-regular fa-heart"></i> WatcheListe</Link>
                <Link to={'/ShoppingCard'} className="ShoppingCard"><i className="fa-regular fa-heart"></i> ShoppingCard</Link>
            </div>
        </div>

    )
}


export default Head