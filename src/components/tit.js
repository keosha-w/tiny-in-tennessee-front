import React, { useReducer } from "react"
import { Route, Redirect } from "react-router-dom"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./Nav/NavBar"


export const TinyInTennessee = () => (
    
    <>

            <Route render={() => {
                if (localStorage.getItem("tit_token")) {
                    return <>
                        <Route>
                            <NavBar />
                            <ApplicationViews />
                        </Route>
                    </>
                } else {
                    return <Redirect to="/login" />
                }
            }} />
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/register">
                <Register />
            </Route>


    </>
)
