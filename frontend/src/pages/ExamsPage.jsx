import { createContext, useState } from "react";

import ExamsTable from "../components/ExamsTable";
import ExamsSearchBar from "../components/ExamsSearchBar";
import AddExamButton from "../components/AddExamButton";

export const SearchExamContext = createContext();

function ExamsPage(){

    const [searchExamQuery, setSearchExamQuery] = useState("");

    return (
        <div className="container">
            <SearchExamContext.Provider value={[searchExamQuery, setSearchExamQuery]}>
                <div className="row g-3">
                    <div className="col-md-10">
                        <ExamsSearchBar />
                    </div>
                    <div className="col-md-2">
                        <AddExamButton />
                    </div>
                    <div className="col-md-12">
                        <ExamsTable />
                    </div>
                </div>
            </SearchExamContext.Provider>
        </div>
    )
}

export default ExamsPage