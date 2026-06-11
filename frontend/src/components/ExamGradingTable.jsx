import { useContext, useEffect } from "react"
import { GradingExamContext } from "../contexts/GradingExamContextProvider";

function ExamGradingTable(){
    
    const [gradingList, setGradingList] = useContext(GradingExamContext)

    // Fetch the data
    useEffect(() => {
        fetch('URL for grading list')
        //... setGradingList(data.grading_list)
    })


    return(
        <form className="form-inline">
            {gradingList.map((examData) => (
                <StudentGradingForm StudentGradingData={examData} key={examData.id} />
            ))}
        </form>
    )
}

export default AddStudentButton