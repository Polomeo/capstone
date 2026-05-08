import { createContext, useState } from "react";

export const StudentsContext = createContext();

export default function StudentsContextProvider({ children }) {
    const [studentsList, setStudentsList] = useState([]);

    return (
        <StudentsContext.Provider value={[studentsList, setStudentsList]} >
            { children }
        </StudentsContext.Provider>
    )
}