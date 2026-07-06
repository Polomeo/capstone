import { useParams } from "react-router-dom"

function ProfilePage(){
    
    const { id } = useParams();
    
    return (
        <div className="container">
            Profile page for Student ID: {id}
        </div>
    )
}

export default ProfilePage