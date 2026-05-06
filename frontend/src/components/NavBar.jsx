import { useLocation, Link } from 'react-router-dom'

function NavBar() {

    const location = useLocation();

    return (
        <nav className='navbar navbar-expand bg-body-tertiary'>
            <div className="container-fluid">
                <div className='navbar-brand'>
                    <Link to='/'>School Manager</Link>
                </div>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to='/' className={"nav-link" + ((location.pathname == '/') ? " active" : "")}>Students</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/exams' className={"nav-link" + ((location.pathname == '/exams') ? " active" : "")}>Exams</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar