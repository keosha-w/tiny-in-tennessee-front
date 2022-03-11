import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { getLocations } from "./ParkingManager"
import "./parkingList.css"


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
                                        </th>
                                        <tr>
                                            <td>{parking.title}</td>
                                            <td>{parking.address}</td>
                                            <td>{parking.county_id}</td>
                                        </tr>
                            </table>
                            </div>
                            <div className="button__div"><button className="button">Add</button></div>
                        </>
                    )
                })
            }
        </>
    )
}