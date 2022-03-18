import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

import { Link } from "react-router-dom"
import { getPosts, updatePost } from "../Repos/PostManager"
import { getLocations } from "../Repos/ParkingManager"
import { getBuilders, updateBuilder } from "../Repos/BuilderManager"



export const AdminView = () => {


    const [builders, setBuilders] = useState([])
    const [posts, setPosts] = useState([])
    const [locations, setLocations] = useState([])
    const [tags, setTags] = useState([])
    const history = useHistory()

    useEffect(() => {
        getBuilders().then(data => setBuilders(data))
    }, [])

    useEffect(() => {
        getLocations().then(data => setLocations(data))
    }, [])

    useEffect(() => {
        getPosts().then(data => setPosts(data))
    }, [])



   

    return (


        <>


            <div className="builder__content">
                <table>
                    <tr>
                        <th>Title</th>
                        <th>Website</th>
                        <th>Contact Info</th>
                    </tr>
                    <tr>
                        {
                            builders.map((builder) => {
                                return (
                                    <>
                                        <td><Link className="builder__link" to={`/builder/${builder.id}`} builder={builder}>{builder.title}</Link></td>
                                        <td><a className="website__link" href={builder.website}>{builder.website}</a></td>
                                        <td>{builder.contact_info}</td>
                                        <button onClick={evt => {
                                            // Prevent form from being submitted
                                            evt.preventDefault()

                                            const builder = {
                                                is_approved: true

                                            }

                                            // Send POST request to your API
                                            updateBuilder(builder, builder.id)

                                        }}>Approve</button>
                                    </>
                                )
                            })
                        }
                    </tr>
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

                                    const post = {
                                        is_approved: true
                                    }
                                    // Send POST request to your API
                                    updatePost(post, post.id)
                                }} >Approve</button>

                            

                            </div>
                        </>
                    )
                })
            }


        </>
    )
}