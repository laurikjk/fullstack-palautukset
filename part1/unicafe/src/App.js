import React, { useState } from 'react'
import ReactDOM from 'react-dom'



const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => setGood(good + 1)
  const addNeutral = () => setNeutral(neutral + 1)
  const addBad = () => setBad(bad + 1)

  const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

  const Counter = ({ state, text }) => (
    <p>{text} {state} </p>
  )

  const Percent = ({ percent, text }) => (
    <p>{text} {percent} % </p>
  )

  const average = (good - bad) / (good + neutral + bad)
  const positive = (good / (good + bad + neutral)) * 100
  const all = good + bad + neutral
  
  

  return (
    <div>
      <h1>give feedback</h1>

      <Button handleClick = {addGood} text = {'good'}/>
      <Button handleClick = {addNeutral} text = {'Neutral'}/>
      <Button handleClick = {addBad} text = {'Bad'}/>

      <h1>statistics</h1>

      <Counter state = {good} text = {'good '}/>
      <Counter state = {neutral} text = {'neutral'}/>
      <Counter state = {bad} text = {'bad'}/>
      <Counter state = {all} text = {'all'}/>
      <Counter state = {average} text = {'average'}/>
      <Percent percent = {positive} text = {'positive'}/> 
      
      

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
export default App;