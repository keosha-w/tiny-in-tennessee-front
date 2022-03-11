import React from "react"
import { Route } from "react-router-dom"
import { BuilderList } from "./Builder/BuilderList.js"
import { ParkingList } from "./Parking.js/ParkingList.js"


export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <Route exact path="/builders">
                <BuilderList />
            </Route>
            <Route exact path="/parking">
                <ParkingList />
            </Route>
            
            
        </main>
    </>
}