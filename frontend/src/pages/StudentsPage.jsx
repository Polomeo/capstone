import { createContext, useState } from "react";

import StudentsTable from "../components/StudentsTable";
import AddStudentButton from "../components/AddStudentButton";
import StudentsSearchBar from "../components/StudentsSearchBar";
import AddStudentForm from "../components/AddStudentForm";

// Context for search
export const SearchContext = createContext();


function StudentsPage(){

    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="container">
            <SearchContext.Provider value={[searchQuery, setSearchQuery]}>
                <div className="row g-3">
                    <div className="col-md-10">
                        <StudentsSearchBar />
                    </div>
                    <div className="col-md-2">
                        <AddStudentButton />
                    </div>
                    <div className="col-md-12">
                        <AddStudentForm />
                        <StudentsTable />
                    </div>
                </div>
            </SearchContext.Provider>
        </div>
    )
}

export default StudentsPage