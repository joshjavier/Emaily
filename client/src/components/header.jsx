import { useSelector } from "react-redux"

const Header = () => {
  const auth = useSelector(state => state.auth)
  console.log(auth)

  return (
    <nav>
      <div className="nav-wrapper container">
        <a href="#" className="brand-logo">Emaily</a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><a href="#">Log in with Google</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Header
