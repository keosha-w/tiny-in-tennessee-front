import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { getPosts } from "./PostManager"
import { Link } from "react-router-dom"

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
                                    <img src={post?.content}></img>
                                    <p>{post.user.username}</p>
                                    <button>Like</button>
                                    <p>{post.title}</p>
                            </div>
                        </>
                    )
                })
            }
            <div className="button__div"><button className="button">Add</button></div>
        </>
    )
}