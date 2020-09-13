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
        let id = 0
        props.persons.forEach(person => {
            if(person.name === personObj.name) {
              testi = true
              id = person.id
            }
          }
        )
        //conditions base on if name existed
        if (testi===true &&
          window.confirm(`${props.newName} is already added to phonebook, replace the old number with a new one?`)){
          
          personService
            .update(id, personObj)
            .then(response =>
              console.log(response))
        } else if (testi!==true){
          personService
          .create(personObj)
          .then(returnedPerson => {
            props.setPersons(props.persons.concat(returnedPerson))
          })
        }

        personService
            .getAll()
            .then(response => {
              props.setPersons(response)
              props.setShow(response)
          })
        
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