import { Navigate, Outlet } from "react-router-dom"

function AuthLoggedInRoutes({ isAuthenticated, loginPage }){
    if(!isAuthenticated){
        // Redirects to login page
        return <Navigate to={loginPage} replace />
    }
    // Redirects the child page
    return <Outlet />
}

export default AuthLoggedInRoutes