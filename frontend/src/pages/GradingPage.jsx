import { useParams } from "react-router-dom" // for using URL parameters
import { createContext, useState } from "react";

// Components
import ExamGradingHeader from "../components/ExamGradingHeader";
import ExamGradingForm from "../components/ExamGradingForm"

// Contexts
import GradingExamContextProvider from "../contexts/GradingExamContextProvider"
import ExamGradingList from "../components/ExamGradingList";

export const IsEditingGradingsContext = createContext();

function GradingPage(){

    // This comes from the URL (.../grading/1)
    const { id } = useParams();
    const [isEditingGradings, setIsEditingGradings] = useState(false);


    return(
        <div className="container">
            <GradingExamContextProvider>
                <ExamGradingHeader examId={ id } />
                <div>
                    {(isEditingGradings) && <ExamGradingForm examId={ id } />}
                    {(!isEditingGradings) && <ExamGradingList examId={ id } />}
                </div>
            </GradingExamContextProvider>
        </div>
    )
}

export default GradingPage