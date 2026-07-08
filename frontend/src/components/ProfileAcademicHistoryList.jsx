import { Link } from "react-router-dom"

function ProfileAcademicHistoryList({ studentAcademicHistory }){
    
    // Colors for cells
    // Subject course
    function courseBg(subject_course){
        switch(subject_course){
            case 1:
                return "danger";
            case 2:
                return "warning";
            case 3:
                return "success";
        }
    }

    // Grading (approved = green / not approved = red)
    // BUG: This approving grade is hardcoded.
    function gradingBg(grading){
        if(parseInt(grading) >= 4){
            return "success";
        }
        else{
            return "danger";
        }
    }
    
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
                                    <td className={`text-center table-${courseBg(exam.subject_course)}`}>{exam.subject_course}°</td>
                                    <td><Link to={`/grading/${exam.exam_id}`}>{exam.subject_short}</Link></td>
                                    <td className={`text-center table-${exam.absent ? 'info' : gradingBg(exam.exam_grading)}`}>{exam.absent ? "Absent" : exam.exam_grading}</td>
                                    <td className="text-center">{exam.exam_date}</td>
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