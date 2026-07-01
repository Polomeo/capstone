import { useContext } from "react"
import { IsEditingGradingsContext } from "../pages/GradingPage";

function EditGradingsButton(){
    
    const [isEditingGradings, setIsEditingGradings] = useContext(IsEditingGradingsContext);

    function handleAddButton(e){
        e.preventDefault();
        setIsEditingGradings(!isEditingGradings);
    }


    return(
        <button 
            type="button" 
            className="btn btn-info"
            onClick={(e) => handleAddButton(e)}>
            Edit Gradings
        </button>
    )
}

export default EditGradingsButton