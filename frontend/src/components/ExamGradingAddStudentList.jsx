import ExamGradingAddStudentForm from "./ExamGradingAddStudentForm";



function ExamGradingAddStudentList({examId}){

    const studentData = [
        {'id': 1, 'student_full_name': "Potter, Harry", 'already_in_exam': true, 'already_approved': false},
        {'id': 2, 'student_full_name': "Weasley, Charlie", 'already_in_exam': true, 'already_approved': true},
        {'id': 3, 'student_full_name': "Dumbledore, Albus", 'already_in_exam': false, 'already_approved': true},
        {'id': 4, 'student_full_name': "Abbot, Anna", 'already_in_exam': false, 'already_approved': false},
    ]

    function handleCancelButton(event){
        event.preventDefault();
        console.log("Canceled.")
    }
    
    function handleAddStudents(event){
        e.preventDefault();
        console.log("Students added.")

        const formData = new FormData(event.currentTarget);

    }

    return (
        <form 
            onSubmit={(e) => handleAddStudents(e)}
            className="form-inline"
        >
        <div>
            {studentData.map((student) => (
                <ExamGradingAddStudentForm StudentData={student} key={student.id} />
            ))}
        </div>
        <div className="form-group col-md-4">
            <button 
                className="btn btn-danger"
                onClick={(e) => handleCancelButton(e)}>
            Cancel
            </button>
            <button
                className="btn btn-primary"
                type="submit">
            Add students to exam
            </button>
        </div>
        </form>
    )

}

export default ExamGradingAddStudentList