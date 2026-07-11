import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import ProfileAcademicHistoryList from "../components/ProfileAcademicHistoryList";
import ProfileStudentHeader from "../components/ProfileStudentHeader";

function ProfilePage(){
    
    const { id } = useParams();
    const [studentPersonalInfo, setStudentPersonalInfo] = useState(null);
    const [studentAcademicHistory, setStudentAcademicHistory] = useState([]);

    useEffect(() =>{
        fetch(`http://localhost:8000/api/profile_info/${id}`, {
            method: 'GET',
            credentials: 'include',
        })
        .then(res => {
            if(res.status === 401) {
                console.log('Status 401: NOT LOGGED IN')
                return null // If this return is not present, the next fails
            }
            return res.json()
        })
        .then(data => {
            setStudentPersonalInfo(data.student_personal_info);
            setStudentAcademicHistory(data.student_academic_history);
        })
    }, [])
    
    return (
        <div className="container">
            <div>
                {(studentPersonalInfo) && <ProfileStudentHeader studentPersonalData={studentPersonalInfo} />}
            </div>
            <div>
                {(studentAcademicHistory) && <ProfileAcademicHistoryList studentAcademicHistory={studentAcademicHistory} />}
            </div>
        </div>
    )
}

export default ProfilePage