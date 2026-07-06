function ProfileStudentHeader({ studentPersonalData }){
    return (
        <div class="container">
            <div class="row">
                <div class="col">
                    <h3>{studentPersonalData.last_name}, {studentPersonalData.first_name}</h3>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <h6>Enroll year: {studentPersonalData.enroll_year}</h6>
                </div>
                <div class="col">
                    <h6>Personal ID N°: {studentPersonalData.personal_id}</h6>
                </div>
                <div class="col">
                    <h6>Enroll ID N°: {studentPersonalData.enroll_id}</h6>
                </div>
            </div>
        </div>
    )
}

export default ProfileStudentHeader