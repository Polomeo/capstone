import StudentGradingForm from "../components/StudentGradingForm"

function GradingPage(){

    const testExamData = [
        {"id" : 1 , "student_full_name" : "Dumbledore, Albus", "exam_grading" : 10, "absent" : false },
        {"id" : 2 , "student_full_name" : "Riddle, Thomas", "absent" : true },
        {"id" : 3 , "student_full_name" : "McGonnagal, Minerva", "absent" : true },
    ]

    return(
        <div className="container">
            Hello from Grading Page
            <form>
                {testExamData.map((examData) => (
                    <StudentGradingForm StudentGradingData={examData} key={examData.id} />
                ))}
            </form>
        </div>
    )
}

export default GradingPage