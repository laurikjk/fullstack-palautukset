import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'

const CountriesToShow = ({countries, newName, handleClick}) => { 
  let c = countries.filter(country => country.name.toLowerCase().includes(newName.toLowerCase()))
  let n = c.length

  if (n >= 10) {
      return <p>too many countries</p>
  } else if (n===1){
    let country = c[0]
    return(
      <div>
        <h1>{country.name}</h1>
        <p>
          capital {country.capital}
        </p>
        <p>
          population {country.population}
        </p>

        <h3>languages</h3>
        <ul>
        {country.languages.map(language=>
          <li key={language.name}>
            {language.name}
          </li>
          )}
        </ul>

        <img src={country.flag} alt="flag" width="300" height="150"/>

      </div>
    )
  } else {
    return(
      <ul>
        {c.map(country=>
          <li key={country.name}>
            {country.name} 
            <button onClick={() => handleClick(country.name)}> show </button>
          </li>
          )}
      </ul>
      )
    
  }
    
    
    
}

function App() {

  const [countries, setCountries] = useState([])
  const [ newName, setNewName ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value) //keeps track of the text on the form
  }

  const handleClick = (e) => {
    setNewName(e)
  }

  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }

  useEffect(hook, [])



  return (
    <div >
      find countries
      <input 
        value={newName}
        onChange={handleNameChange}    
      />
      <CountriesToShow countries={countries} newName={newName} handleClick={handleClick}/>
    </div>
  );
}

export default App;
