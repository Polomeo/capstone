import { useContext, useEffect, useState } from "react"
import { GradingExamContext } from "../contexts/GradingExamContextProvider";

import StudentGradingForm from "./StudentGradingForm";
import { Link } from "react-router-dom";

function ExamGradingForm({ examId }){
    
    const [gradingData, setGradingData] = useContext(GradingExamContext);
    const [errors, setErrors] = useState([]);

    // Fetch the data
    // BUG - This is duplicated code (see ExamGradingHeader)
    // Maybe can be moved to GradingPage and drill the object
    useEffect(() => {
        fetch(`http://localhost:8000/api/grading_info/${examId}`)
        .then(res => res.json())
        .then(data => {
            setGradingData(data.grading_data);
        })
        .catch(error => console.error('Error: ', error));
    }, [])

    function handleCancelButton(event) {
        event.preventDefault();
        // Redirect to exams list page
    }
    
    function handleSave(event) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        // Iterate through each original studentGrade
        // and update the data with the formData
        const updatedGradingData = gradingData.map((studentGrade) => {
            // Since the HTML inputs has the student ID in them
            // we store the value here
            const id = studentGrade.id;
            
            // We use "has" here because, if disabled, it wont show up.
            const isAbsent = formData.has(`absent_${id}`) ? 'true' : 'false'; // Make sure is TRUE or FALSE
            // Deleted is a hidden input that is always sent
            const isDeleted = formData.get(`deleted_${id}`);
            // Grading could be "null" if absent or deleted
            const grading = formData.get(`grading_${id}`);


            return {
                ...studentGrade,
                new_absent: isAbsent,
                deleted: isDeleted, // this field is added
                new_exam_grading : grading ? Number(grading) : null
            };
        });

        // console.log(gradingData);
        // console.log(updatedGradingData);

        // Send the data to API
        fetch(`http://localhost:8000/api/update_gradings`, {
            method: 'POST',
            body: JSON.stringify(updatedGradingData),
            cache: 'reload',
        })
        .then(res => res.json())
        .then(response => {
            if(response.errors){
                // Add them to error state
                let errorsResponse = [];

                for (const errorCode in response.errors){
                    errorsResponse.push(response.errors[errorCode])
                }

                setErrors(errorsResponse);
                console.log("Errors: " + errors);
            }
            else if (response.success){
                console.log(response.success);

                // Set view mode
            }
        })
        .catch(error => console.error("Error: ", error))
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
                >
                Save
                </button>
            </div>
        </form>
    )
}

export default ExamGradingForm