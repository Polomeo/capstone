import { useContext } from "react"
import { IsAddingStudentContext } from "../pages/StudentsPage"

function AddStudentButton(){

    function handleAddButton(e){
        e.preventDefault();
        setIsAddingStudent(!isAddingStudent);
    }

    const [isAddingStudent, setIsAddingStudent] = useContext(IsAddingStudentContext);

    return(
        <button 
            type="button" 
            className="btn btn-info"
            onClick={(e) => handleAddButton(e)}>
            + Add Student
        </button>
    )
}

export default AddStudentButton