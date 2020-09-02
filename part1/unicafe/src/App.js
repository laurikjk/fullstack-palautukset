import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const StatisticLine = (props) => {

  if (props.percent === true) {
    return(
      <tr>
        <td>{props.text} {props.value} %</td>
      </tr>
    )
  } else {
    return(
      <tr>
        <td>{props.text} {props.value}</td>
      </tr>
    )
  }

}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)


const Statistics = (props) => {

  const Percent = ({ percent, text }) => (
    <p>{text} {percent} % </p>
  )
  
  if (props.all===0) {
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  else {
    return(
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
          <StatisticLine value = {props.good} text = {'good'}/>
          <StatisticLine value = {props.neutral} text = {'neutral'}/>
          <StatisticLine value = {props.bad} text = {'bad'}/>
          <StatisticLine value = {props.all} text = {'all'}/>
          <StatisticLine value = {props.average} text = {'average'}/>
          <StatisticLine value = {props.positive} text = {'positive'} percent = {true}/> 
          </tbody>
        </table>
      </div>
    )
  }
}

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