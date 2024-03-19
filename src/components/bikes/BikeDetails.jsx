import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getBikeById } from "../../services/BikesService"
import "./Details.css"

export const BikeDetails = () => {
    const [bike, setBike] = useState({})
    const { bikeId } = useParams()

    useEffect(() => {
        getBikeById(bikeId).then(data => {
            const bikeObj = data[0]
            setBike(bikeObj)
        })
    }, [bikeId])

    return <section>
        <div className="bikes-details">
           <div className="bike-details"><img className="bike-imgDetails" src={bike.img}/>
           <div className="bike-content"><h2>{bike.make}: {bike.model}</h2>
           <p>Information: {bike.info}</p>
           <p>Mods: {bike.mods}</p>
           <h4>Made By: {bike.user?.fullName}</h4>
           </div>
           </div>
            
        </div>
    </section>
}