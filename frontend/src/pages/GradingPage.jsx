import { useParams } from "react-router-dom" // for using URL parameters

// Components
import ExamGradingTable from "../components/ExamGradingTable"
import StudentGradingForm from "../components/StudentGradingForm"

// Contexts
import GradingExamContextProvider from "../contexts/GradingExamContextProvider"
import ExamGradingHeader from "../components/ExamGradingHeader";

function GradingPage(){

    const { id } = useParams();

    return(
        <div className="container">
            <GradingExamContextProvider>
                <ExamGradingHeader examId={ id } />
                <ExamGradingTable examId={ id } />
            </GradingExamContextProvider>
        </div>
    )
}

export default GradingPage