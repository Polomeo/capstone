import { useContext, useEffect } from "react"
import { GradingExamContext } from "../contexts/GradingExamContextProvider";

import StudentGradingForm from "./StudentGradingForm";

function ExamGradingForm({ examId }){
    
    const [gradingData, setGradingData] = useContext(GradingExamContext)

    // Fetch the data
    // BUG - This is duplicated code (see ExamGradingHeader)
    // Maybe can be moved to GradingPage and drill the object
    useEffect(() => {
        fetch(`http://localhost:8000/api/grading/${examId}`)
        .then(res => res.json())
        .then(data => {
            setGradingData(data.grading_data);
            // console.log(data.grading_data);
        })
        .catch(error => console.error('Error: ', error));
    }, [])


    return(
        <form className="form-inline">
            {gradingData.map((examData) => (
                <StudentGradingForm StudentGradingData={examData} key={examData.id} />
            ))}
        </form>
    )
}

export default ExamGradingForm