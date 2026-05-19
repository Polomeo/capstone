import { useContext } from "react"
import { IsAddingExamContext } from "../pages/ExamsPage"

function AddExamButton(){

    const [isAddingExam, setIsAddingExam] = useContext(IsAddingExamContext);

    function handleAddExamButton(e){
        e.preventDefault();
        setIsAddingExam(!isAddingExam);
        // console.log("IS ADDING EXAM");
    }

    return(
        <button 
            type="button" 
            className="btn btn-warning"
            onClick={(e) => handleAddExamButton(e)}>
            + Add Exam
        </button>
    )
}

export default AddExamButton