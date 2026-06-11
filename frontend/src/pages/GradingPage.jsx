import { useParams } from "react-router-dom"

// Components
import ExamGradingTable from "../components/ExamGradingTable"
import StudentGradingForm from "../components/StudentGradingForm"

// Contexts
import GradingExamContextProvider from "../contexts/GradingExamContextProvider"

function GradingPage(){

    const { id } = useParams();

    return(
        <div className="container">
            <GradingExamContextProvider>
                Hello from Grading Page
                <ExamGradingTable examId={ id } />
            </GradingExamContextProvider>
        </div>
    )
}

export default GradingPage