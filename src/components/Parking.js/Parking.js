import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useLocation, useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { getSingleParking } from "../Repos/ParkingManager"



export default ({ parking, sync }) => {

    const [details, setDetails] = useState(false)
    const [currentParking, setCurrentParking] = useState({})
    const { parkingId } = useParams()
    const location = useLocation()
    const history = useHistory()

    useEffect(
        () => {
            getSingleParking(parkingId).then((parkingDetails) => {
                    setCurrentParking(parkingDetails)
                })
        }, []
    )

    useEffect(() => {
        if (parkingId) {
            setDetails(true)
        }
    }, [])

    return (
        <>
            {details
                ?
                <div class="parking">
                    <p>{currentParking?.title}</p>
                    <a className="website__link" href={currentParking?.website}>{currentParking?.website}</a>
                    <p>{currentParking?.contact_info}</p>
                    <div className="button__div"><button onClick={() => {history.push(`/parking/${parkingId}/edit`)}} className="button">Edit</button></div>
                    
                </div>
                :
                <div class="parking">
                    
                        <Link to={`/parkings/${parking?.id}`} >
                            <h2>{parking?.title}</h2>
                        </Link>
                    
                    
                </div>

            }
        </>
    )

}