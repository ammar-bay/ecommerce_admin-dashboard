import { Link } from "react-router-dom"

const Unauthorized = () => {
    return (
        <article style={{ padding: "100px" }}>
            <h1>Unauthorized!</h1>
            <p>Please Login</p>
            <div className="flexGrow">
                <Link to="/login">Login page</Link>
            </div>
        </article>
    )
}

export default Unauthorized
