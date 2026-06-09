import { createContext, useState } from "react";

export const GradingExamContext = createContext();

export default function GradingExamContextProvider({ children }) {
    const [gradingList, setGradingList] = useState([]);

    return (
        <GradingExamContext.Provider value={[gradingList, setGradingList]} >
            { children }
        </GradingExamContext.Provider>
    )
}