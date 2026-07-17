import { createContext, useContext, useState } from "react";

// Components
import ExamsTable from "../components/ExamsTable";
import ExamsSearchBar from "../components/ExamsSearchBar";
import ButtonStateToggle from "../components/ButtonStateToggle";
import AddExamForm from "../components/AddExamForm";

// Contexts
import ExamsContextProvider from "../contexts/ExamsContextProvider";
import SearchExamContextProvider from "../contexts/SearchExamContextProvider";

export const IsAddingExamContext = createContext();

function ExamsPage(){

    const [isAddingExam, setIsAddingExam] = useState(false);

    return (
        <div className="container">
            <ExamsContextProvider>
                <SearchExamContextProvider>
                    <div className="row g-3">
                        <div className="col-md-10">
                            <ExamsSearchBar />
                        </div>
                        <IsAddingExamContext.Provider value={[isAddingExam, setIsAddingExam]}>
                            <div className="col-md-2">
                                {/* {(!isAddingExam) && <AddExamButton />} */}
                                {(!isAddingExam) && 
                                <ButtonStateToggle 
                                    stateStatus={isAddingExam} 
                                    setStateStatus={setIsAddingExam}
                                    label={"+ Add Exam"} 
                                    buttonColorType={"warning"}/>}
                            </div>
                            <div className="col-md-12">
                                {(isAddingExam) && <AddExamForm />}
                                {(!isAddingExam) && <ExamsTable />}
                            </div>
                        </IsAddingExamContext.Provider>
                    </div>
                </SearchExamContextProvider>
            </ExamsContextProvider>
        </div>
    )
}

export default ExamsPage