import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useLocation, useParams, useHistory } from "react-router-dom"
import { getSingleBuilder } from "../Repos/BuilderManager"
import "./post.css"


export default ({ builder, sync }) => {

    const [details, setDetails] = useState(false)
    const [currentBuilder, setCurrentBuilder] = useState({})
    const { builderId } = useParams()
    const location = useLocation()
    const history = useHistory()

    useEffect(
        () => {
            getSingleBuilder(builderId).then((builderDetails) => {
                    setCurrentBuilder(builderDetails)
                })
        }, []
    )

    useEffect(() => {
        if (builderId) {
            setDetails(true)
        }
    }, [])

    return (
        <>
            {details
                ?
                ""
                :
                <div class="builder">
                    
                        <Link to={`/posts/${post?.id}`} >
                            <h2>{post?.title}</h2>
                        </Link>
                    
                    
                </div>

            }
        </>
    )

}