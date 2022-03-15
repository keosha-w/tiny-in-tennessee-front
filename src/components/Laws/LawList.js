import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { getLaws } from "../Repos/LawManager"
import "./lawList.css"
import { Link } from "react-router-dom"

export const LawList = () => {
    const [ laws, setLaws ] = useState([])
    const history = useHistory()

    useEffect(() => {
        getLaws().then(data => setLaws(data))
    },[])

    return (
        <>
            {
                laws.map((law) => {
                    return (
                        <>
                            <div className="law__content">
                                    <table>
                                        <tr>
                                            <th>County</th>
                                            <th>Zoning</th>
                                            <th>Building</th>
                                            <th>Notes</th>
                                        </tr>
                                        <tr>
                                            <td>{law?.county.name}</td>
                                            <td><a className="website__link" href={law?.zoning}>link</a></td>
                                            <td><a className="website__link" href={law?.building}>link</a></td>
                                            <td>{law?.notes}</td>
                                        </tr>
                                    </table>
                            </div>
                        </>
                    )
                })
            }
            <div className="button__div"><button className="button">Add</button></div>
        </>
    )
}