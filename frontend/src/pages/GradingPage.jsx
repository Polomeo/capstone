import { useParams } from "react-router-dom" // for using URL parameters
import { createContext, useState } from "react";

// Components
import ExamGradingHeader from "../components/ExamGradingHeader";
import ExamGradingList from "../components/ExamGradingList";
import ExamGradingForm from "../components/ExamGradingForm"
import EditGradingsButton from "../components/EditGradingsButton"

// Contexts
import GradingExamContextProvider from "../contexts/GradingExamContextProvider"

export const IsEditingGradingsContext = createContext();


function GradingPage(){

    // This comes from the URL (.../grading/1)
    const { id } = useParams();
    const [isEditingGradings, setIsEditingGradings] = useState(false);


    return(
        <div className="container">
            <GradingExamContextProvider>
                <ExamGradingHeader examId={ id } />
                <IsEditingGradingsContext.Provider value={[isEditingGradings, setIsEditingGradings]}>
                    <div>
                        {(!isEditingGradings) && <EditGradingsButton />}
                    </div>
                    <div>
                        {(isEditingGradings) && <ExamGradingForm examId={ id } />}
                        {(!isEditingGradings) && <ExamGradingList examId={ id } />}
                    </div>
                </IsEditingGradingsContext.Provider>
            </GradingExamContextProvider>
        </div>
    )
}

export default GradingPage