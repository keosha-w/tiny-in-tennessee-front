import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useHistory } from 'react-router-dom'
import { getCounties } from "../Repos/CountyManager"
import { getLocationCategories } from "../Repos/LocationCategoryManager"
import { createParking, getLocations, getSingleParking, updateParking } from "../Repos/ParkingManager"
import "./parkingList.css"
import { getTags } from "../Repos/TagManager."

export const EditParkingForm = () => {
    const history = useHistory()
    const [parkings, setParkings] = useState([])
    const [counties, setCounties] = useState([])
    const [categories, setCategories] = useState([])
    
    
    const { parkingId } = useParams()
    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentParking, setCurrentParking] = useState({
        title: "",
        address: "",
        county: 0,
        monthlyPrice: 0,
        electrical: false,
        septic: false,
        water: false,
        locationCategory: 0
        
    })

    useEffect(() => {
        getSingleParking(parkingId).then(data => setCurrentParking({
            title: data.title,
            address: data.address,
            county: data.county?.id,
            monthlyPrice: data.monthlyPrice,
            electrical: data.electrical,
            septic: data.septic,
            water: data.water,
            locationCategory: data.location_category?.id
        }))
    }, [parkingId])

    useEffect(() => {
        getLocations().then(data => setParkings(data))
    }, [])

    useEffect(() => {
        getCounties().then(data => setCounties(data))
    }, [])

    useEffect(() => {
        getLocationCategories().then(data => setCategories(data))
    }, [])

    

    const changeParkingState = (domEvent) => {
        domEvent.preventDefault()
        const copy = {...currentParking}
        let key = domEvent.target.name
        copy[key] = domEvent.target.value
        setCurrentParking(copy)
    }

    const changeCheckedState = (domEvent) => {
        const copy = {...currentParking}
        let key = domEvent.target.name
        copy[key] = domEvent.target.checked
        setCurrentParking(copy)
    }

    return (
        <form className="parkingForm">
            <h2 className="parkingForm__name">Register New Parking</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Name: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentParking.title}
                        onChange={changeParkingState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">Address: </label>
                    <input type="text" name="address" required autoFocus className="form-control"
                        value={currentParking.address}
                        onChange={changeParkingState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="county">County: </label>
                    <select name="county" required className="form-control"
                        value={currentParking.county}
                        onChange={changeParkingState}>
                    <option value="0">Select a county</option>
                    {
                        counties.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))
                    }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="locationCategory">Category: </label>
                    <select name="locationCategory" required className="form-control"
                        value={currentParking.locationCategory}
                        onChange={changeParkingState}>
                    <option value="0">Select a Category</option>
                    {
                        categories.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))
                    }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="monthlyPrice">Monthly price: </label>
                    <input type="currency" name="monthlyPrice" required autoFocus className="form-control"
                        value={currentParking.monthlyPrice}
                        onChange={changeParkingState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="electrical">Electric: </label>
                    <input type="checkbox" name="electrical"  autoFocus className="form-control"
                        checked={currentParking.electrical}
                        onChange={changeCheckedState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="septic">Septic: </label>
                    <input type="checkbox" name="septic"  autoFocus className="form-control"
                        checked={currentParking.septic}
                        onChange={changeCheckedState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="water">Water: </label>
                    <input type="checkbox" name="water"  autoFocus className="form-control"
                        checked={currentParking.water}
                        onChange={changeCheckedState}
                    />
                </div>
            </fieldset>
            
        


            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const parking = {
                        title: currentParking.title,
                        address: currentParking.address,
                        county_id: parseInt(currentParking.county),
                        monthlyPrice: currentParking.monthlyPrice,
                        electrical: currentParking.electrical,
                        septic: currentParking.septic,
                        water: currentParking.water,
                        location_category:parseInt(currentParking.locationCategory)
                        
                    }

                    // Send POST request to your API
                    updateParking(parking, parkingId)
                        .then(() => history.push("/parking"))
                }}
                className="button">Submit</button>
        </form>
    )
}