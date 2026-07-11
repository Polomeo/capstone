import { cache, useContext, useEffect, useState } from "react"
import ErrorsList from "./ErrorsList";

// Contexts
import { IsAddingExamContext } from "../pages/ExamsPage";

function AddExamForm() {
    
    const [isAddingExam, setIsAddingExam] = useContext(IsAddingExamContext);
    const [examData, setExamData] = useState(null);
    const [errors, setErrors] = useState([]);
    
    // Load the form configuration
    useEffect(() => {
        fetch('http://localhost:8000/api/create_exam_form_info', {
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
            setExamData(data);
            console.log(data);
        })
    },[])
    
    function handleCancelButton(event) {
        event.preventDefault();
        setIsAddingExam(!setIsAddingExam);
    }
    
    // TO UPDATE
    function handleCreateExam(event) {
        event.preventDefault();

        // Get the Form Data
        const formData = new FormData(event.currentTarget);

        // Call the API and send the student
        fetch(`http://localhost:8000/api/add_exam`, {
            method: 'POST',
            body: JSON.stringify({
                subjectId : formData.get("subject_select"),
                examDate : formData.get("exam_date"),
            }),
            cache: 'reload',
        })
        .then(res => res.json())
        .then(response => {
            if(response.errors){
                
                // Add them to the error state
                let errorsResponse = []

                for (const errorCode in response.errors) {
                    errorsResponse.push(response.errors[errorCode]);
                }

                setErrors(errorsResponse);
            }
            else if (response.success){
                console.log("Exam added.");
                
                // Hide the form and reload List
                setIsAddingExam(false);
            }
        })
        .catch(error => console.error('Error: ', error))
    }

  
    return (
        // onSubmit={(e) => handleCreateExam(e)}
        <form onSubmit={(e) => handleCreateExam(e)} className="border border-info rounded" style={{padding: "10px", margin: "10px 0"}}>
            <div className="row">
                <div className="form-group col-md-4">
                    <label>Subject</label>
                    <select 
                        name="subject_select"
                        className="form-select" 
                        aria-label="Subject select dropdown">
                        <option value="0">Select the subject...</option>
                        {(examData !== null) ? (examData.subjects.map((subject) => 
                            <option key={subject.id} value={subject.id}>{subject.name_short}</option>
                            )) : undefined}
                    </select>
                </div>
                <div className="form-group col-md-3">
                    <label>Exam date</label>
                    <input 
                        name="exam_date" 
                        type="date" 
                        className="form-control" 
                        min={(examData !== null) ? (examData.min_exam_date) : undefined}
                        max={(examData !== null) ? (examData.max_exam_date) : undefined} />
                </div>
            </div>
                <div className="row">
                    <div className="form-group col-md-6">
                        { errors.length > 0 && ( <ErrorsList errorsList={errors} /> )}
                    </div>
                </div>
            <div className="row" style={{padding: "10px"}}>
                <div className="form-group col-md-2">
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        // Handled by "onSubmit" in form tag
                        >Create exam</button>
                </div>
                <div className="form-group col-md-2">
                    <button 
                        className="btn btn-danger" 
                        style={{marginLeft: "10px"}}
                        onClick={(e) => handleCancelButton(e)}
                        >Cancel
                    </button>
                </div>
            </div>
        </form>
    )
}

export default AddExamForm