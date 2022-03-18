import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { getBuilders } from "../Repos/BuilderManager"
import "./builderList.css"
import { Link } from "react-router-dom"
import Builder from "./Builder"

export const BuilderList = () => {
    const [ builders, setBuilders ] = useState([])
    const history = useHistory()

    useEffect(() => {
        getBuilders().then(data => setBuilders(data))
    },[])

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
            {
                builders.map((builder) => {
                    return (
                        <>
                                            <td><Link className="builder__link" to={`/builder/${builder.id}`} builder={builder}>{builder.title}</Link></td>
                                            <td><a className="website__link" href={builder.website}>{builder.website}</a></td>
                                            <td>{builder.contact_info}</td>
                        </>
                    )
                })
            }
            </tr>
        </table>
</div>
            <div className="button__div"><button onClick={() => {history.push('/builders/new')}} className="button">Add</button></div>
        </>
    )
}