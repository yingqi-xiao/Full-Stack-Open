const PersonForm = ({addContact, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <form onSubmit={addContact} >
        <div>
          name: &nbsp;
          <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number: &nbsp;
          <input 
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  );
}

export default PersonForm