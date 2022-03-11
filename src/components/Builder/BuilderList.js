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
                                    <table>
                                        <tr>
                                            <th>Title</th>
                                            <th>Website</th>
                                            <th>Contact Info</th>
                                        </tr>
                                        <tr>
                                            <td>{builder.title}</td>
                                            <td><a className="website__link" href={builder.website}>{builder.website}</a></td>
                                            <td>{builder.contact_info}</td>
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