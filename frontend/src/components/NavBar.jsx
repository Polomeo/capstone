import { useLocation, Link, useNavigate } from 'react-router-dom'

function NavBar({ isAuthenticated, setIsAuthenticated }) {

    const location = useLocation();
    const navigate = useNavigate();

    function handleLogout(){
        fetch('http://localhost:8000/api/logout', {
            method: 'POST',
            credentials: 'include',
        })
        .then(res => {
            if(res.ok){
                console.log('User logged out.');
                setIsAuthenticated(false);
                navigate('/login', {replace: true});
            }
            else {
                console.log('Error loggin out.')
            }
        })
        .catch(error => console.log('Error: ', error));
    }

    return (
        <nav className='navbar navbar-expand bg-body-tertiary'>
            <div className="container-fluid">
                <div className='navbar-brand'>
                    <Link to='/'>Hogwarts School Manager</Link>
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
                    {(isAuthenticated) && (
                        <button onClick={handleLogout} className='btn btn-danger btn-sm'>Logout</button>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default NavBar