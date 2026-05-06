import { useContext } from "react"
import { IsAddingStudentContext } from "../pages/StudentsPage"

function AddStudentButton(){

    function handleAddButton(){
        setIsAddingStudent(!isAddingStudent);
    }

    const [isAddingStudent, setIsAddingStudent] = useContext(IsAddingStudentContext);

    return(
        <button 
            type="button" 
            className="btn btn-info"
            onClick={handleAddButton}>
            + Add Student
        </button>
    )
}

export default AddStudentButton