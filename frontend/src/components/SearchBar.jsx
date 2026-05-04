import { useState } from "react";

function SearchBar({textPlaceholder}){
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <form>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">⌕</span>
                <input 
                    type="text" 
                    class="form-control" 
                    placeholder={textPlaceholder} 
                    aria-label={textPlaceholder} 
                    aria-describedby="basic-addon1" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}    
                />
            </div>
        </form>
    )
}

export default SearchBar