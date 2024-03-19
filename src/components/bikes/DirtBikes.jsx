import {useState, useEffect} from "react"
import { getBikeByType } from "../../services/BikesService"
import "./Bikes.css"
import { Link } from "react-router-dom"

export const DirtBikeList = () => {
    const [dirtBikes, setDirtBikes] = useState([])

useEffect(() => {
    getBikeByType(2).then(dirtBikeArray => {
        setDirtBikes(dirtBikeArray)
    })
}, [])

return (
    <div className="bikes"> 
        {dirtBikes.map(dirtBikeObj => {
            return <div className="bike" key={dirtBikeObj.id}> <Link to={`/bikes/${dirtBikeObj.id}`}><img className="bike-img" src={dirtBikeObj.img}/> </Link>
                <div className="bike-content"><h2>{dirtBikeObj.make}: {dirtBikeObj.model}</h2>
                <p></p>
                <h4>Made by: {dirtBikeObj.user.fullName}</h4>
            </div>
            </div>
        })}
    </div>
)

}