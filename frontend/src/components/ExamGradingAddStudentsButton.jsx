import { useContext } from "react";
import { IsAddingStudentsContext } from "../pages/GradingPage";

function ExamGradingAddStudentsButton(){

    const [isAddingStudentsToExam, setIsAddingStudentsToExam] = useContext(IsAddingStudentsContext);

    function handleAddButton(e){
        e.preventDefault();
        setIsAddingStudentsToExam(true);
    }

    return(
        <button 
            type="button" 
            className="btn btn-info"
            onClick={(e) => handleAddButton(e)}>
            + Add Students to exam
        </button>
    )
}

export default ExamGradingAddStudentsButton