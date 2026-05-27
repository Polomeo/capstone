import { useState } from "react";

function StudentGradingForm({ StudentGradingData }){
    
    const [isAbsent, setIsAbsent] = useState(StudentGradingData.absent);
    const [grading, setGrading] = useState(StudentGradingData.exam_grading);

    
    const handleAbsentChange = (event) => {
        setGrading("");
        setIsAbsent(!isAbsent);
    }
    
    return (
        <div className="input-group">
            <span className="input-group-text">{ StudentGradingData.student_full_name }</span>
            <input type="number" 
                name={ "grading_" + StudentGradingData.id } 
                className="form-control"
                value={ grading }
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