function ExamGradingAddStudentForm({ StudentData }){

    // List the students and a Checkbox to add to exam

    // THIS WILL WORK LIKE ExamGradingForm and StudentGradingForm

    const [alreadyInExam, setAlreadyInExam] = useState(false);

    return (
        <div
            className="mx-auto p-2 border-bottom"
            style={{maxWidth : "758px", width : "100%"}}
        >
            <div 
                className="row g-2 align-items-center text-start"
                name={ "student_" + StudentData.id }
                id={ "student_" + StudentData.id }
            >
                <div 
                    className="col-6 col-md-3 fw-semibold"
                    style={{textDecoration: alreadyInExam ? "line-through" : "none", color: alreadyInExam ? "grey" : "black"}}
                >
                    { StudentData.student_full_name }
                </div>
                
                <div className="col-md-2">
                    <input type="checkbox" 
                        className="form-check-input" 
                        id={"to_add_" + StudentData.id} 
                        name={"to_add_" + StudentData.id} 
                        checked={ alreadyInExam }
                        disabled={ alreadyInExam }
                        // onChange={handleAbsentChange}
                    />
                    <label
                        className={`form-check-label ms-2 small ${alreadyInExam ? 'text-info' : 'text-muted'}`}
                        // style={{textDecoration: alreadyInExam ? "none" : "line-through" }}
                        htmlFor={"to_add_" + StudentData.id} >
                        Added
                    </label>
                </div>
            </div>
        </div>
    )
}

export default ExamGradingAddStudentForm