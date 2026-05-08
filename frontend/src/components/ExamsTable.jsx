import { useContext, useState } from "react";
import { SearchExamContext } from "../contexts/SearchExamContextProvider";

function ExamsTable(){
    const [searchExamQuery, setSearchExamQuery] = useContext(SearchExamContext);

    const exams = [
        {"id" : 1,"subject_year" : 1, "subject" : "DIVINATION", "date" : "23/12/2025", "book" : 1, "page": 124, "total_examined" : 35},
        {"id" : 2,"subject_year" : 2, "subject" : "TRANSFIGURATION", "date" : "15/12/2024", "book" : 1, "page": 123, "total_examined" : 15},
        {"id" : 3, "subject_year" : 3, "subject" : "ANCIENT RUNS", "date" : "20/8/2025", "book" : 2, "page": 12, "total_examined" : 4},
        {"id" : 4, "subject_year" : 2, "subject" : "CHARMS", "date" : "07/03/2026", "book" : 3, "page": 64, "total_examined" : 20},
    ]

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
                            <th scope="col">Year</th>
                            <th scope="col">Subject</th>
                            <th scope="col">Date</th>
                            <th scope="col">Book</th>
                            <th scope="col">Page</th>
                            <th scope="col">Examined</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exams.map((exam) => 
                            (exam.subject.toLowerCase().includes(searchExamQuery.toLowerCase())
                            ) &&
                            (<tr key={exam.id} value={exam.id} className={"table-" + yearBackground(exam.subject_year)}>
                                <th scope="row">{exam.subject_year}°</th>
                                <td>{exam.subject}</td>
                                <td>{exam.date}</td>
                                <td>{exam.book}</td>
                                <td>{exam.page}</td>
                                <td>{exam.total_examined}</td>
                                <td>See - Edit - Delete</td>
                            </tr>)
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ExamsTable