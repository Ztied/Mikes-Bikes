import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getUser, updateProfile } from "../../services/userService"
import "./Form.css"

export const BikeProfile = (currentUser) => {
    const [profile, setProfile] = useState({})
    const navigate = useNavigate()
    const {userId} = useParams()

    useEffect(() => {
        getUser(userId).then((data) => {
            const userId = data[0]
            setProfile(userId)
        })
    }, [userId])

    const handelNameChange = (event) => {
        const copy = {...profile}
        copy.fullName = event.target.value
        setProfile(copy)
    }

    const handelEmailChange = (event) => {
        const copy = {...profile}
        copy.email = event.target.value
        setProfile(copy)
    }

    const handleSave = (event) => {
        
        const editProfile = {
            id: profile.id,
            fullName: profile.fullName,
            email: profile.email,
        }

        updateProfile(editProfile).then(() => {
            navigate(`/myBikes`)
        })
    }

    return(
        <form className="form-profile">
            <fieldset>
                <div className="form-group">
                    <label>Name: </label>
                    <input type="text" value={profile.fullName ? profile.fullName : ''} required className="form-control" onChange={handelNameChange}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Email: </label>
                    <input type="text" value={profile.email ? profile.email : ''} required className="form-control" onChange={handelEmailChange}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-btn-center">
                    <button className=" btn-primary" type="button" onClick={handleSave}>Save Profile</button>
                </div>
            </fieldset>
        </form>
    )
}