import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { getPosts } from "../Repos/PostManager"
import { Link } from "react-router-dom"
import "./post.css"

export const PostList = () => {
    const [ posts, setPosts ] = useState([])
    const history = useHistory()

    useEffect(() => {
        getPosts().then(data => setPosts(data))
    },[])

    return (
        <>
            {
                posts.map((post) => {
                    return (
                        <>
                            <div className="post__content">
                                    {/* <img src={require('post?.content')}></img> */}
                                    <p>{post.user.username}</p>
                                    <button onClick={() => {history.push(`/post/${post.id}/edit`)}}>Edit</button>
                                    <Link className="website__link" to={`/post/${post.id}`} post={post}>{post.title}</Link>
                            </div>
                        </>
                    )
                })
            }
            <div className="button__div"><button onClick={() => {history.push('/posts/new')}} className="button">Add</button></div>
        </>
    )
}