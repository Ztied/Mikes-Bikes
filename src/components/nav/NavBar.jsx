import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return <ul className="navbar">
        
        <li className="navbar-item">
            <Link className="navbar-link" to='/bikes'>Bikes</Link>
        </li>
        <li className="navbar-item">
            <Link className="navbar-link" to='/streetBikes'>Street Bikes</Link>
        </li>
        <li className="navbar-item">
            <Link className="navbar-link" to='/dirtBikes'>Dirt Bikes</Link>
        </li>
        <li className="navbar-item">
          <Link className="navbar-link" to='/electricBikes'>Electric Bikes</Link>
        </li>
        <li className="navbar-item">
          <Link className="navbar-link" to='/cruiserBikes'>Cruiser Bikes</Link>
        </li>
        <li className="navbar-item">
          <Link className="navbar-link" to='/myBikes'>My Bikes</Link>
        </li>
        
        
        {localStorage.getItem("mikes_user") ? (
  <li className="navbar-item navbar-logout">
    <Link
      className="navbar-link"
      to=""
      onClick={() => {
        localStorage.removeItem("mikes_user")
        navigate("/", { replace: true })
      }}
    >
      Logout
    </Link>
  </li>
) : (
  ""
)}
    </ul>
}