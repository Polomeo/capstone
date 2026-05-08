import { createContext, useState } from "react";

export const SearchExamContext = createContext();

export default function SearchExamContextProvider({ children }) {
    const [searchExamQuery, setSearchExamQuery] = useState("");

    return (
        <SearchExamContext.Provider value={[searchExamQuery, setSearchExamQuery]} >
            { children }
        </SearchExamContext.Provider>
    )
}