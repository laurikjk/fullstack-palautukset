import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Statistics = (props) => {
  const Counter = ({ state, text }) => (
    <p>{text} {state} </p>
  )

  const Percent = ({ percent, text }) => (
    <p>{text} {percent} % </p>
  )
  return(
    <div>
      <h1>statistics</h1>
      <Counter state = {props.good} text = {'good '}/>
      <Counter state = {props.neutral} text = {'neutral'}/>
      <Counter state = {props.bad} text = {'bad'}/>
      <Counter state = {props.all} text = {'all'}/>
      <Counter state = {props.average} text = {'average'}/>
      <Percent percent = {props.positive} text = {'positive'}/> 
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => setGood(good + 1)
  const addNeutral = () => setNeutral(neutral + 1)
  const addBad = () => setBad(bad + 1)

  const average = (good - bad) / (good + neutral + bad)
  const positive = (good / (good + bad + neutral)) * 100
  const all = good + bad + neutral
  
  

  return (
    <div>
      <h1>give feedback</h1>

      <Button handleClick = {addGood} text = {'good'}/>
      <Button handleClick = {addNeutral} text = {'Neutral'}/>
      <Button handleClick = {addBad} text = {'Bad'}/>
      <Statistics good={good} bad={bad} neutral={neutral} all={all} average={average} positive={positive} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
export default App;