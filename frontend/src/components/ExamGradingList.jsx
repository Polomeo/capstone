import { useContext, useEffect } from "react"
import { GradingExamContext } from "../contexts/GradingExamContextProvider"

function ExamGradingList({ examId }){
    
    const [gradingData, setGradingData] = useContext(GradingExamContext);

    // Fetch the data
    // BUG - This is duplicated code (see ExamGradingHeader)
    // Maybe can be moved to GradingPage and drill the object
    useEffect(() => {
        fetch(`http://localhost:8000/api/grading_info/${examId}`)
        .then(res => res.json())
        .then(data => {
            setGradingData(data.grading_data);
        })
        .catch(error => console.error('Error: ', error));
    }, [])

    return (
        <div>
            Grading data
            <div className="students-table">
                <div className="table-responsive">
                    <table className="table table-hover align-middle">
                        <thead>
                            <tr className="table-secondary">
                                <th scope="col">Student</th>
                                <th scope="col">Grading</th>
                                <th scope="col">Is abstent?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gradingData.map((grading) =>
                                <tr key={grading.id} value={grading.id}>
                                    <td>{grading.student_full_name}</td>
                                    <td>{grading.grading}</td>
                                    <td>{grading.absent}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

}

export default ExamGradingList