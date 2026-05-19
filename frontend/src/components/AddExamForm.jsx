import { cache, useContext, useState } from "react"
import ErrorsList from "./ErrorsList";

// Contexts
import { IsAddingExamContext } from "../pages/ExamsPage";

function AddExamForm() {
    
    const [isAddingExam, setIsAddingExam] = useContext(IsAddingExamContext);
    const [errors, setErrors] = useState([]);
    
    function handleCancelButton(event) {
        event.preventDefault();
        setIsAddingExam(!setIsAddingExam);
    }
    
    // TO UPDATE
    function handleCreateExam(event) {
        event.preventDefault();
        
        // TESTING
        // alert('Exam loaded!');
        setIsAddingExam(false);
        
        // // Get the Form Data
        // const formData = new FormData(event.currentTarget);

        // // Call the API and send the student
        // fetch(`http://localhost:8000/api/add_exam`, {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         lastName : formData.get("last_name"),
        //         firstName : formData.get("first_name"),
        //         personalIdNumber : formData.get("personal_id_number"),
        //         enrollYear : formData.get("enroll_year"),
        //         enrollId : formData.get("enroll_id"),
        //     }),
        //     cache: 'reload',
        // })
        // .then(res => res.json())
        // .then(response => {
        //     if(response.errors){
                
        //         // Add them to the error state
        //         let errorsResponse = []

        //         for (const errorCode in response.errors) {
        //             errorsResponse.push(response.errors[errorCode]);
        //         }

        //         // Clean and add the recent errors
        //         // setErrors([]);
        //         setErrors(errorsResponse);
        //         console.log("Errors: " + errors);
        //     }
        //     else if (response.success){
        //         console.log("Student added.");
                
        //         // Hide the form and reload List
        //         setIsAddingStudent(false);
        //     }
        // })
        // .catch(error => console.error('Error: ', error))
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
                        <option selected>Select the subject...</option>
                        <option value="1">DADA I</option>
                        <option value="2">DADA II</option>
                        <option value="3">DIVINATION</option>
                    </select>
                </div>
                <div className="form-group col-md-3">
                    <label>Exam date</label>
                    <input 
                        name="exam_date" 
                        type="date" 
                        className="form-control" 
                        min="2025-01-01"
                        max="2026-05-19" />
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