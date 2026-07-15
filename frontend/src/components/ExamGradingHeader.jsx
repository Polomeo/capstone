import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function ExamGradingHeader({ examId }){

    const [examData, setExamData] = useState({});
    const [isEditingExam, setIsEditingExam] = useState(false);
    const [errors, setErrors] = useState([]);

    // Fetch the data
    useEffect(() => {
        fetch(`http://localhost:8000/api/grading_info/${examId}`, {
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
            setExamData(data.exam_data);
            // console.log(data.exam_data);
        })
        .catch(error => console.error('Error: ', error));
    }, [])

    // Edit exam
    function handleDeleteExam(event){
        event.preventDefault();
        console.log("Delete exam pressed.")
    }
    // Delete exam

    // Cancel edit
    function handleCancelButton(event){
        event.preventDefault();
        console.log("Delete canceled.")
    }

    return(
        <div className="exam-header">
            <div className="exam-data">
                <h1>{examData.subject_full}</h1>
                <h6>Course: {examData.subject_course}° Year</h6>
                <h6>{examData.date}</h6>
            </div>
            <div className="exam-delete">
                <h6>Are you sure you want to delete this exam? All gradings in this exam would be deleted.</h6>
            </div>
        </div>
    )
}

export default ExamGradingHeader