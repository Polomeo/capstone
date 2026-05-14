import { useContext, useState } from "react"
import { IsAddingStudentContext } from "../pages/StudentsPage"
import ErrorsList from "./ErrorsList";

function AddStudentForm() {
    
    const [isAddingStudent, setIsAddingStudent] = useContext(IsAddingStudentContext);
    const [errors, setErrors] = useState([]);
    
    function handleCancelButton(event) {
        event.preventDefault();
        setIsAddingStudent(!isAddingStudent);
    }
    
    function handleEnroll(event) {
        event.preventDefault();
        
        // Get the Form Data
        const formData = new FormData(event.currentTarget);

        // Call the API and send the student
        fetch(`http://localhost:8000/api/add_student`, {
            method: 'POST',
            body: JSON.stringify({
                lastName : formData.get("last_name"),
                firstName : formData.get("first_name"),
                personalIdNumber : formData.get("personal_id_number"),
                enrollYear : formData.get("enroll_year"),
                enrollId : formData.get("enroll_id"),
            })
        })
        .then(res => res.json())
        .then(response => {
            if(response.errors){
                // Show them in the form
                console.log(response.errors)
                
                let errorsResponse = []
                // response.errors.forEach(error => {
                //     errors.push(error);
                //     }
                // )
                for (const errorCode in response.errors) {
                    errorsResponse.push(response.errors[errorCode]);
                    // console.log(response.errors[errorCode]);
                    // console.log(errorsResponse);
                }

                setErrors(errorsResponse);
            }
            else if (response.success){
                console.log("Student added.");
                
                // Hide the form and reload List
                setIsAddingStudent(false);
            }
        })
        .catch(error => console.error('Error: ', error))
    }

  
    return (
        <form onSubmit={(e) => handleEnroll(e)} className="border border-info rounded" style={{padding: "10px", margin: "10px 0"}}>
            <div className="row">
                <div className="form-group col-md-3">
                    <label>Last name</label>
                    <input name="last_name" type="text" className="form-control" placeholder="Last name" autoFocus/>
                </div>
                <div className="form-group col-md-3">
                    <label>First name</label>
                    <input name="first_name" type="text" className="form-control" placeholder="First name" />
                </div>
                <div className="form-group col-md-2">
                    <label>Personal ID Number</label>
                    <input name="personal_id_number" type="number" className="form-control" placeholder="11222333" />
                </div>
                <div className="form-group col-md-2">
                    <label>Enroll Year</label>
                    <input name="enroll_year" type="number" className="form-control" placeholder="2026" />
                </div>
                <div className="form-group col-md-2">
                    <label>Enroll ID Number</label>
                    <input name="enroll_id" type="number" className="form-control" placeholder="123" />
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
                        // onClick={(e) => handleEnroll(e)}
                        >Enroll</button>
                    <button 
                        className="btn btn-danger" 
                        style={{marginLeft: "10px"}}
                        onClick={(e) => handleCancelButton(e)}
                        >Cancel</button>
                </div>
            </div>
        </form>
    )
}

export default AddStudentForm