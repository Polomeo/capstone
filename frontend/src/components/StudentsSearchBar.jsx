import { useContext } from "react";

import { SearchContext } from "../pages/StudentsPage";

function StudentsSearchBar() {
    
    // This is from the Students Page
    const [searchQuery, setSearchQuery] = useContext(SearchContext);

    return (
        <form className="students-search-bar">
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">⌕</span>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search student..." 
                    aria-label="Search student input" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}    
                />
            </div>
        </form> 
    )

}

export default StudentsSearchBar
