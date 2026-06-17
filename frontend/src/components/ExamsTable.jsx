import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { SearchExamContext } from "../contexts/SearchExamContextProvider";
import { ExamsContext } from "../contexts/ExamsContextProvider";

function ExamsTable(){
    const [exams, setExams] = useContext(ExamsContext);
    const [searchExamQuery, setSearchExamQuery] = useContext(SearchExamContext);

    // Fetching the exams
    useEffect(() => {
        fetch('http://localhost:8000/api/exams')
        .then(res => res.json())
        .then(data => {
            setExams(data.exams);
            // console.log("DEBUG: Students Table Refreshed");
        })
        .catch(error => console.error('Error.', error));
    }, []); // Updates only on mount


    function yearBackground(subject_year) {
        if (subject_year === 1){
            return "danger";
        }
        else if (subject_year === 2){
            return "warning";
        }
        else {
            return "success";
        }
    }

    return (
        <div className="exams-table">     
            <div className="table-responsive">
                <table className="table table-hover align-middle">
                    <thead>
                        <tr className="table-secondary">
                            <th scope="col">Course</th>
                            <th scope="col">Subject</th>
                            <th scope="col">Date</th>
                            <th scope="col">Examined</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exams.map((exam) => 
                            (exam.subject_short.toLowerCase().includes(searchExamQuery.toLowerCase())
                            ) &&
                            (
                                <tr key={exam.id} value={exam.id} className={"table-" + yearBackground(exam.subject_course)}>
                                    <th scope="row">{exam.subject_course}°</th>
                                    <td><Link to={`/grading/${exam.id}`}>{exam.subject_short}</Link></td>
                                    <td>{exam.date}</td>
                                    <td>20</td>
                                    <td><Link to={`/grading/${exam.id}`}>👁</Link></td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ExamsTable