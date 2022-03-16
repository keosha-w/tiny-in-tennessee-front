import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useHistory } from 'react-router-dom'
import { createPost, getPosts, getSinglePost } from "../Repos/PostManager"



export const EditPostForm = () => {
    const history = useHistory()
    const [posts, setPosts] = useState([])
    const { postId } = useParams()
    const [currentPost, setCurrentPost] = useState({
        title: "",
        content: "",
        date_posted: "",
        is_approved: false,
        user: localStorage.getItem("tit_token")
        
    })

    useEffect(() => {
        getSinglePost(postId).then(data => setCurrentPost({
            title: data.title,
            content: data.address,
            date_posted: data.county?.id,
            is_approved: data.monthlyPrice,
           
        }))
    }, [postId])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
        const postDate = new Date()
        const createdYear = postDate.getFullYear()
        const createdMonth = postDate.getMonth() + 1
        const createdDay = postDate.getDate()
        const twoDigit = (dateString) => {
        if (dateString.length < 2) {
            return `0${dateString}`
        } else {
            return dateString
        }
    }


    useEffect(() => {
        getSinglePost().then(data => setCurrentPost(data))
    }, [postId])

   

    const changePostState = (domEvent) => {
        domEvent.preventDefault()
        const copy = {...currentPost}
        let key = domEvent.target.name
        copy[key] = domEvent.target.value
        setCurrentPost(copy)
    }

    return (
        <form className="postForm">
            <h2 className="postForm__title">Register New Post</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentPost.title}
                        onChange={changePostState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="content">Content: </label>
                    <input type="text" name="content" required autoFocus className="form-control"
                        value={currentPost.content}
                        onChange={changePostState}
                    />
                </div>
            </fieldset>
        


            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const post = {
                        title: currentPost.title,
                        content: currentPost.content,
                        date_posted: `${createdYear}-${twoDigit(createdMonth)}-${twoDigit(createdDay)}`
                    }

                    // Send POST request to your API
                    createPost(post)
                        .then(() => history.push("/posts"))
                }}
                className="button">Submit</button>
        </form>
    )
}