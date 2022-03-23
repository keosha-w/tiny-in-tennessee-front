import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { deletePost, getPosts } from "../Repos/PostManager"
import { Link } from "react-router-dom"
import "./post.css"

export const PostList = () => {
    const [posts, setPosts] = useState([])
    const history = useHistory()

    useEffect(() => {
        sync()
    }, [])

    const sync = () => {
        getPosts().then(data => setPosts(data))
    }

    return (
        <>
            {
                posts.map((post) => {
                    return (
                        <>
                            <div className="post__content">
                                <img src={post?.content}/>
                                <p>{post.user.username}</p>
                                <div className="button__div">
                                <button onClick={() => { history.push(`/post/${post.id}/edit`) }} className="button">Edit</button>
                                <button onClick={() => {
                                    if (window.confirm('Are you sure you want to delete this post?') == true)
                                        deletePost(post.id).then(sync)
                                }} className="button">Delete</button></div>
                                <Link className="website__link" to={`/post/${post.id}`} post={post}>{post.title}</Link>
                            </div>
                        </>
                    )
                })
            }
            <div className="button__div"><button onClick={() => { history.push('/posts/new') }} className="button">Add</button></div>
        </>
    )
}