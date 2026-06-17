import { useState } from "react";

function StudentGradingForm({ StudentGradingData }){
    
    const [isAbsent, setIsAbsent] = useState(StudentGradingData.absent);
    const [grading, setGrading] = useState(StudentGradingData.exam_grading);
    const [isDeleted, setIsDeleted] = useState(false);

    
    const handleAbsentChange = (event) => {
        // Blocks the Grading input
        // and sets the checkbox
        setIsAbsent(event.target.checked);
    }

    const handleDelete = (event) => {
        // Sets styles to reflect student ready to be deleted
        // Sets the hidden input "deleted_" to true
        event.preventDefault();
        setIsDeleted(!isDeleted);
        // console.log("Deleted!");
    }

    
    return (
        <div
            className="mx-auto p-2 border-bottom"
            style={{maxWidth : "758px", width : "100%"}}
        >
            <div 
                className="row g-2 align-items-center text-start"
                name={ "student_" + StudentGradingData.id }
                id={ "student_" + StudentGradingData.id }
            >
                <div 
                    className="col-6 col-md-3 fw-semibold"
                    style={{textDecoration: isDeleted ? "line-through" : "none", color: isDeleted ? "red" : "black"}}
                >
                    { StudentGradingData.student_full_name }
                </div>
                <div className="col-md-2">
                    <input type="number" 
                        className="form-control"
                        name={ "grading_" + StudentGradingData.id }
                        id= {"grading_" + StudentGradingData.id }
                        value={ grading ? grading : "" }
                        placeholder="Grading"
                        disabled={ isAbsent || isDeleted }
                        style={{textDecoration: isAbsent || isDeleted ? "line-through" : "none"}}
                        onChange={(e) => setGrading(e.target.value)}
                        min="1"
                        max="10"
                        step="1"
                    />
                </div>
                <div className="col-md-2">
                    <input type="checkbox" 
                        className="form-check-input" 
                        id={"absent_" + StudentGradingData.id} 
                        name={"absent_" + StudentGradingData.id} 
                        checked={ isAbsent }
                        disabled={ isDeleted }
                        onChange={handleAbsentChange}
                    />
                    <label
                        className={`form-check-label ms-2 small ${isAbsent ? 'text-danger' : 'text-muted'}`}
                        style={{textDecoration: isAbsent ? "none" : "line-through" }}
                        htmlFor={"absent_" + StudentGradingData.id} >
                        Absent
                    </label>
                </div>
                <div className="col-md-2">
                    <button 
                        type="button" 
                        className={`btn btn-sm ${isDeleted ? 'btn-primary' : 'btn-danger'}`}
                        onClick={handleDelete}
                        >
                        { isDeleted ? "Undo" : "Delete" }
                    </button>
                    <input 
                        type="hidden" 
                        id={"deleted_" + StudentGradingData.id }
                        name={"deleted_" + StudentGradingData.id }
                        value={isDeleted && isDeleted ? "true" : "false"}
                    />
                </div>
            </div>
        </div>

    )
}

export default StudentGradingForm