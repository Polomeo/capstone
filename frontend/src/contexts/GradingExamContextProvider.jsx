import { createContext, useState } from "react";

export const GradingExamContext = createContext();

export default function GradingExamContextProvider({ children }) {
    const [gradingData, setGradingData] = useState([]);

    return (
        <GradingExamContext.Provider value={[gradingData, setGradingData]} >
            { children }
        </GradingExamContext.Provider>
    )
}