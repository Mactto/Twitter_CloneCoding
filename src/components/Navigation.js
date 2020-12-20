import React from "react";
import {Link} from "react-router-dom"

const Navigation = () => {
    return (
    <div>
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/profile">Profile</Link>
                </li>
            </ul>
        </nav>
    </div>
    )
}
export default Navigation;