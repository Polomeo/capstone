function ErrorsList({errorsList}){

    return(
        <ul className="list-group">
            {errorsList.map((error) => 
                <li className="list-group-item list-group-item-warning" key={error}>{error}</li>
            )}
        </ul>
    )
}

export default ErrorsList