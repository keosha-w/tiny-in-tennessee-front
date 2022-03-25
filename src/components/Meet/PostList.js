import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { deletePost, getApprovedPosts, getPosts } from "../Repos/PostManager"
import { Link } from "react-router-dom"
import "./post.css"

export const PostList = () => {
    const [posts, setPosts] = useState([])
    const history = useHistory()

    useEffect(() => {
        sync()
    }, [])

    const sync = () => {
        getApprovedPosts().then(data => setPosts(data))
    }

    return (
        <>
            {
                posts.map((post) => {
                    return (
                        <>
                            <div className="post__content">
                                <div className="post__centerdiv">
                                    <div className="image__div"><img className="post__img" src={post?.content}/></div>
                                    <p>{post.user.user.username}</p>
                                    <Link className="website__link" to={`/post/${post.id}`} post={post}>{post.title}</Link>
                                    <p>{}</p>
                                    <div className="button__div">
                                    {  localStorage.user_id == post.user.id ?
                                        <>
                                            <button onClick={() => { history.push(`/post/${post.id}/edit`) }} className="button">Edit</button>
                                                                            <button onClick={() => {
                                            if (window.confirm('Are you sure you want to delete this post?') == true)
                                                deletePost(post.id).then(sync)
                                                                            }} className="button">Delete</button>
                                        </>
                                                                
                                                                : ""
                                                                
                                                                }</div>
                                </div>
                            </div>
                        </>
                    )
                })
            }
            <div className="button__div"><button onClick={() => { history.push('/posts/new') }} className="button">Add</button></div>
        </>
    )
}