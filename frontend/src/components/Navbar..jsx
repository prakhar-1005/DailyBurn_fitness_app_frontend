import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {

  const {user} =useAuthContext();
  const {logout} = useLogout();

  // used to logout
  const handleClick = ()=>{
    logout()
  }

  return (
    <header>
        <div className="container">
            <Link to="/">
                <h1>Daily Burn</h1>
            </Link>

            <nav>
              <div>
              {user && <span>{user.email}</span>}  {/*Using localStorage.getItem('user') here causes error on reloading after logging in*/}
              {localStorage.getItem('user') && <button onClick={handleClick}>Logout</button>}
              </div>
              <div>
                {!localStorage.getItem('user') &&<Link to="/login">Login</Link>}
                {!localStorage.getItem('user') && <Link to="/signup">Signup</Link>}
              </div>
            </nav>
        </div>
    </header>
  )
}

export default Navbar
