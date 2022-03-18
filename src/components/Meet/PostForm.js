import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { createPost, getPosts } from "../Repos/PostManager"
import { getTags } from "../Repos/TagManager."



export const PostForm = () => {
    const history = useHistory()
    const [posts, setPosts] = useState([])
    const [tags, setTags] = useState([])
    const [currentPost, setCurrentPost] = useState({
        title: "",
        content: "",
        date_posted: "",
        is_approved: false,
        tags: [],
        user: localStorage.getItem("tit_token")
        
    })
    
    useEffect(() => {
        getPosts().then(data => setPosts(data))
    }, [])

    useEffect(() => {
        getTags().then(data => setTags(data))
    }, [])

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



   

    const changePostState = (domEvent) => {
        domEvent.preventDefault()
        const copy = {...currentPost}
        let key = domEvent.target.name
        copy[key] = domEvent.target.value
        setCurrentPost(copy)
    }

    const changeTagState = (domEvent) => {
        const copy = {...currentPost}
        copy.tags.push(domEvent.target.value)
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
            <fieldset>
            <div className="form-group">
                                    <label htmlFor="tags">Category: </label>
                                    <select name="tags" required className="form-control"
                                        value={currentPost.tags}
                                        onChange={changeTagState}>
                                        <option value="0">Select tags</option>
                                        {
                                            tags.map(t => (
                                                <option key={t.id} value={t.id}>{t.tag}</option>
                                            ))
                                        }
                                    </select>
                                </div>
            </fieldset>
        


            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const post = {
                        title: currentPost.title,
                        content: currentPost.content,
                        tags: currentPost.tags,
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