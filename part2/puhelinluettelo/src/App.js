import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {

  const [ persons, setPersons ] = useState([
    { id: 1,
      name: 'Arto Hellas',
      number: 420 }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  

  const addName = (event) =>{

    //prevent default action (refreshing the page)
    event.preventDefault()

    //create a person object which is added to persons on submit
    const personObj ={
      id: persons.length +1,
      name: newName,
      number: newNumber
    }

    //check if name alrady exists
    let testi = false
    persons.forEach(person => {
        if(person.name === personObj.name) {
          testi = true
        }
      }
    )
    //conditions base on if name existed
    if (testi===true){
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObj)) // !! concat so that the state isn't updated directly
    }
    //reset the form
    setNewName('')
    setNewNumber('')

    console.log('clikedi', event.target)
  
  }

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

      <form>
        <div>
          filter shown with <input
                              value={newFilter}
                              onChange={handleFilterChange}
          />
        </div>
      </form>

      <h3>add a new</h3>
      <form onSubmit={addName}>
        <div>
          name: <input 
                    value={newName}
                    onChange={handleNameChange}    
                />
        </div>
        <div>
          number: <input 
                    value={newNumber}
                    onChange={handleNumberChange}    
                />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person =>
          <li key={person.id}>
            <Person name={person.name} number={person.number}/>
          </li>
          
        )}
      </ul>
    </div>
  )

}

export default App