import StudentsTable from "../components/StudentsTable"
import AddStudentButton from "../components/AddStudentButton"

function StudentsPage(){

    return (
        <div className="container">
            <div className="row g-3">
                <div className="col-md-10">
                    SearchBar
                </div>
                <div className="col-md-2">
                    <AddStudentButton />
                </div>
                <div className="col-md-12">
                    <StudentsTable />
                </div>
            </div>
        </div>
    )
}

export default StudentsPage