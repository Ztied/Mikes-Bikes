import { useState, useEffect } from "react"
import { getBikeByType } from "../../services/BikesService"
import "./Bikes.css"
import { Link } from "react-router-dom"

export const CruiserBikes = () => {
    const [cruiserBikes, setCruiserBikes] = useState([])

    useEffect(() => {
        getBikeByType(4).then(cruiserBikeArray => {
            setCruiserBikes(cruiserBikeArray)
        })
    }, [])

    return(
        <div className="bikes">
            {cruiserBikes.map(bike => {
                return <div className="bike" key={bike.id}> <Link to={`/bikes/${bike.id}`}><img className="bike-img" src={bike.img}/> </Link>
                <div className="bike-content"><h2>{bike.make}: {bike.model}</h2>
                <p>Mods: {bike.mods}</p>
                <h4>Made By: {bike.user.fullName}</h4>
                </div>
                </div>
            })}
        </div>
    )
}