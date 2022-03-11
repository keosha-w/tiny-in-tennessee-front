import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"


export const NavBar = () => {
    const history = useHistory()
    return (
        <ul className="navbar">
            <li className="navbar__item">
            <Link className="nav-link" to="/builders">Builders</Link>
            </li>
            
            <li className="navbar__item">
                Communities
            </li>
            <li className="navbar__item">
                Laws
            </li>
            <li className="navbar__item">
                Parking
            </li>
            <li className="navbar__item">
                Meet
            </li>
            <div>
                <li className="navbar__item">
                    Profile
                </li>
                <li className="navbar__item">
                    Settings
                </li>
            </div>
            {
                (localStorage.getItem("tit_token") !== null) ?
                    <li className="nav-item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("tit_token")
                                history.push({ pathname: "/" })
                            }}
                        >Logout</button>
                    </li> :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
            }        </ul>
    )
}
