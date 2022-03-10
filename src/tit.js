import React, { useState } from "react"
import { Route, Redirect, useHistory } from "react-router-dom"


import { Login } from "./components/auth/Login" 
import { Register } from "./components/auth/Register"
import { ApplicationViews } from "./components/ApplicationViews"
import { NavBar } from "./components/Nav/Navbar"

export const TinyInTennessee = () => {
    const [token, setTokenState] = useState(localStorage.getItem('token'))
  
    const setToken = (newToken) => {
      localStorage.setItem('token', newToken)
      setTokenState(newToken)
    }
  
    return <>
      {
        token
          ?
          <>
            <Route>
              <NavBar token={token} setToken={setToken} />
              <ApplicationViews />
            </Route>
            <Route exact path="/tags">
              {/* <TagList/> */}
            </Route>
          </>
          :
          <useHistory to="/login" />
      }
  
      
      <Route exact path="/login" >
        <NavBar token={token} setToken={setToken} />
        <Login token={token} setToken={setToken} />
      </Route>
      
      {/* <Route exact path="/PostList">
        <PostList />
      </Route>
      <Route exact path="/posts/:postId(\d+)">
        <Post />
      </Route>
      <Route exact path="/createPost">
        <CreatePostsForm />
        </Route>
      <Route exact path="/editPost/:postId(\d+)">
        <EditPostForm />
        </Route>
      <Route exact path="/Users">
        <UserList />
      </Route>
      <Route exact path="/Users/:userId(\d+)">
        <UserDetails />
      </Route>
      <Route exact path="/my-posts">
        <MyPosts />
      </Route> */}
      
      <Route path="/register" exact>
        <NavBar token={token} setToken={setToken} />
        <Register token={token} setToken={setToken} />
      </Route>
  
      <Route path="/categories" exact>
        {/* <CategoryList /> */}
      </Route>
  
    </>
  }
  