// Components
import ExamGradingTable from "../components/ExamGradingTable"
import StudentGradingForm from "../components/StudentGradingForm"

// Contexts
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
                <ExamGradingTable examId="1" />
            </GradingExamContextProvider>
        </div>
    )
}

export default GradingPage