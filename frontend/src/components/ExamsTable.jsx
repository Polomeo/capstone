import { useState } from "react";

function ExamsTable(){
    const [searchQuery, setSearchQuery] = useState("");

    const exams = [
        {"id" : 1,"subject_year" : 1, "subject" : "DIVINATION", "date" : "23/12/2025", "book" : 1, "page": 124, "total_examined" : 35},
        {"id" : 2,"subject_year" : 2, "subject" : "TRANSFIGURATION", "date" : "15/12/2024", "book" : 1, "page": 123, "total_examined" : 15},
        {"id" : 3, "subject_year" : 3, "subject" : "ANCIENT RUNS", "date" : "20/8/2025", "book" : 2, "page": 12, "total_examined" : 4},
        {"id" : 4, "subject_year" : 2, "subject" : "CHARMS", "date" : "07/03/2026", "book" : 3, "page": 64, "total_examined" : 20},
    ]

    return (
        <div className="exams-table">
            <form className="exams-search-bar">
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">⌕</span>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Search subject..." 
                        aria-label="Search subject input" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}    
                    />
                </div>
            </form>      
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
                            (exam.subject.toLowerCase().includes(searchQuery.toLowerCase())
                            ) &&
                            (<tr key={exam.id} value={exam.id}>
                                <th scope="row">{exam.subject_year}</th>
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