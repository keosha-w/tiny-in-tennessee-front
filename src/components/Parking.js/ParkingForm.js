import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { createParking, getLocations } from "./ParkingManager"
import "./parkingList.css"


export const ParkingForm = () => {
    const history = useHistory()
    const [parkings, setParkings] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentParking, setCurrentParking] = useState({
        title: "",
        website: "",
        contact_info: "",
        user: localStorage.getItem("tit_token")
        
    })

    useEffect(() => {
        getLocations().then(data => setParkings(data))
    }, [])

    const changeParkingState = (domEvent) => {
        domEvent.preventDefault()
        const copy = {...currentParking}
        let key = domEvent.target.name
        copy[key] = domEvent.target.value
        setCurrentParking(copy)
    }

    return (
        <form className="parkingForm">
            <h2 className="parkingForm__title">Register New Parking</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentParking.title}
                        onChange={changeParkingState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="website">Website: </label>
                    <input type="text" name="website" required autoFocus className="form-control"
                        value={currentParking.website}
                        onChange={changeParkingState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="contact_info">Contact Info: </label>
                    <input type="text" name="contact_info" required autoFocus className="form-control"
                        value={currentParking.contact_info}
                        onChange={changeParkingState}
                    />
                </div>
            </fieldset>
        


            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const parking = {
                        title: currentParking.title,
                        website: currentParking.website,
                        contact_info: currentParking.contact_info,
                        user: localStorage.getItem("tit_token")
                        
                    }

                    // Send POST request to your API
                    createParking(parking)
                        .then(() => history.push("/parking"))
                }}
                className="button">Submit</button>
        </form>
    )
}