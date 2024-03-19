import { Outlet, Route, Routes } from "react-router-dom"
import { NavBar } from "../components/nav/NavBar"
import { Bike } from "../components/bikes/Bikes"
import { DirtBikeList } from "../components/bikes/DirtBikes"
import { StreetBikeList } from "../components/bikes/StreetBikes"
import { ElectricBikes } from "../components/bikes/ElectricBikes"
import { BikeDetails } from "../components/bikes/BikeDetails"
import { MyBike } from "../components/bikes/MyBikes"
import { useEffect, useState } from "react"
import { BikeEdit } from "../components/forms/BikeEdit"
import { BikeCreate } from "../components/forms/BikeCreate"
import { CruiserBikes } from "../components/bikes/CruiserBikes"

export const ApplicationView = () => {
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    const localUser = localStorage.getItem("mikes_user")
    const userObject = JSON.parse(localUser)
    setCurrentUser(userObject)
  }, [])
    return (
        <Routes>
            <Route path="/" element={<>
            <NavBar/>
            <Outlet/>
            </>}>
                <Route path="bikes" >
                    <Route index element={<Bike/>}/>
                    <Route path=":bikeId" element={<BikeDetails/>}/>
                </Route>
                <Route path="streetBikes" element={<StreetBikeList/>}>
                    <Route index element={<StreetBikeList/>}/>
                    <Route path=":bikeId" element={<BikeDetails/>}/>
                </Route>
                <Route path="dirtBikes" >
                    <Route index element={<DirtBikeList/>}/>
                    <Route path=":bikeId" element={<BikeDetails/>}/>
                </Route>
                <Route path="electricBikes" >
                    <Route index element={<ElectricBikes/>}/>
                    <Route path=":bikeId" element={<BikeDetails/>}/>
                </Route>
                <Route path="cruiserBikes">
                    <Route index element={<CruiserBikes/>}/>
                    <Route path=":bikeId" element={<BikeDetails/>}/>
                </Route>
                <Route path="myBikes" >
                    <Route index element={<MyBike currentUser={currentUser}/>}/>
                    <Route path=":bikeId" element={<BikeEdit/>}/>
                    <Route path="create" element={<BikeCreate currentUser={currentUser}/>}/>
                </Route>
            </Route>
        </Routes>
    )
}