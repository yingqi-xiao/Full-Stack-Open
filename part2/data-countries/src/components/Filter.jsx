const Filter = ({newSearch, handleSearchChange}) => {
    return (
        <div>
            find countries &nbsp;
            <input 
                value={newSearch}
                onChange={handleSearchChange}
            />
        </div>
    );
}

export default Filter