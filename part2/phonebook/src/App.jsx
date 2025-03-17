import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personContact from './services/contacts'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('') // State for the input field
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [messageType, setMessageType] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  // Fetch the initial state of the data from the server 
  // using the axios-library and an Effect hook.
  useEffect(() => {
    console.log('effect')
    personContact
      .getAll()
      .then(initialContacts => {
        console.log('promise fulfilled')
        setPersons(initialContacts)
      })
  }, [])

  const showMessage = (message, type) => {
    setErrorMessage(message)
    setMessageType(type)
    setTimeout(() => {  
      setErrorMessage(null)
      setMessageType(null)
    }, 5000)
  }

  const Notification = ({ message, type }) => {
    if (message === null) {
      return null
    }
    return (
      <div className={type}>
        {message}
      </div>
    )
  }

  const addContact = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const nameObject = {
      name: newName,
      number: newNumber, 
      id: persons.length + 1
    } // Create a new object with the name
    const existingPerson = persons.find(person => person.name === newName) // Check if the name already exists
    existingPerson 
      ? updateContact({...existingPerson, number: newNumber}) // If the name exists, update the contact
      : personContact
          .create(nameObject) // Use the create function from the contacts.js file to send the new object to the server
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
            showMessage(`Added ${returnedPerson.name}`, 'success')
          })
          .catch(error => {
            console.log('Error adding contact:', error)
            showMessage('Failed to add contact', 'error')
          })
  } 

  const deleteContact = (id) => {
    const person = persons.find (person => person.id === id)
    if (!person) return
    const confirmDelete = window.confirm(`Delete ${person.name} ?`)

    if (confirmDelete) {
      personContact
        .deleteOne(id)
        .then(response => {
          console.log(response)
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          showMessage(`Information of ${person.name} has already been removed from server`, 'error')
          setPersons(persons.filter(person => person.id != id))
        })
    }
  }

  const updateContact = (newObject) => {
    const person = persons.find (person => person.id === newObject.id)
    const confirmUpdate = window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)
    
    if (confirmUpdate) {
      const changedPerson = { 
        ...person, 
        number: newObject.number }
      personContact
        .update(changedPerson.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.log('Error updating contact:', error)
        })
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value) // Update the state with the input field value
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value) // Update the state with the input field value
  }

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value) // Update the state with the search input value
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(newSearch.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} type={messageType}/>
      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm addContact={addContact} 
                  newName={newName} 
                  handleNameChange={handleNameChange} 
                  newNumber={newNumber} 
                  handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} deleteContact={deleteContact}/> 
    </div>
  )
}

export default App