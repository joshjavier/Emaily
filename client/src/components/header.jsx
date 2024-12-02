import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Payments from "./payments"

const Header = () => {
  const auth = useSelector(state => state.auth)

  const renderContent = () => {
    switch (auth) {
      case null:
        return
      case false:
        return <li><a href="/auth/google">Log in with Google</a></li>
      default:
        return (
          <>
            <li><Payments /></li>
            <li><a href="/api/logout">Log out</a></li>
          </>
        )
    }
  }

  return (
    <nav>
      <div className="nav-wrapper container">
        <Link to={auth ? '/surveys' : '/'} className="brand-logo">Emaily</Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {renderContent()}
        </ul>
      </div>
    </nav>
  )
}

export default Header
