const Persons = ({persons, deleteContact}) => {
    return (
        <div>
          {persons.map(person => 
            <div key={person.name}>
              {person.name} {person.number} &nbsp;
              <button onClick={() => deleteContact(person.id)}>delete</button>
            </div>
          )}
        </div>
    )
}

export default Persons