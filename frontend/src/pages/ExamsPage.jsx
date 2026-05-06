import { createContext, useState } from "react";
import ExamsTable from "../components/ExamsTable";
import ExamsSearchBar from "../components/ExamsSearchBar";

export const SearchExamContext = createContext();

function ExamsPage(){

    const [searchExamQuery, setSearchExamQuery] = useState("");

    return (
        <div className="container">
            <SearchExamContext.Provider value = {[searchExamQuery, setSearchExamQuery]}>
                <ExamsSearchBar />
                <ExamsTable />
            </SearchExamContext.Provider>
        </div>
    )
}

export default ExamsPage