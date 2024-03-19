import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getBikeById, getBikeSizes, getBikeTypes, updateBike } from "../../services/BikesService"
import "./Form.css"

export const BikeEdit = ({currentUser}) => {
    const [bike, setBike] = useState({})
    const [selectedOption ,setSelectedOption] = useState('')
    const [selectedType, setSelectedType] = useState(0);
    const [selectedSize, setSelectedSize] = useState(0)
    const [uniqueTypes, setUniqueTypes] = useState([])
    const [uniqueSizes, setUniqueSizes] = useState([])
    const {bikeId} = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        
            getBikeById(bikeId).then((data) => {
                const bikeObj = data[0]
                setBike(bikeObj)
                setSelectedType(bikeObj.typeId)
                setSelectedSize(bikeObj.sizeId)
            })
        
       
    }, [bikeId])

    const handleImgChange = (event) => {
        const copy = {...bike}
        copy.img = event.target.value
        setBike(copy)
    }

    const handleMakeChange = (event) => {
        const copy = {...bike}
        copy.make = event.target.value
        setBike(copy)
    }

    const handleModelChange = (event) => {
        const copy = {...bike}
        copy.model = event.target.value
        setBike(copy)
    }

    const handleInfoChange = (event) => {
        const copy = {...bike}
        copy.info = event.target.value
        setBike(copy)
    }

    const handleModChange = (event) => {
        const copy = {...bike}
        copy.mods = event.target.value
        setBike(copy)
    }

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value)
    }

    const handleSizeChange = (event) => {
        setSelectedSize(event.target.value)
    }

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

    const handleSave = (event) => {

        if(bike.img && selectedType && selectedSize) {

            

        const editedBike = {
            id: bike.id,
            img: bike.img,
            make: bike.make,
            model: bike.model,
            mods: bike.mods,
            info: bike.info,
            sizeId: selectedSize,
            typeId: selectedType,
            userId: bike.userId,
        }

        updateBike(editedBike).then(() => {
            navigate(`/myBikes`)
        })
    } else {
        window.alert("Please fill out all box's")
    }
    }

    return (
        <form className="bike-edit">
            <h2>Edit Bike</h2>
            <fieldset>
                <label htmlFor="dropdown">Select your type of bike:</label>
                <select id="dropdown" className="form-control" value={selectedType} onChange={handleTypeChange}>
                <option value="">-- Select --</option>
                {uniqueTypes.map((type) => {
                return  <option key={type.id} value={type.id}>{type.type}</option>
            })}
         
        
      </select>
      
      </fieldset>
      <fieldset>
        <label htmlFor="dropdown">Select your engine CC: </label>
        <select id="dropdown" className="form-control" value={selectedSize} onChange={handleSizeChange}>
            <option>-- Select --</option>
            {uniqueSizes.map((size) => {
              return <option key={size.id} value={size.id}>{size.size}</option>
            })}
        </select>
      </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Image: </label>
                    <input type="text" value={bike?.img ? bike.img : ''} onChange={handleImgChange} required className="form-control"/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Make: </label>
                    <input type="text" value={bike?.make ? bike.make : '' } onChange={handleMakeChange} required className="form-control"/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Model: </label>
                    <input type="text" value={bike?.model ? bike.model : ''} onChange={handleModelChange} required className="form-control"/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Modification: </label>
                    <input type="text" value={bike?.mods ? bike.mods : ''} onChange={handleModChange} required className="form-control"/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Information: </label>
                    <input type="text" value={bike?.info ? bike.info : ''} onChange={handleInfoChange} required className="form-control"/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <button className="form-btn btn-primary" type="button" onClick={
                        handleSave}>Save Bike</button>
                </div>
            </fieldset>
        </form>
    )


}