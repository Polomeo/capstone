import { useContext } from "react"
import { IsAddingStudentContext } from "../pages/StudentsPage"

function AddStudentButton(){
    
    const [isAddingStudent, setIsAddingStudent] = useContext(IsAddingStudentContext);

    function handleAddButton(e){
        e.preventDefault();
        setIsAddingStudent(!isAddingStudent);
    }


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