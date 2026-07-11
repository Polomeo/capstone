import { useContext, useEffect } from "react"
import { GradingExamContext } from "../contexts/GradingExamContextProvider"
import { Link } from "react-router-dom";

function ExamGradingList({ examId }){
    
    const [gradingData, setGradingData] = useContext(GradingExamContext);

    // Fetch the data
    // BUG - This is duplicated code (see ExamGradingHeader)
    // Maybe can be moved to GradingPage and drill the object
    useEffect(() => {
        fetch(`http://localhost:8000/api/grading_info/${examId}`, {
            method: 'GET',
            credentials: 'include',
        })
        .then(res => {
            if(res.status === 401) {
                console.log('Status 401: NOT LOGGED IN')
                return null // If this return is not present, the next fails
            }
            return res.json()
        })
        .then(data => {
            setGradingData(data.grading_data);
        })
        .catch(error => console.error('Error: ', error));
    }, [])

    function gradingBg(grading){
        if(parseInt(grading) >= 4){
            return "success";
        }
        else{
            return "danger";
        }
    }

    return (
        <div className="students-table col-md-6">
            <div className="table-responsive">
                <table className="table table-hover align-middle">
                    <thead>
                        <tr className="table-secondary">
                            <th scope="col">Student</th>
                            <th scope="col">Grading</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(gradingData.length > 0) ? 
                        gradingData.map((grading) =>
                            <tr key={grading.id} value={grading.id}>
                                <td><Link to={`/profile/${grading.student_id}`}>{grading.student_full_name}</Link></td>
                                <td className={`text-center table-${grading.absent ? 'info' : gradingBg(grading.exam_grading)}`}>{grading.absent ? "Absent" : grading.exam_grading}</td>
                            </tr>
                        ) : 
                        <div>No student added to this exam yet. Got to "Edit Gradings" and add some.</div>}
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default ExamGradingList