import React from 'react'
import ReactDOM from 'react-dom'


const Course = ({course}) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue.exercises
  const total = course.parts.reduce(reducer, 0)
  return(
    <div>
    <h1>{course.name}</h1>
      <ul>
        {course.parts.map(part =>
          <li key={part.id}>
            {part.name} {part.exercises}
          </li>
        )}
      </ul>
      <b>total of {total} exercises</b>
    </div>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Testiosa',
        exercises: 1,
        id: 666
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))