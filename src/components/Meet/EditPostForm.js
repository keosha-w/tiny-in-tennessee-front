import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useHistory } from 'react-router-dom'
import { createPost, getPosts, getSinglePost, updatePost } from "../Repos/PostManager"
import { getTags } from "../Repos/TagManager."
import MultiSelect from 'react-multiple-select-dropdown-lite'
import 'react-multiple-select-dropdown-lite/dist/index.css'


export const EditPostForm = () => {
    const history = useHistory()
    const { postId } = useParams()
    const [tags, setTags] = useState([])
    const [defaultTags, setDefaultTags] = useState([])
    const [selectedTags, setSelectedTags] = useState([])
    const [Options, setOptions] = useState([])
    const [value, setValue] = useState([])
    const [currentPost, setCurrentPost] = useState({
        title: "",
        content: "",
        date_posted: "",
        is_approved: false,
        user: localStorage.getItem("tit_token")

    })

    useEffect(() => {
        getSinglePost(postId).then(data => {
            tagsOnState(data.tags)
            setCurrentPost({
            title: data.title,
            content: data.content,
            date_posted: data.date_posted,
            is_approved: data.is_approved,
            tags: data.tags

        })})
    }, [postId])


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
    
        setOptions(options)

    }
    const tagsOnState = (postTags) => {
        let options = []
        for (const tag of postTags) {
            let object = { label:  `${tag.tag}`, value:  `${tag.id}`  }
            options.push(object)
        }
    
        setDefaultTags(options)

    }


    
    const valueToTags = (value) => {
        console.log(value)
        let parsedArray = [...selectedTags]
        const array = value.split(',')
        for (const a of array) {
            const foundTag = tags.find(tag => {
            return    a == tag.id
            })
            let fullTagObj = { label:  `${foundTag.tag}`, value:  `${foundTag.id}`  }
            parsedArray.push(fullTagObj)
        }
        console.log(parsedArray)
        setSelectedTags([...new Set(parsedArray)]) // Set strips out duplicates and Array.from turns the set back into an array
    }



    const changePostState = (domEvent) => {
        domEvent.preventDefault()
        const copy = { ...currentPost }
        let key = domEvent.target.name
        copy[key] = domEvent.target.value
        setCurrentPost(copy)
    }

    const changeTagState = (domEvent) => {
        // const copy = { ...currentPost }
        // copy.tags.push(domEvent.target.value)
        // setCurrentPost(copy)
        valueToTags(domEvent)
        
    }

    return (
        <form className="postForm">
            <h2 className="postForm__title">Edit your post</h2>
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
                          {}
                    </div>

                    <MultiSelect
                        onChange={changeTagState}
                        options={Options}
                        defaultValue={defaultTags}
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
                        tags: selectedTags.map(t => t.value)
                    }

                    // Send POST request to your API
                    updatePost(post, postId)
                        .then(() => history.push("/posts"))
                }}
                className="button">Submit</button>
        </form>
    )
}