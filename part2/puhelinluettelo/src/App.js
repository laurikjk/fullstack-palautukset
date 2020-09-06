import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'

const App = () => {

  const [ persons, setPersons ] = useState([
    { id: 1,
      name: 'Arto Hellas',
      number: 420 }
  ]) 

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  const personsToShow = (newFilter === '')
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter))

  const handleNameChange = (event) => {
    console.log('handleri', event.target.value)
    setNewName(event.target.value) //keeps track of the text on the form
  }

  const handleNumberChange = (event) => {
    console.log('handleri 2', event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>

      <h3>add a new</h3>
      
      <PersonForm newName={newName} 
                  handleNameChange = {handleNameChange}
                  newNumber={newNumber}
                  handleNumberChange={handleNumberChange}
                  setNewName={setNewName}
                  setNewNumber={setNewNumber}
                  setPersons={setPersons}
                  persons={persons}
      />

      <h2>Numbers</h2>
        <Numbers personsToShow={personsToShow}/>
    </div>
  )

}

export default App