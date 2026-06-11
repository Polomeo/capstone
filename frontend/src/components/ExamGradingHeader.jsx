import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function ExamGradingHeader({ examId }){

    const [examData, setExamData] = useState({});

    // Fetch the data
    useEffect(() => {
        fetch(`http://localhost:8000/api/grading/${examId}`)
        .then(res => res.json())
        .then(data => {
            setExamData(data.exam_data);
            // console.log(data.exam_data);
        })
        .catch(error => console.error('Error: ', error));
    }, [])

    return(
        <div>
            <h1>{examData.subject_full}</h1>
            <h6>Course: {examData.subject_course}° Year</h6>
            <h6>{examData.date}</h6>
        </div>
    )
}

export default ExamGradingHeader