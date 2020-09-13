import React from 'react'

const Person = (props) => {
    return(
        <p>
            {props.name} {props.number}
            <button onClick={() => props.handler(props.id, props.name)}>delete</button>
        </p>
    )
}

export default Person