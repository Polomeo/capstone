import ExamsTable from "../components/ExamsTable";
import ExamsSearchBar from "../components/ExamsSearchBar";
import AddExamButton from "../components/AddExamButton";

import SearchExamContextProvider from "../contexts/SearchExamContextProvider";
import ExamsContextProvider from "../contexts/ExamsContextProvider";

function ExamsPage(){

    return (
        <div className="container">
            <ExamsContextProvider>
                <SearchExamContextProvider>
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
                </SearchExamContextProvider>
            </ExamsContextProvider>
        </div>
    )
}

export default ExamsPage