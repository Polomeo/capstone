import ExamGradingAddStudentForm from "./ExamGradingAddStudentForm";



function ExamGradingAddStudentList({examId}){

    const studentData = [
        {'id': 1, 'student_full_name': "Potter, Harry", 'already_in_exam': true, 'already_approved': false},
        {'id': 2, 'student_full_name': "Weasley, Charlie", 'already_in_exam': true, 'already_approved': true},
        {'id': 3, 'student_full_name': "Dumbledore, Albus", 'already_in_exam': false, 'already_approved': true},
        {'id': 4, 'student_full_name': "Abbot, Anna", 'already_in_exam': false, 'already_approved': false},
    ]

    function handleAdd(e){
        e.preventDefault();
        console.log("Students added.")
    }

    return (
        <form 
            onSubmit={(e) => handleAdd(e)}
            className="form-inline"
        >
        <div>
            {studentData.map((student) => (
                <ExamGradingAddStudentForm StudentData={student} key={student.id} />
            ))}
        </div>
        </form>
    )

}

export default ExamGradingAddStudentList