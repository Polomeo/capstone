import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorsList from "../components/ErrorsList";

function LoginPage({ setIsAuthenticated }){

    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    
    function handleLogin(event){
        event.preventDefault();
        console.log('Log in button pressed')

        const formData = new FormData(event.currentTarget);

        // Attempt to log in
        fetch('http://localhost:8000/api/login', {
            method: 'POST',
            body: JSON.stringify({
                username : formData.get("username"),
                password : formData.get("password"),
            }),
            cache : 'reload',
            credentials : 'include',
        })
        .then(res => res.json())
        .then(response => {
            if(response.success){
                console.log("User logged in successfully.")
                setIsAuthenticated(true);
                // Redirect to Students page
                navigate('/', { replace : true });

            }
            else if (response.error){
                console.log("Incorrect credentials.");
                // Show error in page
                let errors = [];
                errors.push(response.error);
                setErrors(errors);
            }
        })

    }

    return(
        <div className="container">
            <h3>Login</h3>
            <form
                onSubmit={(event) => handleLogin(event)}
            >
                <div className="mb-3">
                    <label htmlFor="usernameInput" className="form-label">Username</label>
                    <input type="text" className="form-control" name="username" id="usernameInput" autoComplete="on" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" id="password" autoComplete="on" />
                </div>
                {(errors.length > 0) && 
                    <div>
                        <ErrorsList errorsList={errors} />
                    </div>
                }
                <div className="mb-3">
                    <button 
                        type="submit"
                        className="btn btn-primary"
                        >Log in</button>
                </div>
            </form>
        </div>
    )
}

export default LoginPage