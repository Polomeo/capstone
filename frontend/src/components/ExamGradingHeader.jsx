import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function ExamGradingHeader({ examId }){

    const [examData, setExamData] = useState({});
    const [isDeletingExam, setIsDeletingExam] = useState(false);
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

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

    // Delete button
    function deleteExamButton(event){
        event.preventDefault();
        setIsDeletingExam(true);
    }

    // Delete exam
    function handleDeleteExam(event){
        event.preventDefault();
        console.log("Delete exam pressed.");

        fetch(`http://localhost:8000/api/delete_exam`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                examToDeleteId : examId,
            }),
            cache: 'reload',
        })
        .then(res => {
            if(res.status === 401) {
                console.log('Status 401: NOT LOGGED IN')
                return null // If this return is not present, the next fails
            }
            return res.json();
        })
        .then(response => {
            if(response.errors){
                // Add them to the error state
                let errorsResponse = [];

                for (const errorCode in response.errors) {
                    errorsResponse.push(response.errors[errorCode]);
                }

                setErrors(errorsResponse);
            }
            else if(response.success){
                console.log('Exam deleted.');
                // Redirect to exams page
                navigate('/exams', { replace : true });
            }
        })
    }

    // Cancel delete
    function handleCancelButton(event){
        event.preventDefault();
        setIsDeletingExam(false);
        // console.log("Delete canceled.");
        
    }

    return(
        <div className="exam-header">
            <div className="exam-data container">
                <div className="row">
                    <div className="col-md-4">
                        <h1>{examData.subject_full}</h1>
                        <h6>Course: {examData.subject_course}° Year</h6>
                        <h6>{examData.date}</h6>
                    </div>
                    <div className="col-md-2">
                        {(!isDeletingExam) && <button onClick={(e) => deleteExamButton(e)} className="btn btn-warning">Delete exam</button>}
                    </div>
                </div>
            </div>
            {(isDeletingExam) &&
            <div className="exam-delete border border-warning rounded">
                <div className="row" style={{padding: "10px"}}>
                    <div className="col-md-6">
                        <h6>Are you sure you want to delete this exam and all it's gradings?</h6>
                        <div className="btn-group col-md-2">
                            <button 
                                className="btn btn-warning"
                                onClick={(e) => handleDeleteExam(e)}
                                >
                                Confirm
                            </button>
                            <button 
                                className="btn btn-danger" 
                                style={{marginLeft: "10px"}}
                                onClick={(e) => handleCancelButton(e)}
                                >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}

export default ExamGradingHeader