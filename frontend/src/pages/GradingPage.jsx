import StudentGradingForm from "../components/StudentGradingForm"
import GradingExamContextProvider from "../contexts/GradingExamContextProvider"

function GradingPage(){

    const testExamData = [
        {"id" : 1 , "student_full_name" : "Dumbledore, Albus", "exam_grading" : 10, "absent" : false },
        {"id" : 4 , "student_full_name" : "Riddle, Thomas", "absent" : true },
        {"id" : 3 , "student_full_name" : "McGonnagal, Minerva", "absent" : true },
    ]

    return(
        <div className="container">
            <GradingExamContextProvider>
                Hello from Grading Page
                <form className="form-inline">
                    {testExamData.map((examData) => (
                        <StudentGradingForm StudentGradingData={examData} key={examData.id} />
                    ))}
                </form>
            </GradingExamContextProvider>
        </div>
    )
}

export default GradingPage