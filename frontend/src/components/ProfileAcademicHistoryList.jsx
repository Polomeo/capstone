import { Link } from "react-router-dom"

function ProfileAcademicHistoryList({ studentAcademicHistory }){
    return (
        <div>
            <div>
                <h4>Academic History</h4>
            </div>
            <div className="students-table col-md-10">
                <div className="table-responsive">
                    <table className="table table-hover align-middle">
                        <thead>
                            <tr className="table-secondary">
                                <th scope="col">Course</th>
                                <th scope="col">Subject</th>
                                <th scope="col">Grading</th>
                                <th scope="col">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentAcademicHistory.map((exam) =>
                                <tr key={exam.id} value={exam.id}>
                                    <td>{exam.subject_course}°</td>
                                    <td><Link to={`/grading/${exam.exam_id}`}>{exam.subject_short}</Link></td>
                                    <td>{exam.absent ? "Absent" : exam.exam_grading}</td>
                                    <td>{exam.exam_date}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ProfileAcademicHistoryList