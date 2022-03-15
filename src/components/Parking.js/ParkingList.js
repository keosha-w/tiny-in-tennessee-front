import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { getLocations } from "../Repos/ParkingManager"
import "./parkingList.css"
import { Link } from "react-router-dom"


export const ParkingList = () => {
    const [ parkings, setParkings ] = useState([])
    const history = useHistory()

    useEffect(() => {
        getLocations().then(data => setParkings(data))
    },[])

    return (
        <>
            {
                parkings.map((parking) => {
                    return (
                        <>
                            <div className="parking__content">
                            <table>
                                        <th>
                                            <th>Name</th>
                                            <th>Address</th>
                                            <th>County</th>
                                            <th>Type</th>
                                        </th>
                                        <tr>
                                        <td><Link className="website__link" to={`/parking/${parking.id}`} builder={parking}>{parking.title}</Link></td>
                                            <td>{parking.address}</td>
                                            <td>{parking.county.name}</td>
                                            <td>{parking.location_category.name}</td>
                                        </tr>
                            </table>
                            </div>
                        </>
                    )
                })
            }
            <div onClick={() => {history.push('/parking/new')}} className="button__div"><button className="button">Add</button></div>
        </>
    )
}