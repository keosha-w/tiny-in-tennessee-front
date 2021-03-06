import React from "react"
import { Route } from "react-router-dom"
import { BuilderList } from "./Builder/BuilderList.js"
import { LawList } from "./Laws/LawList.js"
import { ParkingList } from "./Parking/ParkingList.js"
import { PostList } from "./Meet/PostList"
import { BuilderForm } from "./Builder/BuilderForm.js"
import Builder from "./Builder/Builder.js"
import Parking from "./Parking/Parking.js"
import { ParkingForm } from "./Parking/ParkingForm.js"
import { PostForm } from "./Meet/PostForm.js"
import { EditBuilderForm } from "./Builder/EditBuilderForm.js"
import { EditPostForm } from "./Meet/EditPostForm.js"
import { AdminView } from "./Admin/Admin.js"
import { EditParkingForm } from "./Parking/EditParkingForm.js"
import { Landing } from "./Landing/Landing.js"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <Route exact path="/">
                <Landing />
            </Route>
            <Route exact path="/builders">
                <BuilderList />
            </Route>
            <Route exact path="/builder/:builderId(\d+)">
                <Builder />
            </Route>
            <Route exact path="/builder/:builderId(\d+)/edit">
                <EditBuilderForm />
            </Route>
            <Route exact path="/builders/new">
                <BuilderForm />
            </Route>
            <Route exact path="/parking">
                <ParkingList />
            </Route>
            <Route exact path="/parking/new">
                <ParkingForm />
            </Route>
            <Route exact path="/parking/:parkingId(\d+)">
                <Parking />
            </Route>
            <Route exact path="/parking/:parkingId(\d+)/edit">
                <EditParkingForm />
            </Route>
            <Route exact path="/laws">
                <LawList />
            </Route>
            <Route exact path="/posts">
                <PostList />
            </Route>
            <Route exact path="/posts/new">
                <PostForm />
            </Route>
            <Route exact path="/post/:postId(\d+)/edit">
                <EditPostForm />
            </Route>
            <Route exact path="/admin">
                <AdminView />
            </Route>
            
            
        </main>
    </>
}