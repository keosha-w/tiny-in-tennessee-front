import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { Link } from "react-router-dom"
import { approvePost, getNotApprovedPosts, getPosts, updatePost } from "../Repos/PostManager"
import { getLocations } from "../Repos/ParkingManager"
import { getAdminBuilders, getBuilders, updateBuilder } from "../Repos/BuilderManager"
import "./admin.css"



export const AdminView = () => {


    const [builders, setBuilders] = useState([])
    const [posts, setPosts] = useState([])
    const [locations, setLocations] = useState([])
    const [tags, setTags] = useState([])
    const history = useHistory()

    useEffect(() => {
        getAdminBuilders().then(data => setBuilders(data))
    }, [])

    useEffect(() => {
        getLocations().then(data => setLocations(data))
    }, [])

    useEffect(() => {
        sync()
    }, [])


const sync = () => {
    return getNotApprovedPosts().then(data => setPosts(data))
}
   

    return (


        <>

            <div>
                <h2>Pending Approvals</h2>
            </div>
            <div className="builder__content">
                <table>
                    <tr>
                        <th>Title</th>
                        <th>Website</th>
                        <th>Contact Info</th>
                        <th></th>
                    </tr>
                    
                        {
                            builders.map((builder) => {
                                return (
                                    <tr>
                                        <td><Link className="builder__link" to={`/builder/${builder.id}`} builder={builder}>{builder.title}</Link></td>
                                        <td><a className="website__link" href={builder.website}>{builder.website}</a></td>
                                        <td>{builder.contact_info}</td>
                                        <td>
                                            <div className="button__div">
                                                <button onClick={evt => {
                                                    // Prevent form from being submitted
                                                    evt.preventDefault()
                                                    const builder = {
                                                        is_approved: true
                                                    }
                                                    // Send POST request to your API
                                                    updateBuilder(builder, builder.id)
                                                }}>Approve</button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    
                </table>
            </div>
            <div className="parking__content">
                <table>
                    <th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>County</th>
                        <th>Type</th>
                    </th>
                    {
                        locations.map((location) => {
                            return (
                                <>
                                    <tr>
                                        <td><Link className="website__link" to={`/parking/${location.id}`} builder={location}>{location.title}</Link></td>
                                        <td>{location.address}</td>
                                        <td>{location.county.name}</td>
                                        <td>{location.location_category.name}</td>
                                        <button>Approve</button>
                                    </tr>
                                </>
                            )
                        })
                    }
                </table>
            </div>
            {
                posts.map((post) => {
                    return (
                        <>
                            <div className="post__content">
                                {/* <img src={require('post?.content')}></img> */}
                                <p>{post.user.username}</p>

                                <Link className="website__link" to={`/post/${post.id}`} post={post}>{post.title}</Link>
                                <button onClick={evt => {
                                    // Prevent form from being submitted
                                    evt.preventDefault()

                                    const selectedPost = {
                                        is_approved: true
                                    }
                                    // Send POST request to your API
                                    approvePost(selectedPost, post.id).then(sync)
                                }} >Approve</button>

                            

                            </div>
                        </>
                    )
                })
            }


        </>
    )
}