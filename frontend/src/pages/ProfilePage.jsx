import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import ProfileAcademicHistoryList from "../components/ProfileAcademicHistoryList";
import ProfileStudentHeader from "../components/ProfileStudentHeader";

function ProfilePage(){
    
    const { id } = useParams();
    const [studentPersonalInfo, setStudentPersonalInfo] = useState({});
    const [studentAcademicHistory, setStudentAcademicHistory] = useState([]);

    useEffect(() =>{
        fetch(`http://localhost:8000/api/profile_info/${id}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            console.log(data.student_personal_info);
            console.log(data.student_academic_history);

            setStudentPersonalInfo(data.student_personal_info);
            setStudentAcademicHistory(data.student_academic_history);
        })
    }, [])

    const studentPersonalDataTest = {
        'id' : id,
        'first_name' : 'Test Name',
        'last_name' : 'Test LastName',
        'personal_id' : '11222333',
        'enroll_year' : '2025',
        'enroll_id' : '125'
    }

    // const studentAcademicHistoryTest = [
    //     {
    //         'exam_id': 1, 
    //         'subject_year' : "1", 
    //         'subject_short': 'DIVINATION I', 
    //         'exam_grading' : "7", 
    //         'absent' : false, 
    //         'exam_date' : '2025-04-01',
    //     },
    //     {
    //         'exam_id': 2, 
    //         'subject_year' : "1", 
    //         'subject_short': 'DADA I', 
    //         'exam_grading' : '', 
    //         'absent' : true, 
    //         'exam_date' : '2025-08-01',
    //     },
    //     {
    //         'exam_id': 3, 
    //         'subject_year' : "2", 
    //         'subject_short': 'DADA II', 
    //         'exam_grading' : '2',
    //         'absent' : false, 
    //         'exam_date' : '2026-04-02',
    //     },
    // ]
    
    return (
        <div className="container">
            <div>
                <ProfileStudentHeader studentPersonalData={studentPersonalInfo} />
            </div>
            <div>
                <ProfileAcademicHistoryList studentAcademicHistory={studentAcademicHistory} />
            </div>
        </div>
    )
}

export default ProfilePage