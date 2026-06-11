import { useContext, useEffect } from "react"
import { GradingExamContext } from "../contexts/GradingExamContextProvider";

import StudentGradingForm from "./StudentGradingForm";

function ExamGradingTable({ examId }){
    
    const [gradingList, setGradingList] = useContext(GradingExamContext)

    // Fetch the data
    useEffect(() => {
        fetch(`http://localhost:8000/api/grading/${examId}`)
        .then(res => res.json())
        .then(data => {
            setGradingList(data.grading_data);
            console.log(data.grading_data);
        })
        .catch(error => console.error('Error: ', error));
    }, [])


    return(
        <form className="form-inline">
            {gradingList.map((examData) => (
                <StudentGradingForm StudentGradingData={examData} key={examData.id} />
            ))}
        </form>
    )
}

export default ExamGradingTable