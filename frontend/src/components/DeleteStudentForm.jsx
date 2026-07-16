import { cache, useContext, useState } from "react";
import { replace, useNavigate } from "react-router-dom";

import { IsDeletingStudentContext, StudentPersonalDataContext } from "../pages/ProfilePage";
import ErrorsList from "./ErrorsList";

function DeleteStudentForm(){
    const [personalData, setPersonalData] = useContext(StudentPersonalDataContext);
    const [isDeleting, setIsDeleting] = useContext(IsDeletingStudentContext);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    
    function handleCancelButton(event) {
        event.preventDefault();
        setIsDeleting(false);
    }
    
    function handleDelete(event) {
        event.preventDefault();
        
        // Get the Form Data
        const formData = new FormData(event.currentTarget);

        // Call the API and send the student
        fetch(`http://localhost:8000/api/delete_student`, {
            method: 'POST',
            credentials : 'include',
            body: JSON.stringify({
                studentId : personalData.id,
                studentPersonalId : formData.get("student_personal_id"),
            }),
            cache: 'reload',
        })
        .then(res => {
            if(res.status === 401) {
                console.log('Status 401: NOT LOGGED IN')
                return null // If this return is not present, the next fails
            }
            return res.json()
        })
        .then(response => {
            if(response.errors){
                
                // // Add them to the error state
                // let errorsResponse = [];

                // for (const errorCode in response.errors) {
                //     errorsResponse.push(response.errors[errorCode]);
                // }
                setErrors([response.errors]);
                console.log("Errors: " + errors);
            }
            else if (response.success){
                console.log("Student deleted.");
                setIsDeleting(false);
                // Navigate to students list
                navigate('/', {"replace" : true});
            }
        })
        .catch(error => console.error('Error: ', error))
    }

    
    return (
        <form 
            onSubmit={(e) => handleDelete(e)} 
            className="border border-info rounded col-md-10" 
            style={{padding: "10px", margin: "10px 0"}}
        >
            <div className="row">
                <span style={{fontStyle: "italic", fontSize: "1.5em", color: "red"}}>Delete student</span>
            </div>
            <div className="row">
                <div className="form-group col-md-8">
                    <p><strong>Deleting the student will remove all of it's gradings as well. This action <u>can not be undone</u>.</strong></p>
                    <label>Please write the student's personal ID number to confirm:</label>
                    <input 
                        name="student_personal_id" 
                        type="number" 
                        className="form-control" 
                        required
                        autoFocus/>
                </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-6">
                        { errors.length > 0 && ( <ErrorsList errorsList={errors} /> )}
                    </div>
                </div>
            <div className="row" style={{padding: "10px"}}>
                <div className="btn-group col-md-3">
                    <button 
                        type="submit" 
                        className="btn btn-warning"
                        >
                        Confirm delete student
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
        </form>
    )
}

export default DeleteStudentForm