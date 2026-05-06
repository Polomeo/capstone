
function AddStudentForm() {
    return (
        <form>
            <div className="row">
                <div className="form-group col-md-3">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name"/>
                </div>
                <div className="form-group col-md-3">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name" />
                </div>
                <div className="form-group col-md-2">
                    <label>Personal ID Number</label>
                    <input type="text" className="form-control" placeholder="11.222.333" />
                </div>
                <div className="form-group col-md-2">
                    <label>Enroll Year</label>
                    <input type="text" className="form-control" placeholder="2026" />
                </div>
                <div className="form-group col-md-2">
                    <label>Enroll ID Number</label>
                    <input type="text" className="form-control" placeholder="123" />
                </div>
            </div>
            <div className="row" style={{padding: "10px"}}>
                <div className="form-group col-md-2">
                    <button type="submit" className="btn btn-primary">Enroll</button>
                    <button className="btn btn-danger" style={{marginLeft: "10px"}}>Cancel</button>
                </div>
            </div>
        </form>
    )
}

export default AddStudentForm