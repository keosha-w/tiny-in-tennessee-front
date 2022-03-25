import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"




export const NavBar = () => {
    const history = useHistory()
   
    return (
        <ul className="navbar"><img src={require("/Users/keosha.watkins/workspace/backendCapstone/tiny-in-tennessee-front/src/components/Nav/TITlogo.png")}/>
            <li className="navbar__item active">
            <Link className="nav-link " to="/builders" >Builders</Link>
            </li>
            
            <li className="navbar__item">
            <Link className="nav-link" to="/parking">Parking</Link>
            </li>
            <li className="navbar__item">
            <Link className="nav-link" to="/laws">Laws</Link>
            </li>
            <li className="navbar__item">
            <Link className="nav-link" to="/posts">Posts</Link>
            </li>
            <div>
                { localStorage.is_admin == "true" ? < li className="navbar__item"> <Link className="nav-link__admin" to="/admin">Admin
                </Link> </li>
                    
                : ""
                }
                
            </div>
            {
                (localStorage.getItem("tit_token") !== null) ?
                    <li className="navbar__item">
                        <Link className=""
                            onClick={() => {
                                localStorage.removeItem("tit_token")
                                history.push({ pathname: "/" })
                            }}
                        >Logout</Link></li> :
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
