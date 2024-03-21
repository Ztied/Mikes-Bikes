import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./Form.css"
import { createBike,  getBikeSizes, getBikeTypes } from "../../services/BikesService"

export const BikeCreate = ({currentUser}) => {
 const [bikes, setBikes] = useState({ img: "", make: "", model: "", info: "",})
 const [selectedOption ,setSelectedOption] = useState('')
 const [selectedType, setSelectedType] = useState([]);
 const [selectedSize, setSelectedSize] = useState([])
 const [uniqueTypes, setUniqueTypes] = useState([])
 const [uniqueSizes, setUniqueSizes] = useState([])
 const {bikeId} = useParams()
 const navigate = useNavigate()

 

 useEffect(() => {
  getBikeTypes().then((typeArray) => {
    setUniqueTypes(typeArray)
  })
 }, [])

 useEffect(() => {
  getBikeSizes().then((sizeArray) => {
    setUniqueSizes(sizeArray)
  })
 }, [])

 const handleTypeChange = (event) => {
    setSelectedType(event.target.value)
  }

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value)
  }

  const handleCreateBikeImg = (event) => {
    const copy = {...bikes}
    copy.img = event.target.value
    setBikes(copy)
  }

  const handleCreateBikeMake = (event) => {
    const copy = {...bikes}
    copy.make = event.target.value
    setBikes(copy)
  }

  const handleCreateBikeModel = (event) => {
    const copy = {...bikes}
    copy.model = event.target.value
    setBikes(copy)
  }

  const handleCreateBikeInfo = (event) => {
    const copy = {...bikes}
    copy.info = event.target.value
    setBikes(copy)
  }

  const handleCreateMods = (event) => {
    const copy = {...bikes}
    copy.mods = event.target.value
    setBikes(copy)
  }

  const handlePost = (event) => {
    event.preventDefault()

    if(bikes.img && selectedType && selectedSize) {

      const userId = currentUser ? currentUser.id : null
      
      const newBike = {
            id: bikes.id,
            img: bikes.img,
            make: bikes.make,
            model: bikes.model,
            mods: bikes.mods,
            info: bikes.info,
            sizeId: selectedSize,
            typeId: selectedType,
            userId: userId,
      }

      createBike(newBike).then(() => {
          navigate("/myBikes")
      })
    } else {
      window.alert("Please add an img url")
    }
  }
 
 

  return (
    <form className="bike-edit">
      <h2>Create Ticket</h2>
      <fieldset>
      <label htmlFor="dropdown">Select your type of bike:</label>
      <select id="dropdown" className="form-control" value={selectedOption.type} onChange={handleTypeChange}>
        <option value="">-- Select --</option>
            {uniqueTypes.map((type) => {
                return  <option key={type.id} value={type.id}>{type.type}</option>
            })}
         
        
      </select>
      
      </fieldset>
      <fieldset>
        <label htmlFor="dropdown">Select your engine CC: </label>
        <select id="dropdown" className="form-control" value={selectedOption.size} onChange={handleSizeChange}>
            <option>-- Select --</option>
            {uniqueSizes.map((size) => {
              return <option key={size.id} value={size.id}>{size.size}</option>
            })}
        </select>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Image: </label><input type="text" className="form-control" placeholder="Image URL of your bike" onChange={handleCreateBikeImg}/>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Make: </label><input type="text" className="form-control" placeholder="Make of your bike" onChange={handleCreateBikeMake}/>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Model: </label><input type="text" className="form-control" placeholder="Model of your bike" onChange={handleCreateBikeModel}/>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
            <label>Modification: </label><input type="text" className="form-control" placeholder="Mods done to your bike" onChange={handleCreateMods}></input>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Info: </label><input type="text" className="form-control" placeholder="Info of your bike" onChange={handleCreateBikeInfo}/>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
            <button className="form-btn float-on-hover" onClick={handlePost}>Create Bike</button>
        </div>
      </fieldset>
      
    </form>
  )
}