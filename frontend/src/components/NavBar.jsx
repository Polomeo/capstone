import { Link } from 'react-router-dom'

function NavBar() {
    return (
        <nav className='navbar sticky-top navbar-expand-lg bg-body-tertiary'>
            <div className="container-fluid">
                <div className='navbar-brand'>
                    <Link to='/'>School Manager</Link>
                </div>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to='/' className="nav-link active">Students</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/exams' className="nav-link">Exams</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar