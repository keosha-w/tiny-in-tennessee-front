import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useLocation, useParams, useHistory } from "react-router-dom"
import { getSingleBuilder } from "../Repos/BuilderManager"



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
                <div class="builder">
                    <p>{currentBuilder?.title}</p>
                    <a className="website__link" href={currentBuilder?.website}>{currentBuilder?.website}</a>
                    <p>{currentBuilder?.contact_info}</p>
                    <div className="button__div"><button onClick={() => {history.push('/builders/edit')}} className="button">Edit</button></div>
                    
                </div>
                :
                <div class="builder">
                    
                        <Link to={`/builders/${builder?.id}`} >
                            <h2>{builder?.title}</h2>
                        </Link>
                    
                    
                </div>

            }
        </>
    )

}