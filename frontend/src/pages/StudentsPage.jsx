import { useState, useEffect } from "react";

import SearchBar from "../components/SearchBar"
import StudentsTable from "../components/StudentsTable"

function StudentsPage(){

    return (
        <div className="container">
            <StudentsTable />
        </div>
    )
}

export default StudentsPage