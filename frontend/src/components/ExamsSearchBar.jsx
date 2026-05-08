import { useContext } from "react";
import { SearchExamContext } from "../contexts/SearchExamContextProvider";

function ExamsSearchBar() {

    const [searchExamQuery, setSearchExamQuery] = useContext(SearchExamContext);

    return (
        <form className="exams-search-bar">
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">⌕</span>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search subject..." 
                    aria-label="Search subject input" 
                    value={searchExamQuery}
                    onChange={(e) => setSearchExamQuery(e.target.value)}    
                />
            </div>
        </form> 
    )
}

export default ExamsSearchBar
