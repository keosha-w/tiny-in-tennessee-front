import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { createBuilder, getBuilders } from "../Repos/BuilderManager"
import "./builderList.css"


export const BuilderForm = () => {
    const history = useHistory()
    const [builders, setBuilders] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentBuilder, setCurrentBuilder] = useState({
        title: "",
        website: "",
        contact_info: "",
        user: localStorage.getItem("tit_token")
        
    })

    useEffect(() => {
        getBuilders().then(data => setBuilders(data))
    }, [])

    const changeBuilderState = (domEvent) => {
        domEvent.preventDefault()
        const copy = {...currentBuilder}
        let key = domEvent.target.name
        copy[key] = domEvent.target.value
        setCurrentBuilder(copy)
    }

    return (
        <form className="builderForm">
            <h2 className="builderForm__title">Register New Builder</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentBuilder.title}
                        onChange={changeBuilderState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="website">Website: </label>
                    <input type="text" name="website" required autoFocus className="form-control"
                        value={currentBuilder.website}
                        onChange={changeBuilderState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="contact_info">Contact Info: </label>
                    <input type="text" name="contact_info" required autoFocus className="form-control"
                        value={currentBuilder.contact_info}
                        onChange={changeBuilderState}
                    />
                </div>
            </fieldset>
        


            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const builder = {
                        title: currentBuilder.title,
                        website: currentBuilder.website,
                        contact_info: currentBuilder.contact_info
                        
                    }

                    // Send POST request to your API
                    createBuilder(builder)
                        .then(() => history.push("/builders"))
                }}
                className="button">Submit</button>
        </form>
    )
}