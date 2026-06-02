import { useState } from "react";

function StudentGradingForm({ StudentGradingData }){
    
    const [isAbsent, setIsAbsent] = useState(StudentGradingData.absent);
    const [grading, setGrading] = useState(StudentGradingData.exam_grading);

    
    const handleAbsentChange = (event) => {
        // Blocks the Grading input
        // and sets the checkbox
        setIsAbsent(event.target.checked);
    }

    
    return (
        <div
            className="mx-auto p-2 border-bottom"
            style={{maxWidth : "758px", width : "100%"}}
            >
            <div className="row g-2 align-items-center text-start">
                <div className="col-6 col-md-3 fw-semibold">
                    { StudentGradingData.student_full_name }
                </div>
                <div className="col-md-2">
                    <input type="number" 
                        className="form-control"
                        name={ "grading_" + StudentGradingData.id } 
                        value={ grading ? grading : "" }
                        placeholder="Grading"
                        disabled={ isAbsent }
                        style={{textDecoration: isAbsent ? "line-through" : "none"}}
                        onChange={(e) => setGrading(e.target.value)}
                        min="1"
                        max="10"
                        step="1"
                    />
                </div>
                <div className="col-md-4">
                    <input type="checkbox" 
                        className="form-check-input" 
                        id={"absent_" + StudentGradingData.id} 
                        name={"absent_" + StudentGradingData.id} 
                        checked={ isAbsent }
                        onChange={handleAbsentChange}
                    />
                    <label
                        className={`form-check-label ms-2 small ${isAbsent ? 'text-danger' : 'text-muted'}`}
                        htmlFor={"absent_" + StudentGradingData.id} >
                        Absent
                    </label>
                </div>
            </div>
        </div>

    )
}

export default StudentGradingForm