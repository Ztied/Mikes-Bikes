import { useState, useEffect } from "react"
import { getBikeByUserId, deleteBike } from "../../services/BikesService"
import { Link, useNavigate, useParams } from "react-router-dom"
import "./Bikes.css"

export const MyBike = ({currentUser}) => {
    const [myBike, setMyBike] = useState([])
    const {userId} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getBikeByUserId(currentUser.id).then(bikeArray => {
            setMyBike(bikeArray)
        })
    }, [currentUser])

    

    const handleEdit = (bikeId) => {
        navigate(`/myBikes/${bikeId}`)
    }

    const handleCreate = () => {
        navigate(`/myBikes/create`)
    }

    const handleDelete = (bikeId) => {
        deleteBike(bikeId).then(() => {
            setMyBike(prevBikes => prevBikes.filter(bike => bike.id !== bikeId))
        })
    }

    const handleProfile = () => {
        navigate('/myBikes/profile')
    }

    return( <section>
    <div className="bikes"> <button className="btn-create" onClick={handleCreate}>Create</button> <button className="btn-create" onClick={handleProfile}>Profile</button>
       {myBike.map(bikeObj => {
        return <div key={bikeObj.id} className="bike"> <Link to={`/bikes/${bikeObj.id}`}><img className="bike-img" src={bikeObj.img}/> </Link>
        <div className="bike-content "><h2>{bikeObj.make}: {bikeObj.model}</h2>
        <p>Mods: {bikeObj.mods}</p>
        <h4>Made By: {bikeObj.user?.fullName} <div className="btn-pad"> <button className="btn" onClick={() => handleEdit(bikeObj.id)}>Edit</button>
        <button className="btn-delete" onClick={() => handleDelete(bikeObj.id)}>Delete</button> </div></h4>
        
        </div>
        
        </div>
       })}
         
    </div>
</section>
    )
}