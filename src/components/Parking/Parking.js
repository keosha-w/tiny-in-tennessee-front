import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useLocation, useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { deleteParking, getSingleParking } from "../Repos/ParkingManager"


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
                    <h2>{currentParking?.title}</h2>
                    <p>{currentParking.address}</p>
                    <p>{currentParking?.location_category?.name}</p>
                    <p>{currentParking?.contact_info}</p>
                    <p>Monthly Price: ${currentParking.monthlyPrice}</p>
                    <p>Electrical hookups: {currentParking.electrical == true ? "✅" : "❌"}</p>
                    <p>Water hookups: {currentParking.water == true ? "✅" : "❌"}</p>
                    <p>Septic hookups: {currentParking.septic == true ? "✅" : "❌"}</p>

                    { localStorage.user_id == parking?.user.id ?
                        <>
                            <div className="button__div"><button onClick={() => {history.push(`/parking/${parkingId}/edit`)}} className="button">Edit</button></div>
                        <div className="button__div"><button onClick={() => {
                        if (window.confirm('Are you sure you want to delete this post?') == true)
                        deleteParking(parkingId).then(history.push('/parking'))
                        }} className="button">Delete</button></div>
                        </>
                : ""
            }
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