import { useState, useEffect } from "react"
import { getAllBikes } from "../../services/BikesService"
import { Link } from "react-router-dom"
import "./Bikes.css"

export const Bike = () => {
    const [bikes, setBikes] = useState([])

    useEffect(() => {
        getAllBikes().then((bikeArray) => {
            setBikes(bikeArray)
        })
    }, [])

    const [file, setFile] = useState();
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    return (
        <section>
            <header></header>
            <div className="bikes">
            {bikes.map((bike) => {
                return <div className="bike" key={bike.id}> <Link to={`/bikes/${bike.id}`}><img className="bike-img" src={bike.img}/> </Link>
                <div className="bike-content"><h2>{bike.make}: {bike.model}</h2>
                <p>Mods: {bike.mods}</p>
                <h4 className="">Made by: {bike.user.fullName}</h4>
                </div>
                </div>
            })}
            </div>
        </section>
    )
}