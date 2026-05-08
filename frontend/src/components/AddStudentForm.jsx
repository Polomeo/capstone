import { useContext } from "react"
import { IsAddingStudentContext } from "../pages/StudentsPage"

function AddStudentForm() {
    
    const [isAddingStudent, setIsAddingStudent] = useContext(IsAddingStudentContext);
    
    function handleCancelButton(event) {
        event.preventDefault();
        setIsAddingStudent(!isAddingStudent);
    }
    
    function handleEnroll(event) {
        event.preventDefault();
        
        // We create the a FromData object here 
        // instead of using "action" on form
        // to allow ourselfs to use event.
        const formData = new FormData(event.currentTarget);

        // const sanitizedData = validateNewStudentData(formData)

        // if(sanitizedData.error){
        //     alert("Error: " + sanitizedData.error);
        // }
        // else{
        //     alert("Success:");
        // }

        // Validation now occurs in server side


    }

    // DEPRECATED -> DELETE (Validation occurs in server side)
    function validateNewStudentData(formData) {
        
        let sanitizedData = {}
        
        const lastName = formData.get("last_name");
        const firstName = formData.get("first_name");
        const personalIdNumber = parseInt(formData.get("personal_id_number"));
        const enrollYear = parseInt(formData.get("enroll_year"));
        const enrollId = parseInt(formData.get("enroll_id"));

        // Sanitize Last name
        if(lastName.length > 30 || lastName.length < 2)
            {
            sanitizedData["error"] = "Last name must be between 2 and 30 characters."
        } else {
            sanitizedData["lastName"] = lastName
        }

        // Sanitize Fist name
        if(firstName.length > 30 || firstName.length < 2) {
            sanitizedData["error"] = "First name must be between 2 and 30 characters."
        } else {
            sanitizedData["firstName"] = firstName
        }

        // Sanitize personal id number
        if(personalIdNumber < 1000000
            || personalIdNumber > 99999999) {
            sanitizedData["error"] = "Personal ID number must be between 1.000.000 and 99.999.999";
        }
        else {
            sanitizedData["personalIdNumber"] = personalIdNumber;
        }

        // Sanitize enroll year
        if(enrollYear < 2020 || enrollYear > 2026){
            sanitizedData["error"] = "Enroll Year must be between 2020 and 2026"
        } else {
            sanitizedData["enrollYear"] = enrollYear;
        }

        // Enroll id number could stay blank
        sanitizedData["enrollId"] = enrollId

        return sanitizedData
    }

    return (
        <form onClick={handleEnroll} className="border border-info rounded" style={{padding: "10px", margin: "10px 0"}}>
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
                    <input name="personal_id_number" type="number" className="form-control" placeholder="11.222.333" />
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
            <div className="row" style={{padding: "10px"}}>
                <div className="form-group col-md-2">
                    <button 
                        type="submit" 
                        className="btn btn-primary"
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