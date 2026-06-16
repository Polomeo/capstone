import { useParams } from "react-router-dom" // for using URL parameters

// Components
import ExamGradingHeader from "../components/ExamGradingHeader";
import ExamGradingForm from "../components/ExamGradingForm"

// Contexts
import GradingExamContextProvider from "../contexts/GradingExamContextProvider"

function GradingPage(){

    // This comes from the URL (.../grading/1)
    const { id } = useParams();

    return(
        <div className="container">
            <GradingExamContextProvider>
                <ExamGradingHeader examId={ id } />
                <ExamGradingForm examId={ id } />
            </GradingExamContextProvider>
        </div>
    )
}

export default GradingPage