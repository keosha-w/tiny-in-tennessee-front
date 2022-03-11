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
                                
                                    <h4>Name</h4>
                                    <h4>Address</h4>
                                    <h4>County</h4>
                                    <p>{parking.title}</p>
                                    <p>{parking.address}</p>
                                    <p>{parking.county_id}</p>
                            </div>
                            <div className="button__div"><button className="button">Add</button></div>
                        </>
                    )
                })
            }
        </>
    )
}