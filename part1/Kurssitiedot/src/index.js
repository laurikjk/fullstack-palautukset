import React from 'react'
import ReactDOM from 'react-dom'

const course = 'Half Stack application development'
const part1 = 'Fundamentals of React'
const exercises1 = 10
const part2 = 'Using props to pass data'
const exercises2 = 7
const part3 = 'State of a component'
const exercises3 = 14

const App = () => {
  return (
    <div>
      <Header course={course} />
      <Content/>
      <Total ex1={exercises1} ex2={exercises2} ex3={exercises3}/>
    </div>
  )
}

const Part = (props) => {
  return(  
    <p>
      {props.part} {props.ex}
    </p>
  )
}

const Header = (props) => {
  return(
    <div>
      <h1>{props.course}</h1>
    </div>
  )

}

const Content = () => {
  return(
    <>
      <Part part={part1} ex = {exercises1} />
      <Part part={part2} ex = {exercises2} />
      <Part part={part3} ex = {exercises3} />
    </>
  )

}

const Total = (props) => {
  return(
    <p>Number of exercises {props.ex1 + props.ex2 + props.ex3}</p>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))