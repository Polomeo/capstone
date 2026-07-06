import { useParams } from "react-router-dom"
import ProfileAcademicHistoryList from "../components/ProfileAcademicHistoryList";

function ProfilePage(){
    
    const { id } = useParams();

    const studentPersonalData = {
        'id' : id,
        'first_name' : 'Test Name',
        'last_name' : 'Test LastName',
        'personal_id' : '11222333',
        'enroll_year' : '2025',
        'enroll_id' : '125'
    }

    const studentAcademicHistory = [
        {
            'exam_id': 1, 
            'subject_year' : "1", 
            'subject_short': 'DIVINATION I', 
            'exam_grading' : "7", 
            'absent' : false, 
            'exam_date' : '2025-04-01',
        },
        {
            'exam_id': 2, 
            'subject_year' : "1", 
            'subject_short': 'DADA I', 
            'exam_grading' : '', 
            'absent' : true, 
            'exam_date' : '2025-08-01',
        },
        {
            'exam_id': 3, 
            'subject_year' : "2", 
            'subject_short': 'DADA II', 
            'exam_grading' : '2',
            'absent' : false, 
            'exam_date' : '2026-04-02',
        },
    ]
    
    return (
        <div className="container">
            Profile page for Student ID: {id}
            <div>
                <ProfileAcademicHistoryList studentAcademicHistory={studentAcademicHistory} />
            </div>
        </div>
    )
}

export default ProfilePage