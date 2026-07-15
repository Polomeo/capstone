import { useContext } from "react"

function ButtonStateToggle({ stateStatus, setStateStatus, label, buttonColorType }){

    function handleButtonPress(e){
        e.preventDefault();
        setStateStatus(!stateStatus);
    }

    return(
        <button 
            type="button" 
            className={`btn btn-${buttonColorType}`}
            onClick={(e) => handleButtonPress(e)}>
            {label}
        </button>
    )
}

export default ButtonStateToggle