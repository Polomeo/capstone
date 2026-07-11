function LoginPage(){
    
    function handleLogin(event){
        event.preventDefault();
        console.log('Log in button pressed')

        const formData = new FormData(event.currentTarget);

        // Attemt to log in
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
                // Redirect to Students page
            }
            else if (response.error){
                console.log("Incorrect credentials.")
                // Show error in page
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
                    <input type="text" className="form-control" name="username" id="usernameInput" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" id="password" />
                </div>
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