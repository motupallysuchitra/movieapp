

import { Link, useNavigate } from "react-router-dom";
import "../Navbar/navbar.css"

function Navbar() {
    const nav = useNavigate()
    function navigateTologin() {
        nav("/login")

    }
    function navigateToRegistration() {
        nav("/signup")

    }

    const logged = localStorage.getItem('access_token')

    function logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setTimeout(() => {
            window.location.reload()
        }, 1000);
        nav('/', true);
    }

    function homeLoad() {
        nav("/", true)
        window.location.reload();
    }
    function myBookings() {
        if(logged){
            nav("/user/bookings")
        }
        else{
            alert("You Need To Login First!")
            nav('/login',true)
        }
    }
    return (
     
        <nav className="navbar navbar-expand-lg navbar-light hervey-bg">
        
            <div className="container-fluid">
               <img src="https://pixner.net/boleto/demo/assets/images/logo/logo.png" alt="Logo" style={{ width: '200px', height: 'auto' }} />
              
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {/* <li className="nav-item">
                        <a className="nav-link" href="/">Home</a>
                    </li> */}
                    <li className="nav-item">
    <a className="nav-link" href="/" style={{ color: 'white' }}>Home</a>
</li>

                    </ul>

                    <span className="d-flex">
                        {!logged &&
                            (<>
                                <button className="btn  btn-outline-success " type="submit" onClick={navigateTologin}>Login</button>
                                <button className="btn  btn-outline-success " type="submit" onClick={navigateToRegistration}>SignUp</button>
                            </>)
                        }
                        {
                            logged &&
                            (<>
                                <button className="btn  btn-outline-success " type="submit" onClick={myBookings}>My Bookings</button>
                                <button className="btn  btn-outline-success " type="submit" onClick={logout}>Logout</button>
                            </>)
                        }
                    </span>
                </div>
            </div>
        </nav>
    )

}


export default Navbar;