import { createContext, useState } from "react";

export const ExamsContext = createContext();

export default function ExamsContextProvider({ children }) {
    const [examsList, setExamsList] = useState([]);

    return (
        <ExamsContext.Provider value={[examsList, setExamsList]} >
            { children }
        </ExamsContext.Provider>
    )
}