import { useState, useEffect } from "react"
import { getBikeByType } from "../../services/BikesService"
import "./Bikes.css"
import { Link } from "react-router-dom"

export const ElectricBikes = () => {
    const [electricBikes, setElectricBikes] = useState([])

    useEffect(() => {
        getBikeByType(3).then(electricBikeArray => {
            setElectricBikes(electricBikeArray)
        })
    }, [])

    return(
        <div className="bikes">
            {electricBikes.map(bikeObj => {
                return <div className="bike" key={bikeObj.id}> <Link to={`/bikes/${bikeObj.id}`}><img className="bike-img" src={bikeObj.img}/> </Link> 
                <div className="bike-content"><h2>{bikeObj.make}: {bikeObj.model}</h2>
                <p>Mods: {bikeObj.mods}</p>
                <h4>Made By: {bikeObj.user.fullName}</h4>
                </div>
                </div>
            })}
        </div>
    )
}