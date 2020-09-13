import personService from '../services/personService'
import React from 'react'



const PersonForm = (props) =>{

    const addName = (event) =>{

        //prevent default action (refreshing the page)
        event.preventDefault()
    
        //create a person object which is added to persons on submit
        const personObj ={
          name: props.newName,
          number: props.newNumber
        }
    
        //check if name alrady exists
        let testi = false
        props.persons.forEach(person => {
            if(person.name === personObj.name) {
              testi = true
            }
          }
        )
        //conditions base on if name existed
        if (testi===true){
          alert(`${props.newName} is already added to phonebook`)
        } else {
          personService
          .create(personObj)
          .then(returnedPerson => {
            props.setPersons(props.persons.concat(returnedPerson))
          })
        }

        
        //reset the form
        props.setNewName('')
        props.setNewNumber('')
  
    
        console.log('clikedi', event.target)
      
      }

    return(
        <form onSubmit={addName}>
        <div>
          name: <input 
                    value={props.newName}
                    onChange={props.handleNameChange}    
                />
        </div>
        <div>
          number: <input 
                    value={props.newNumber}
                    onChange={props.handleNumberChange}    
                />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm