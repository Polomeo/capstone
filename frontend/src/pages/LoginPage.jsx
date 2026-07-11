function LoginPage(){
    
    function handleLogin(event){
        event.preventDefault();
        console.log('Log in button pressed')
    }

    return(
        <div className="container">
            <h3>Login</h3>
            <form
                onSubmit={(event) => handleLogin(event)}
            >
                <div className="mb-3">
                    <label htmlFor="usernameInput" className="form-label">Username</label>
                    <input type="text" className="form-control" id="usernameInput" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" />
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