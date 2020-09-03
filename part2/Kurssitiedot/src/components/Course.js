import React from 'react'

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

  export default Course