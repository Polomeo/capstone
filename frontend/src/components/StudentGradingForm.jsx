import { useState } from "react";

function StudentGradingForm({ StudentGradingData }){
    
    const [isAbsent, setIsAbsent] = useState(StudentGradingData.absent);
    const [grading, setGrading] = useState(StudentGradingData.exam_grading);

    
    const handleAbsentChange = (event) => {
        // Blocks the Grading input
        // and sets the checkbox
        setIsAbsent(event.target.checked);
        
        if(event.target.checked) {
            setGrading("");    
        }
        else {
            setGrading(lastGrading);
        }
    }
    
    return (
        <div className="input-group">
            <span className="input-group-text">{ StudentGradingData.student_full_name }</span>
            <input type="number" 
                name={ "grading_" + StudentGradingData.id } 
                className="form-control"
                value={ lastGrading }
                disabled={ isAbsent }
                onChange={(e) => setGrading(e.target.value)}
                />
            <input type="checkbox" 
                name={"absent_" + StudentGradingData.id} 
                className="form-check-input" 
                checked={ isAbsent }
                onChange={handleAbsentChange}
                />
        </div>
    )
}

export default StudentGradingForm