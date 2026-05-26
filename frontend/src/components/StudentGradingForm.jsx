function StudentGradingForm({ StudentGradingData }){
    
    function handleGradingChange(){
        // Necesary for Input to work with initial value
    }

    function handleAbsentChange(){
        // ON TRUE: 
        // Empty the Grading
        // Lock the grading input
    }
    
    return (
        <div className="input-group">
            <span className="input-group-text">{ StudentGradingData.student_full_name }</span>
            <input type="number" 
                name={ "grading_" + StudentGradingData.id } 
                className="form-control"
                defaultValue={ StudentGradingData.exam_grading ? StudentGradingData.exam_grading : "" }
                // onChange={handleGradingChange}
                />
            <input type="checkbox" 
                name={"absent_" + StudentGradingData.id} 
                className="form-check-input" 
                checked={ !!StudentGradingData.absent }
                onChange={handleAbsentChange}
                />
        </div>
    )
}

export default StudentGradingForm