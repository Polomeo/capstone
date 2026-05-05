import { createContext, useState } from "react";

import StudentsTable from "../components/StudentsTable";
import AddStudentButton from "../components/AddStudentButton";
import StudentsSearchBar from "../components/StudentsSearchBar";

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
                        <StudentsTable />
                    </div>
                </div>
            </SearchContext.Provider>
        </div>
    )
}

export default StudentsPage