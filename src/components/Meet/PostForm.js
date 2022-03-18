import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { createPost, getPosts } from "../Repos/PostManager"
import { getTags } from "../Repos/TagManager."
import MultiSelect from 'react-multiple-select-dropdown-lite'
import 'react-multiple-select-dropdown-lite/dist/index.css'


export const PostForm = () => {
    const history = useHistory()
    const [posts, setPosts] = useState([])
    const [tags, setTags] = useState([])
    const [selectedTags, setSelectedTags] = useState([])
    const [Options, setOptions] = useState([])
    const [value, setValue] = useState([])
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

    useEffect(() => {
        tagToOptions(tags)
    }, [tags])

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

    const tagToOptions = (tags) => {
        let options = []
        for (const tag of tags) {
            let object = { label:  `${tag.tag}`, value:  `${tag.id}`  }
            options.push(object)
        }
        console.log(options)
        setOptions(options)
    }

    const valueToTags = (value) => {
        const array = value.split(',')
        const parsedArray = array.map(a => parseInt(a))
        setSelectedTags(parsedArray)
    }

   

    const changePostState = (domEvent) => {
        domEvent.preventDefault()
        const copy = {...currentPost}
        let key = domEvent.target.name
        copy[key] = domEvent.target.value
        setCurrentPost(copy)
    }

    const changeTagState = (domEvent) => {
        valueToTags(domEvent)
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
            <div className="app">
                    <div className="preview-values">
                        <h4>Select tags</h4>
                        
                    </div>

                    <MultiSelect
                        onChange={changeTagState}
                        options={Options}
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
                        tags: selectedTags,
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