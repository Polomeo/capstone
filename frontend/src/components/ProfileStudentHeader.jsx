import { useEffect, useState } from "react"

function ProfileStudentHeader({ studentPersonalData }){

    const [personalData, setPersonalData] = useState(studentPersonalData);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <h3>{personalData.last_name}, {personalData.first_name}</h3>
                </div>
                <div className="col-md-2">
                    <button className="btn btn-warning">
                        Edit student
                    </button>
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
    )
}

export default ProfileStudentHeader