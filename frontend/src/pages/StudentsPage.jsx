import { createContext, useContext, useState } from "react";

// Components
import StudentsTable from "../components/StudentsTable";
import AddStudentButton from "../components/AddStudentButton";
import StudentsSearchBar from "../components/StudentsSearchBar";
import AddStudentForm from "../components/AddStudentForm";

// Contexts
import StudentsContextProvider from "../contexts/StudentsContextProvider";

// TO EXPORT SEARCH CONTEXT (the IsAddingStudents works only here, so not necesary to export)
export const SearchContext = createContext();
export const IsAddingStudentContext = createContext();


function StudentsPage(){

    const [searchQuery, setSearchQuery] = useState("");
    const [isAddingStudent, setIsAddingStudent] = useState(false);

    return (
        <div className="container">
            <StudentsContextProvider>
                <SearchContext.Provider value={[searchQuery, setSearchQuery]}>
                    <div className="row g-3">
                        <div className="col-md-10">
                            <StudentsSearchBar />
                        </div>
                        <IsAddingStudentContext.Provider value={[isAddingStudent, setIsAddingStudent]}>
                            <div className="col-md-2">
                                {(!isAddingStudent) && <AddStudentButton />}
                            </div>
                            <div className="col-md-12">
                                {(isAddingStudent) && <AddStudentForm />}
                                <StudentsTable />
                            </div>
                        </IsAddingStudentContext.Provider>
                    </div>
                </SearchContext.Provider>
            </StudentsContextProvider>
        </div>
    )
}

export default StudentsPage