import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { Link } from "react-router-dom"
import { approvePost, getNotApprovedPosts, getPosts, updatePost } from "../Repos/PostManager"
import { approveParking, getLocations, getNotApprovedLocations } from "../Repos/ParkingManager"
import { approveBuilder, getAdminBuilders, getBuilders, getNotApprovedBuilders, updateBuilder } from "../Repos/BuilderManager"
import "./admin.css"



export const AdminView = () => {


    const [builders, setBuilders] = useState([])
    const [posts, setPosts] = useState([])
    const [locations, setLocations] = useState([])
    const history = useHistory()

    useEffect(() => {
        syncBuilders()
    }, [])

    useEffect(() => {
        syncLocations()
    }, [])

    useEffect(() => {
        sync()
    }, [])


const sync = () => {
    return getNotApprovedPosts().then(data => setPosts(data))
}

const syncBuilders = () => {
    return getNotApprovedBuilders().then(data => setBuilders(data))
}
const syncLocations = () => {
    return getNotApprovedLocations().then(data => setLocations(data))
}
   

    return (


        <>

            <div>
                <h2>Pending Approvals</h2>
            </div>
            <div className="builder__content">
                <table>
                    <tr>
                        <th>Page</th>
                        <th>Link</th>
                        <th>User</th>
                        <th>Action</th>
                    </tr>
                    
                        {
                            builders.map((builder) => {
                                return (
                                    
                                    <tr>
                                        <th>Builders</th>
                                        <td><Link className="website__link" to={`/builder/${builder.id}`} builder={builder}>{builder.title}</Link></td>
                                        <td><p className="">{builder?.user?.user?.username}</p></td>
                                        <td>
                                            <div className="">
                                                <button onClick={evt => {
                                                    // Prevent form from being submitted
                                                    evt.preventDefault()
                                                    const builderObj = {
                                                        is_approved: true
                                                    }
                                                    // Send POST request to your API
                                                    approveBuilder(builderObj, builder.id).then(() => syncBuilders)
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
                    
                    {
                        locations.map((location) => {
                            return (
                                <>
                                    <tr>
                                    <th>Parking</th>
                                        <td><Link className="website__link" to={`/parking/${location.id}`} location={location}>{location.title}</Link></td>
                                        <td>{location.user.user.username}</td>
                                        <td><button onClick={evt => {
                                                    // Prevent form from being submitted
                                                    evt.preventDefault()
                                                    const locationObj = {
                                                        is_approved: true
                                                    }
                                                    // Send POST request to your API
                                                    approveParking(locationObj, location.id).then(() => syncLocations())
                                                }}>Approve</button></td>
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
                            <div className="post__div">
                                <table>
                                    <tr>
                                    <th>Posts</th>
                                        <td>
                                            <Link className="website__link" to={`/post/${post.id}`} post={post}>{post.title}</Link>
                                        </td>
                                        <td><p>{post.user.user.username}</p></td>
                                        <td>
                                            <button onClick={evt => {
                                                // Prevent form from being submitted
                                                evt.preventDefault()
                                                const selectedPost = {
                                                    is_approved: true
                                                }
                                                // Send POST request to your API
                                                approvePost(selectedPost, post.id).then(sync)
                                            }} >Approve</button>
                                        </td>
                                    </tr>
                                    <div className="button__div">
                                    </div>
                                </table>

                            

                            </div>
                        </>
                    )
                })
            }


        </>
    )
}