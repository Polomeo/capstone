import { useContext, useEffect, useState } from "react";

// Components
import ExamGradingAddStudentForm from "./ExamGradingAddStudentForm";
import ErrorsList from "./ErrorsList";

// Contexts
import { IsAddingStudentsContext } from "../pages/GradingPage";

function ExamGradingAddStudentList({examId}){

    const [isAddingStudentsToExam, setIsAddingStudentsToExam] = useContext(IsAddingStudentsContext);
    const [studentData, setStudentsData] = useState([]);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8000/api/students_exam_info/${examId}`, {
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
            setStudentsData(data.student_data);
        })
    },[])

    function handleCancelButton(event){
        event.preventDefault();
        setIsAddingStudentsToExam(false);
        console.log("Canceled.")
    }
    
    function handleAddStudents(event){
        event.preventDefault();
        console.log("Students added.")

        const formData = new FormData(event.currentTarget);
        const studentsToAdd = [];

        // Check if the entries has been checked
        for (const [name, value] of formData.entries()) {
            // Gets only the Checkboxes that are on.
            if (name.startsWith("to_add_") && value === "on"){
                // Strip the first part and get only the student ID
                studentsToAdd.push(name.replace("to_add_", ""));
            }
        };

        console.log(studentsToAdd);

        // FETCH SAVE STUDENTS ADDED
        // students_to_add
        // exam_id
        fetch(`http://localhost:8000/api/add_students_to_exam`, {
            method: 'POST',
            credentials : 'include',
            body: JSON.stringify({
                examId : examId,
                studentsToAdd : studentsToAdd,
            })
        })
        .then(res => {
            if(res.status === 401) {
                console.log('Status 401: NOT LOGGED IN')
                return null // If this return is not present, the next fails
            }
            return res.json()
        })
        .then(response => {
            if(response.errors){
                console.log(response.errors);
                setErrors(response.errors);
            }
            else if (response.success){
                console.log(response.success);
            }
        })
        .catch(error => console.error('Error: ', error));

        setIsAddingStudentsToExam(false);

    }

    return (
        <div>
            <form 
                onSubmit={(event) => handleAddStudents(event)}
                className="form-inline"
            >
            <div>
                {studentData.map((student) => (
                    <ExamGradingAddStudentForm StudentData={student} key={student.id} />
                ))}
            </div>
            <div className="row">
                    <div className="form-group col-md-6">
                        { errors.length > 0 && ( <ErrorsList errorsList={errors} /> )}
                    </div>
                </div>
            <div className="form-group col-md-4">
                <button 
                    className="btn btn-danger"
                    onClick={(event) => handleCancelButton(event)}>
                Cancel
                </button>
                <button
                    className="btn btn-primary"
                    type="submit">
                Add students to exam
                </button>
            </div>
            </form>
        </div>
    )

}

export default ExamGradingAddStudentList