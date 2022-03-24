import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { getApprovedLocations, getLocations } from "../Repos/ParkingManager"
import "./parkingList.css"
import { Link } from "react-router-dom"


export const ParkingList = () => {
    const [ parkings, setParkings ] = useState([])
    const history = useHistory()

    useEffect(() => {
        getApprovedLocations().then(data => setParkings(data))
    },[])

    return (
        <>
                            <div className="parking__content">
                            <table>
                                        <tr>
                                            <th>Name</th>
                                            <th>Address</th>
                                            <th>County</th>
                                            <th>Type</th>
                                        </tr>
            {
                parkings.map((parking) => {
                    return (
                        <>
                                        <tr>
                                        <td><Link className="website__link" to={`/parking/${parking.id}`} builder={parking}>{parking.title}</Link></td>
                                            <td>{parking.address}</td>
                                            <td>{parking.county.name}</td>
                                            <td>{parking.location_category.name}</td>
                                        </tr>
                        </>
                    )
                })
            }
            </table>
            </div>
            <div onClick={() => {history.push('/parking/new')}} className="button__div"><button className="button">Add</button></div>
        </>
    )
}