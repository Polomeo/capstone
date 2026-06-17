import { useContext, useEffect } from "react"
import { GradingExamContext } from "../contexts/GradingExamContextProvider";

import StudentGradingForm from "./StudentGradingForm";
import { Link } from "react-router-dom";

function ExamGradingForm({ examId }){
    
    const [gradingData, setGradingData] = useContext(GradingExamContext)

    // Fetch the data
    // BUG - This is duplicated code (see ExamGradingHeader)
    // Maybe can be moved to GradingPage and drill the object
    useEffect(() => {
        fetch(`http://localhost:8000/api/grading/${examId}`)
        .then(res => res.json())
        .then(data => {
            setGradingData(data.grading_data);
            // console.log(data.grading_data);
        })
        .catch(error => console.error('Error: ', error));
    }, [])

    function handleCancelButton(event) {
        event.preventDefault();
        // Redirect to exams list page
    }
    
    function handleSave(event) {
        
    }


    return(
        <form
            onSubmit={(e) => handleSave(e)}
            className="form-inline"
        >
            <div>
                {gradingData.map((examData) => (
                    <StudentGradingForm StudentGradingData={examData} key={examData.id} />
                ))}
            </div>
            <div className="form-group col-md-2">
                <button className="btn btn-danger">
                    <Link to="/exams">Cancel</Link>
                </button>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    // onClick={(e) => handleEnroll(e)}
                >
                Save
                </button>
            </div>
        </form>
    )
}

export default ExamGradingForm