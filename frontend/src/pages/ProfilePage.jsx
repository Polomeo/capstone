import { useEffect, useState, createContext } from "react";
import { useParams } from "react-router-dom"
import ProfileAcademicHistoryList from "../components/ProfileAcademicHistoryList";
import ProfileStudentHeader from "../components/ProfileStudentHeader";

export const StudentPersonalDataContext = createContext();
export const IsEditingStudentContext= createContext();

function ProfilePage(){
    
    const { id } = useParams();
    const [studentPersonalInfo, setStudentPersonalInfo] = useState(null);
    const [isEditingStudent, setIsEditingStudent] = useState(false);
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
    }, [isEditingStudent])
    
    return (
        <div className="container">
            <StudentPersonalDataContext.Provider value={[studentPersonalInfo, setStudentPersonalInfo]}>
                <IsEditingStudentContext.Provider value={[isEditingStudent, setIsEditingStudent]}>
                    <div>
                        {(studentPersonalInfo) && <ProfileStudentHeader />}
                    </div>
                    <div>
                        {(studentAcademicHistory.length) > 0 
                            ? <ProfileAcademicHistoryList studentAcademicHistory={studentAcademicHistory} />
                        : <div>No exams registered for this student yet.</div>}
                    </div>
                </IsEditingStudentContext.Provider>
            </StudentPersonalDataContext.Provider>
        </div>
    )
}

export default ProfilePage