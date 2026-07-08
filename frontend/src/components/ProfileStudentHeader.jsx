import { useEffect, useState } from "react"

function ProfileStudentHeader({ studentPersonalData }){

    const [personalData, setPersonalData] = useState(studentPersonalData);

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h3>{personalData.last_name}, {personalData.first_name}</h3>
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
        // <>Test</>
    )
}

export default ProfileStudentHeader