import { useEffect, useState } from "react"
import EditStudentForm from "./EditStudentForm";
import ButtonStateToggle from "./ButtonStateToggle";

function ProfileStudentHeader({ studentPersonalData }){

    const [personalData, setPersonalData] = useState(studentPersonalData);
    const [isEditingStudent, setIsEditingStudent] = useState(false);

    function editStudentButton(event){
        event.preventDefault();
        setIsEditingStudent(true);
    }

    return (
        <div className="container student-profile-header">
            <div className="container student-profile-edit">
                {(isEditingStudent) && <EditStudentForm studentPersonalData={personalData} />}
            </div>
            <div className="container student-profile-data">
                    <div className="row">
                        <div className="col-md-8">
                            <h3>{personalData.last_name}, {personalData.first_name}</h3>
                        </div>
                        <div className="col-md-2">
                            {/* <button 
                                className="btn btn-warning"
                                onClick={(e) => editStudentButton(e)}>
                                Edit student
                            </button> */}
                            <ButtonStateToggle 
                                stateStatus={isEditingStudent} 
                                setStateStatus={setIsEditingStudent}
                                label="Edit student"
                                buttonColorType={"warning"}/>
                        </div>
                    </div>
                <div className="row">
                    <div className="col">
                        <h6>Enroll year: {personalData.enroll_year}</h6>
                    </div>
                    <div className="col">
                        <h6>Personal ID N°: {personalData.personal_id}</h6>
                    </div>
                    <div className="col">
                        <h6>Enroll ID N°: {personalData.enroll_id}</h6>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default ProfileStudentHeader