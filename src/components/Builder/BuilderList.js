import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { getBuilders } from "./BuilderManager"
import "./builderList.css"
import { Link } from "react-router-dom"

export const BuilderList = () => {
    const [ builders, setBuilders ] = useState([])
    const history = useHistory()

    useEffect(() => {
        getBuilders().then(data => setBuilders(data))
    },[])

    return (
        <>
            {
                builders.map((builder) => {
                    return (
                        <>
                            <div className="builder__content">
                                
                                    <h4>Title</h4>
                                    <h4>Website</h4>
                                    <h4>Contact Info</h4>
                                    <p>{builder.title}</p>
                                    <a className="website__link" href={builder.website}>{builder.website}</a>
                                    <p>{builder.contact_info}</p>
                            </div>
                            <div className="button__div"><button className="button">Add</button></div>
                        </>
                    )
                })
            }
        </>
    )
}