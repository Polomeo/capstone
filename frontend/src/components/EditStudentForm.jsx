import { cache, useContext, useState } from "react"
import ErrorsList from "./ErrorsList";

function EditStudentForm({ studentPersonalData }) {
    
    const [personalData, setPersonalData] = useState(studentPersonalData);
    const [errors, setErrors] = useState([]);
    
    function handleCancelButton(event) {
        event.preventDefault();
    }
    
    function handleEdit(event) {
        event.preventDefault();
        
        // Get the Form Data
        const formData = new FormData(event.currentTarget);

        // Call the API and send the student
        fetch(`http://localhost:8000/api/edit_student`, {
            method: 'POST',
            credentials : 'include',
            body: JSON.stringify({
                studentId : studentPersonalData.id,
                lastName : formData.get("last_name"),
                firstName : formData.get("first_name"),
                personalIdNumber : formData.get("personal_id_number"),
                enrollYear : formData.get("enroll_year"),
                enrollId : formData.get("enroll_id"),
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
                
                // Add them to the error state
                let errorsResponse = [];

                for (const errorCode in response.errors) {
                    errorsResponse.push(response.errors[errorCode]);
                }
                setErrors(errorsResponse);
                console.log("Errors: " + errors);
            }
            else if (response.success){
                console.log("Student edit saved.");
            }
        })
        .catch(error => console.error('Error: ', error))
    }

  
    return (
        <form 
            onSubmit={(e) => handleEdit(e)} 
            className="border border-info rounded" 
            style={{padding: "10px", margin: "10px 0"}}
        >
            <div className="row">
                <div className="form-group col-md-3">
                    <label>Last name</label>
                    <input 
                        name="last_name" 
                        type="text" 
                        className="form-control" 
                        defaultValue={personalData.last_name} autoFocus/>
                </div>
                <div className="form-group col-md-3">
                    <label>First name</label>
                    <input 
                        name="first_name" 
                        type="text" 
                        className="form-control" 
                        defaultValue={personalData.first_name} />
                </div>
                <div className="form-group col-md-2">
                    <label>Personal ID Number</label>
                    <input 
                        name="personal_id_number" 
                        type="number" 
                        className="form-control" 
                        defaultValue={personalData.personal_id} />
                </div>
                <div className="form-group col-md-2">
                    <label>Enroll Year</label>
                    <input 
                        name="enroll_year" 
                        type="number" 
                        className="form-control" 
                        defaultValue={personalData.enroll_year} />
                </div>
                <div className="form-group col-md-2">
                    <label>Enroll ID Number</label>
                    <input 
                        name="enroll_id" 
                        type="number" 
                        className="form-control" 
                        defaultValue={personalData.enroll_id} />
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
                        className="btn btn-primary"
                        >
                        Save changes
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

export default EditStudentForm